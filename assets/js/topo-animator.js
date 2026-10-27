// Topographic hero animation for salmancuso.com
// Living contour lines drawn from a slowly shifting elevation field (Perlin noise),
// traced with marching squares. Function-based, no classes.
// Every 5th line is a heavier "index contour" like a USGS quad; one contour is gold.

(function () {
    const CONFIG = {
        bgColor: '#1a1a18',
        lineRGB: '139, 157, 93',     // earth green
        accentRGB: '184, 134, 11',   // gold accent
        gridRGB: '232, 213, 196',    // cream, used very faintly for the map grid
        cellSize: 9,                 // px per elevation sample (lower = smoother, heavier)
        cellSizeMobile: 12,
        levels: 18,                  // number of contour levels
        indexEvery: 5,               // every Nth contour is an index contour
        accentLevel: 10,             // which contour gets the gold accent
        noiseScale: 0.0028,          // terrain zoom (lower = broader hills)
        morphSpeed: 0.000035,        // how fast the terrain reshapes itself
        driftSpeed: 0.000012,        // slow eastward drift of the whole map
        lineAlpha: 0.38,
        indexAlpha: 0.62,
        accentAlpha: 0.7,
        gridSpacing: 120,            // px between faint map grid lines
        gridAlpha: 0.045,
        fps: 30,
        seed: 1977                   // change for a different landscape
    };

    // ---------- Noise (improved Perlin, 3D: x, y, time) ----------

    function makePermutation(seed) {
        let s = seed >>> 0;
        function rand() {
            s = (s + 0x6D2B79F5) >>> 0;
            let t = s;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        }
        const p = [];
        for (let i = 0; i < 256; i++) p.push(i);
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            const tmp = p[i]; p[i] = p[j]; p[j] = tmp;
        }
        const perm = new Uint8Array(512);
        for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
        return perm;
    }

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + t * (b - a); }

    function grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
        return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    }

    function noise3(perm, x, y, z) {
        const fx = Math.floor(x), fy = Math.floor(y), fz = Math.floor(z);
        const X = fx & 255, Y = fy & 255, Z = fz & 255;
        x -= fx; y -= fy; z -= fz;
        const u = fade(x), v = fade(y), w = fade(z);
        const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
        const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
        return lerp(
            lerp(lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
                 lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u), v),
            lerp(lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
                 lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u), v),
            w);
    }

    // Three octaves of noise = ridges and valleys with some small bumps
    function elevation(perm, x, y, t) {
        return (noise3(perm, x, y, t)
            + 0.5 * noise3(perm, x * 2.03, y * 2.03, t * 1.3)
            + 0.25 * noise3(perm, x * 4.11, y * 4.11, t * 1.7)) / 1.75;
    }

    // ---------- Marching squares ----------
    // Edges: 0 top, 1 right, 2 bottom, 3 left. Corners: tl=8, tr=4, br=2, bl=1.
    const SEGMENTS = [
        [], [[3, 2]], [[2, 1]], [[3, 1]],
        [[0, 1]], [[0, 1], [3, 2]], [[0, 2]], [[0, 3]],
        [[0, 3]], [[0, 2]], [[3, 0], [1, 2]], [[0, 1]],
        [[3, 1]], [[1, 2]], [[3, 2]], []
    ];

    function edgePoint(edge, x, y, cell, a, b, c, d, level, out) {
        // a=tl, b=tr, c=br, d=bl
        if (edge === 0) { out[0] = x + cell * ((level - a) / (b - a)); out[1] = y; }
        else if (edge === 1) { out[0] = x + cell; out[1] = y + cell * ((level - b) / (c - b)); }
        else if (edge === 2) { out[0] = x + cell * ((level - d) / (c - d)); out[1] = y + cell; }
        else { out[0] = x; out[1] = y + cell * ((level - a) / (d - a)); }
    }

    function traceLevel(state, level) {
        const { ctx, field, cols, rows, cell } = state;
        const p = [0, 0], q = [0, 0];
        const stride = cols + 1;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                const idx = j * stride + i;
                const a = field[idx], b = field[idx + 1];
                const c = field[idx + stride + 1], d = field[idx + stride];
                let code = 0;
                if (a > level) code |= 8;
                if (b > level) code |= 4;
                if (c > level) code |= 2;
                if (d > level) code |= 1;
                if (code === 0 || code === 15) continue;
                const x = i * cell, y = j * cell;
                const segs = SEGMENTS[code];
                for (let s = 0; s < segs.length; s++) {
                    edgePoint(segs[s][0], x, y, cell, a, b, c, d, level, p);
                    edgePoint(segs[s][1], x, y, cell, a, b, c, d, level, q);
                    ctx.moveTo(p[0], p[1]);
                    ctx.lineTo(q[0], q[1]);
                }
            }
        }
        ctx.stroke();
    }

    // ---------- Drawing ----------

    function resize(state) {
        const rect = state.canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        state.width = rect.width;
        state.height = rect.height;
        state.canvas.width = Math.round(rect.width * dpr);
        state.canvas.height = Math.round(rect.height * dpr);
        state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        state.cell = rect.width < 600 ? CONFIG.cellSizeMobile : CONFIG.cellSize;
        state.cols = Math.ceil(rect.width / state.cell);
        state.rows = Math.ceil(rect.height / state.cell);
        state.field = new Float32Array((state.cols + 1) * (state.rows + 1));
    }

    function fillField(state, now) {
        const { field, cols, rows, cell, perm } = state;
        const t = now * CONFIG.morphSpeed;
        const drift = now * CONFIG.driftSpeed;
        const s = CONFIG.noiseScale;
        let k = 0;
        for (let j = 0; j <= rows; j++) {
            const ny = j * cell * s;
            for (let i = 0; i <= cols; i++) {
                field[k++] = elevation(perm, i * cell * s + drift, ny, t);
            }
        }
    }

    function drawGrid(state) {
        const { ctx, width, height } = state;
        ctx.strokeStyle = `rgba(${CONFIG.gridRGB}, ${CONFIG.gridAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = CONFIG.gridSpacing; x < width; x += CONFIG.gridSpacing) {
            ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, height);
        }
        for (let y = CONFIG.gridSpacing; y < height; y += CONFIG.gridSpacing) {
            ctx.moveTo(0, y + 0.5); ctx.lineTo(width, y + 0.5);
        }
        ctx.stroke();
    }

    function drawVignette(state) {
        const { ctx, width, height } = state;
        const cx = width / 2, cy = height / 2;
        // Darken the middle a touch so the title stays easy to read, and the edges for depth
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75);
        g.addColorStop(0, 'rgba(26, 26, 24, 0.55)');
        g.addColorStop(0.35, 'rgba(26, 26, 24, 0.15)');
        g.addColorStop(0.7, 'rgba(26, 26, 24, 0.05)');
        g.addColorStop(1, 'rgba(26, 26, 24, 0.45)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
    }

    function renderFrame(state, now) {
        const { ctx, width, height } = state;
        ctx.fillStyle = CONFIG.bgColor;
        ctx.fillRect(0, 0, width, height);

        drawGrid(state);
        fillField(state, now);

        // Elevation values mostly fall between about -0.35 and 0.35
        const min = -0.38, max = 0.38;
        const step = (max - min) / (CONFIG.levels - 1);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        for (let n = 0; n < CONFIG.levels; n++) {
            const level = min + n * step;
            if (n === CONFIG.accentLevel) {
                ctx.strokeStyle = `rgba(${CONFIG.accentRGB}, ${CONFIG.accentAlpha})`;
                ctx.lineWidth = 1.3;
            } else if (n % CONFIG.indexEvery === 0) {
                ctx.strokeStyle = `rgba(${CONFIG.lineRGB}, ${CONFIG.indexAlpha})`;
                ctx.lineWidth = 1.5;
            } else {
                ctx.strokeStyle = `rgba(${CONFIG.lineRGB}, ${CONFIG.lineAlpha})`;
                ctx.lineWidth = 0.8;
            }
            traceLevel(state, level);
        }

        drawVignette(state);
    }

    function startTopo(canvas) {
        const state = {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            perm: makePermutation(CONFIG.seed),
            visible: true,
            last: 0,
            started: performance.now()
        };
        const reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Start partway into the timeline so the first frame already looks "settled"
        const offset = 600000;

        resize(state);
        renderFrame(state, offset);

        window.addEventListener('resize', function () {
            resize(state);
            renderFrame(state, offset + (performance.now() - state.started));
        });

        if (reduceMotion) return; // one still map, no motion

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                state.visible = entries[0].isIntersecting;
            }).observe(canvas);
        }

        function loop(now) {
            requestAnimationFrame(loop);
            if (!state.visible || document.hidden) return;
            if (now - state.last < 1000 / CONFIG.fps) return;
            state.last = now;
            renderFrame(state, offset + (now - state.started));
        }
        requestAnimationFrame(loop);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const canvas = document.getElementById('topoCanvas');
        if (canvas && canvas.getContext) startTopo(canvas);
    });
})();

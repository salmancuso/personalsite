class TopoAnimator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.time = 0;
        this.animationId = null;
        
        // Colors
        this.bgColor = '#1a1a18';
        this.lineColor = '#8B9D5D';
        this.accentColor = '#B8860B';
        
        // Configuration (adjust for more/less movement)
        this.speed = 1.5; // Lower = slower animation
        this.lineSpacing = 40;
        this.waveAmplitude = 10; // Pixel deviation (subtle = 5-10)
        this.waveFrequency = 0.025; // Lower = slower waves
        this.opacity = 0.4; // Line opacity (0.3-0.5 is good)
        
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    drawLine(y, offset = 0) {
        const { ctx, canvas, time, lineSpacing, waveAmplitude, waveFrequency } = this;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= canvas.width; x += 5) {
            // Sine wave with time-based animation
            const wave = Math.sin((x * waveFrequency) + (time * 0.01) + offset) * waveAmplitude;
            const noiseFactor = Math.sin(x * 0.005 + time * 0.002) * 3;
            
            ctx.lineTo(x, y + wave + noiseFactor);
        }
        
        ctx.strokeStyle = this.lineColor;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }

    drawCircles(time) {
        const { ctx, canvas } = this;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Concentric circles that gently pulse
        for (let i = 1; i < 5; i++) {
            const baseRadius = 50 * i;
            const pulse = Math.sin(time * 0.004 + i) * 10;
            const radius = baseRadius + pulse;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.lineColor;
            ctx.globalAlpha = this.opacity * 0.6;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }
    }

    animate = () => {
        const { ctx, canvas } = this;
        
        // Clear canvas with background
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        // Draw horizontal animated lines
        for (let y = 0; y < canvas.height; y += this.lineSpacing) {
            const offset = (y / canvas.height) * Math.PI * 2;
            this.drawLine(y, offset);
        }
        
        // Draw concentric circles
        this.drawCircles(this.time);
        
        // Add subtle gradient overlay
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width
        );
        gradient.addColorStop(0, 'rgba(26, 26, 24, 0)');
        gradient.addColorStop(1, 'rgba(26, 26, 24, 0.3)');
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Increment time for animation
        this.time += this.speed;
        
        this.animationId = requestAnimationFrame(this.animate);
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('topoCanvas');
    if (canvas) {
        new TopoAnimator(canvas);
    }
});
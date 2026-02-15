+++
title = """MeshBeacon: Because Your Mesh Network Should Actually DO Something"""
date = 2026-02-14T21:07:07+01:00
draft = false
+++

![BI Head Brain](/images/muos.jpg)
## Take It. Make It Yours.

MeshBeacon is open source. Every line of it.

I didn't build this so it could run on one node in San Jose. I built it so it could run everywhere. Fork the repository. Change the coordinates to your city. Add your local weather stations. Point the earthquake monitor at your fault lines. Write a new broadcast module for something I haven't thought of yet.

The APIs are free. The code is free. The spectrum is shared. The only thing required is the willingness to build something that matters.

And here's what I believe — genuinely believe — about this project: the best version of MeshBeacon hasn't been written yet. It's going to be written by someone I've never met, in a city I've never visited, solving a problem I've never encountered. That's how good software works. You put it into the world, and the world makes it better than you ever could alone.

So take it. Adapt it. Make it yours. Make it *insanely* useful.

And then put it on your mesh network and let it run.

### **[github.com/salmancuso/MeshBeacon](https://github.com/salmancuso/MeshBeacon)**

---

## The Moment

There's a moment — and if you've ever built anything that matters, you know exactly what I'm talking about — there's a moment where you look at a piece of technology and you see not what it is, but what it *could* be.

Most people looked at MeshCore and saw a messaging tool. A way to send text over radio. And that's fine. That's what it does on the surface. But that's like looking at a piano and seeing a piece of furniture.

I looked at MeshCore and saw an information network waiting to happen.

---

## The Problem Nobody Was Solving

We have this incredible mesh radio technology — LoRa devices that can communicate miles apart, no cell towers, no internet, no infrastructure dependency. And what are people doing with it? Sending "hello" messages. Testing range. Arguing about channel etiquette.

That's not a network. That's a toy.

A real network delivers information that matters. A real network makes your life better every single time you turn it on. A real network doesn't wait for you to ask — it anticipates what you need and puts it in front of you.

That's what MeshBeacon is.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   "You turn on your radio,                           │
│    and the information is there."                    │
│                                                      │
│   That's not a feature. That's a philosophy.         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## What MeshBeacon Delivers

```
☀️  Solar Propagation    — Is the band open? Now you know.
🌤️  Weather Reports      — Hyper-local. Real-time. Useful.
🔴  Earthquake Alerts    — When the ground moves, you know.
⚠️  Skywarn Alerts       — NWS watches, warnings, advisories.
📻  SOTA/POTA Spots      — Who's activating near you.
📅  Event Notifications  — Never miss a net again.
All automated. All under 135 bytes. All over RF.
```

Seven scripts. Seven problems solved. One common foundation.

---

## The Architecture of Simplicity

Every broadcast script follows the same elegant pattern:

```
    ┌─────────────────┐
    │  Fetch data     │   ← Public APIs (free, no keys for most)
    │  from the world │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │  Distill into   │   ← 135 bytes of meaning
    │  what matters   │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │  Deliver it     │   ← Over radio. No internet on receiving end.
    │  over RF        │
    └─────────────────┘
```

That constraint — 135 bytes — is not a limitation. It's a gift. It forces clarity. It demands that every single character earn its place. When you only have 135 bytes, you can't be lazy. You can't dump raw data on someone and call it a feature. You have to *think* about what matters.

And when you think about what matters, you build something beautiful.

The foundation — `meshcore_send.py` — handles device connections and channel resolution. Channels are matched by cryptographic secret, not by slot index. This is a small detail, but small details are what separate things that work from things that work *every single time*. Slot indices change. Secrets don't. So the system is reliable by design, not by luck.

Configuration lives in simple `.keys` files. No databases. No YAML nested fourteen levels deep. No configuration framework that requires its own configuration. Just plain text, key-value pairs, human-readable. You open the file, you understand it, you edit it, you're done.

```
┌─────────────────────────────────────────────────────────────┐
│                    How It All Connects                      │
│                                                             │
│  weather.keys ──┐                                           │
│  calendar.keys ─┤                                           │
│  meshcore.keys ─┤──→  Broadcast Scripts ──→  MeshCore Radio │
│                 │      (7 Python files)       (BLE/Serial)  │
│  Public APIs ───┘            │                    │         │
│                              │                    ▼         │
│                         ┌────┴────┐        ┌────────────┐   │
│                         │ 135-byte│        │ LoRa Mesh  │   │
│                         │ messages│───────→│  Network   │   │
│                         └─────────┘        └────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Weather — `weather_broadcast.py`

The weather matters. It matters if you're planning a field operation, coordinating emergency response, or deciding whether to put up an antenna. MeshBeacon pulls real-time observations from Personal Weather Stations and forecasts from Weather Underground and delivers a clean, consistent six-line report:

```
┌─────────────────────────┐
│ WX San Jose             │
│ Temp 58F Feels 56F      │
│ Hi 63F Lo 44F           │
│ Hum 65% Rain 20%        │
│ Wind 5mph NW G10        │
│ Partly Cloudy           │
└─────────────────────────┘
```

Hyper-local data. Multiple stations. Twice a day. Your mesh network becomes a weather service.

---

## Earthquakes — `earthquake_broadcast.py`

We live in seismically active territory. The USGS monitors every tremor, and MeshBeacon puts that data on your radio within minutes. Magnitude 2.5 and above, within 100 miles, color-coded by severity.

```
┌──────────────────────────────────────┐
│ EARTHQUAKE                           │
│ 🟡 M3.3 - 5 km SW of Ridgemark       │
│ 46.5mi from SJC | Depth: 5.0mi       │
│ Feb 11 03:34 PST                     │
└──────────────────────────────────────┘

   Severity Scale:
   🟢 Minor    (M2.5–2.9)
   🟡 Light    (M3.0–3.9)
   🟠 Moderate (M4.0–4.9)
   🔴 Major    (M5.0+)
```

No cell network required. No internet required. When the infrastructure that everyone depends on goes down — and in an earthquake, it will — this still works. That's not a theoretical benefit. That's the entire reason mesh networks exist.

---

## Skywarn Severe Weather — `skywarn_broadcast.py`

Earthquakes are dramatic. Weather is deadly.

The National Weather Service issues watches, warnings, and advisories every day across the country. Skywarn — the NWS volunteer spotter network — has been the backbone of severe weather reporting since 1972. MeshBeacon brings that institutional knowledge directly to your mesh radio.

`skywarn_broadcast.py` pulls active NWS alerts and broadcasts them, filtered by your location and the severity you care about. Give it a zip code. Give it coordinates. Give it a state. It finds what matters and delivers it in one clean message.

```
┌──────────────────────────────┐
│ ⚠️ SKYWARN                   │
│ 🟠 Svr T-Storm Wrn           │
│ Santa Clara County, CA       │
│ Until 3:45 PM PST            │
│ 23mi                         │
└──────────────────────────────┘

   Severity Scale:
   🔴 Extreme  — Extraordinary threat
   🟠 Severe   — Significant threat
   🟡 Moderate — Possible threat
   🟢 Minor    — Minimal threat
   ⚪ Unknown  — Not yet determined
```

The engineering underneath is careful. It combines two separate NWS API queries — point-based and area-based — to ensure comprehensive coverage. It deduplicates by alert ID. It computes distance from your center point to each alert polygon's centroid. It abbreviates event names intelligently to stay under 135 bytes. Every decision in the formatting pipeline exists because the constraint demanded it.

```
  How the NWS queries merge:

  Point Query ──→ ┐
  (your exact     │──→  Deduplicate ──→  Radius Filter ──→  Severity Sort
   location)      │      by Alert ID      by Centroid         Most severe
  State Query ──→ ┘                       Distance            first
  (broader area)
```

The `--skywarn-only` flag is a lesson in restraint. It limits output to the events that matter in a Skywarn context — tornadoes, severe thunderstorms, flash floods — filtering out the frost advisories and wind chill warnings that would dilute the signal. Sometimes the best feature is knowing what to leave out.

And when there's nothing to report:

```
┌──────────────────────────────┐
│ ⚠️ SKYWARN                   │
│ ✅ No active alerts          │
│ San Jose, CA                 │
│ Radius: 50mi                 │
└──────────────────────────────┘
```

In emergency communications, silence is data too. The `--send-clear` flag makes that explicit.

No API keys. No accounts. Just the National Weather Service — one of the most important public services in America — feeding your mesh network directly.

---

## Solar Propagation — `solar_broadcast.py`

This one is for the radio operators who actually understand what propagation means and why it determines whether you make contacts today or talk to yourself.

Solar flux index. Sunspot numbers. K-index. X-ray classification. HF band conditions for every band from 80 meters through 10 meters. Automatic NOAA-scale alerts when geomagnetic storms, solar flares, or radiation events are in progress.

```
┌───────────────────────┐     ┌───────────────────────┐
│ ☀️ SOLAR:             │      │ 📡 BANDS D/N:         │
│ SFI=185               │     │ 80 = ✅                │
│ SN=85                 │     │ 40 = ✅                │
│ A=5                   │     │ 30 = ✅                │
│ K=2                   │     │ 20 = 🟡                │
│ Xray=A1.2             │     │ 17 = 🟡                │
│ Wind=425km/s          │     │ 15 = ❌                │
│ Bt=-3nT               │     │ 12 = ❌                │
│ [10 Feb 1800z] ✅     │     │ 10 = ❌                │
└───────────────────────┘     └───────────────────────┘
```

Add VHF mode and you get two more messages: sporadic-E status, aurora conditions, meteor shower proximity, and a tropospheric ducting index computed from real atmospheric pressure-level data.

That ducting index — I'm particularly proud of this — uses temperature inversions at 925 and 850 hectopascals to calculate whether the marine layer is creating conditions for VHF/UHF signal enhancement. It's actual atmospheric science, distilled into a single number on a ten-point scale.

```
┌───────────────────────┐     ┌───────────────────────┐
│ 🔭 VHF:               │      │ 🌊 TROPO SJC:         │
│ Es=Band Closed        │     │ Idx=6/10              │
│ Aurora=No Aurora      │     │ dT=+12F@925mb         │
│ Meteor=Perseids+14d ❌│     │ Pres=1022mb           │
└───────────────────────┘     │ ✅ Likely             │
                              └───────────────────────┘
```

One glance. You know everything you need to know.

When conditions warrant, the system fires automatically:

```
┌──────────────────────────────────────────────────────────┐
│ 💥🔆💫 ALERT: Geomag=G2(K=6+) Flare=M5.1(R2) Wind=650km/s │
└──────────────────────────────────────────────────────────┘
```

You don't have to check anything. The script does the analysis.

---

## Calendar Events — `calendar_broadcast.py`

Community coordination shouldn't require people to remember to check a website. MeshBeacon connects to a Google Sheet, reads your event calendar, and sends reminders 24 hours and 2 hours before each event.

```
┌──────────────────────────────┐
│ EVENT TOMORROW:              │
│ WVARA Net                    │
│ Sat Feb 14 @ 7:00 PM         │
│ Weekly 2m net on 146.76 MHz  │
└──────────────────────────────┘

  Notification Timeline:
  ─────────────────────────────────────────────────►
  │                        │                    │
  T-24hr                T-2hr               Event
  "TOMORROW"          "IN 2 HOURS"          Start
```

Nets, field days, VE sessions, club meetings — the information finds the people, not the other way around. State tracking prevents duplicates. Events route to appropriate channels automatically. You set it up once and it runs forever.

---

## SOTA/POTA Spots — `sotapota_broadcast.py`

Summits on the Air. Parks on the Air. Real-time activator spots showing who is out there right now, on what frequency, at what distance from you.

```
┌───────────────────────┐     ┌───────────────────────┐
│ SOTA                  │     │ POTA                  │
│ W6/SC-001             │     │ US-4701               │
│ Call: KG6NBO          │     │ Call: KC1GGP          │
│ SSB 14.244            │     │ SSB 14.307            │
│ 14:30 PST             │     │ 09:31 PST             │
│ 978mi NW of SJC       │     │ 45mi SE of SJC        │
└───────────────────────┘     └───────────────────────┘
```

Intelligent filtering by band and distance — separate radius rings for HF and VHF because the physics are different and the software should be smart enough to know that.

```
  Distance Filtering:

  HF  (1–30 MHz):    ◄──────────────────────────────► 1000 mi
  VHF (≥ 30 MHz):    ◄───────► 100 mi

  Donut queries supported:
  HF example:              ◄━━━━━━━━━━━━━━━━━► 300–1000 mi
                     ╳╳╳╳╳╳  (skip nearby HF — work them on VHF)
```

Deduplication by callsign. Automatic exclusion of operators who've signed off. Pre-filtering by geographic association to minimize API calls. Every 15 minutes during daytime hours, your mesh network tells you where the action is.

---

## The Invisible Work

People sometimes ask me what took so long, or why the scripts are so detailed for something that "just sends messages." And the answer is the same answer it always is when someone builds something that feels simple: the simplicity is the hard part.

Making a message fit in 135 bytes while remaining instantly readable — that took dozens of iterations. Getting channel resolution to work by cryptographic secret instead of brittle slot indices — that required understanding the MeshCore protocol at a level most people never bother with. Computing a tropospheric ducting index from raw atmospheric pressure data — that meant learning the actual physics of temperature inversions and signal propagation through the boundary layer. Merging point-based and area-based NWS alert queries, deduplicating by ID, and computing distances to polygon centroids — that meant understanding how the National Weather Service actually models alert geometry.

The earthquake monitor doesn't just dump USGS data. It calculates distance and bearing from a reference point, converts depth from kilometers to miles, selects an appropriate severity indicator, formats the time in local timezone, and truncates gracefully if the place name is too long — all while staying under 135 bytes. Every edge case handled. Every message consistent.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  "This is the work that nobody sees.                 │
│   And it's the most important work there is,         │
│   because when you do it right, people don't         │
│   notice the engineering. They just notice           │
│   that it works. Every time."                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Why This Matters

We are building something important here. Not important in the way that people use that word when they're trying to sell you something. Important in the way that matters when the power goes out, when the cell towers go dark, when the internet stops being something you can take for granted.

Mesh networks are infrastructure. Real infrastructure. The kind that doesn't depend on a company keeping its servers running, or a government keeping the lights on, or a cable staying uncut at the bottom of the ocean. A mesh network works because the people in it make it work.

```
  Traditional Infrastructure          Mesh Infrastructure

  📱 → 🗼 → ☁️ → 🗼 → 📱              📻 ←→ 📻 ←→ 📻 ←→ 📻
       │                                    ↕       ↕
  (Single points of failure)           📻 ←→ 📻 ←→ 📻
                                  
  Cell tower down? Done.           Node down? Route around it.
  Internet out? Done.              No internet needed. Ever.
  Power grid fails? Done.         Solar + battery = indefinite.
```

MeshBeacon makes it work *better* — by ensuring that the network isn't just a communication channel, but an information service.

Weather data that helps people make decisions. Earthquake alerts that provide situational awareness when it matters most. Severe weather warnings that reach people when cell networks can't. Propagation data that helps operators use the radio spectrum effectively. Event coordination that keeps communities connected.

This is what the technology was always meant to do. We just had to build the software to make it happen.

---

## Get Started in Five Minutes

```
  Step 1    git clone https://github.com/salmancuso/MeshBeacon.git
  Step 2    pip install -r requirements.txt
  Step 3    cp meshcore.keys.example meshcore.keys && edit
  Step 4    python meshcore_send.py --list-channels
  Step 5    python weather_broadcast.py --dry-run

  That's it. You're in.
```

---

73 (That's radio speak for regards)

Sal

W6SAL
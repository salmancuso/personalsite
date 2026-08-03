---
title: "LoRa Radios and Antennas for MeshCore: A Practical Review"
date: 2026-02-23
description: "Technical guidance on selecting appropriate hardware for MeshCore mesh deployments"
image: "/images/posts/radioReview/nodes.jpg"
tags: ["meshcore", "hardware", "antenna", "review"]
---

Let's talk about something that actually matters: the hardware you use for MeshCore deployments. Not the flashy stuff. The practical stuff that determines whether your mesh network functions reliably or becomes an expensive paperweight.

## Antennas First

Your antenna matters more than your radio. I'm not exaggerating. A mediocre radio with an excellent antenna will consistently outperform an excellent radio with a mediocre antenna.

For LoRa (915 MHz in the US), you want antennas designed for that frequency range. Generic quarter-wave monopoles work, but they're not optimal. Purpose-built LoRa antennas are worth the investment.

**What to look for:**

- Frequency tuning for 915 MHz (or your region's frequency)
- Reasonable gain (2-3 dBi is typical for omnidirectional)
- Low SWR (Standing Wave Ratio) at the operating frequency
- Weather-resistant construction for permanent outdoor deployments

Antenna type depends on your deployment. Omnidirectional antennas provide 360-degree coverage. Directional antennas provide better range in specific directions. Choose based on your coverage needs.

## Radio Selection

For MeshCore, you're typically choosing between:

**LoRa dev boards** (Heltec, RAK Wisblock, etc): Good for experimentation. Varied build quality and features.

**Commercial LoRa products**: More expensive but generally better engineered and more reliable.

**DIY custom builds**: Possible but requires real RF knowledge. Easy to get wrong.

Most people should use established LoRa platforms. They've been debugged by thousands of users. Support is available. This matters when something breaks.

## Power Considerations

Permanent deployments need permanent power. Solar charging + battery + supercapacitor backup is the gold standard for remote deployments.

Mobile/portable deployments depend on battery life. Lower power LoRa allows for multi-day battery life on standard batteries. Higher spread factors use less power but slower data rates.

Understand the tradeoffs. High power = better range but faster battery drain. Low power = longer battery life but shorter range.

## Real-World Performance

Your actual range depends on:

- Antenna quality and placement
- Transmit power level
- LoRa spreading factor (higher SF = longer range but slower data)
- Path loss (terrain, obstacles, etc.)

Theoretical range formulas give you ballpark figures. Actual range requires on-site testing with your specific antennas and terrain.

## Construction and Weatherproofing

Outdoor installations need weatherproof enclosures. Moisture and salt air are brutal on electronics. Proper enclosures add cost but dramatically improve reliability.

Antenna connectors and cable connections degrade in moisture. Use quality connectors and weatherproof junction boxes. Cheap connectors cause intermittent failures that are hell to troubleshoot.

## The Practical Recommendation

Start with established LoRa platforms (Heltec, RAK) for development and testing. Use quality antennas designed for 915 MHz. Plan for proper power and weatherproofing from the start.

Infrastructure deployments aren't the place for experimentation. Use proven hardware. Invest in reliability.

---

**73**

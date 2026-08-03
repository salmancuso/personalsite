---
title: "Over-The-Air (OTA) Firmware Updates: Updating Your Remote Mesh Nodes"
date: 2026-02-01
description: "How to safely perform OTA firmware updates on MeshCore repeaters and nodes without climbing trees"
image: "/images/posts/OTA/windTurbine.jpg"
tags: ["meshcore", "firmware", "ota", "deployment"]
---

The moment you install a repeater in the most inconvenient location possible—top of a tree, your roof peak, a cell tower—is the exact moment a firmware update becomes necessary. That's just how Murphy's Law works with communication equipment.

But here's the beautiful thing: you don't need to climb that tree again. OTA (Over-The-Air) updates let you push new firmware wirelessly. You just need to be within reasonable WiFi or Bluetooth range, and your node handles the rest.

## Before You Start

Download the firmware from the official source: [https://flasher.meshcore.co.uk/](https://flasher.meshcore.co.uk/)

Select whether you're updating a Room Server/Repeater or just a standard Repeater. They're different—pick the right one.

**Critical**: Download the **non-merged** `.bin` file, not the merged one. I don't know why there are two options or what "merged" technically means, but I know that picking the wrong one results in 20 minutes of frustration wondering why nothing works.

## The OTA Update Process

**Step 1: Connect to Your Node**

Get within reasonable range of your node's WiFi or Bluetooth connection. "Reasonable" varies, but if you can see the device or the antenna, you're probably close enough. You need a stable connection to avoid corruption during the update.

**Step 2: Access the Configuration Interface**

Open your browser to your node's configuration page. This is usually `meshtastic.local` or the node's IP address if you know it. The web interface is pretty straightforward—you'll see a settings/configuration menu.

**Step 3: Locate the Firmware Update Section**

Look for an "Upgrade" or "Firmware Update" button/link. Most interfaces make this pretty obvious.

**Step 4: Select Your Downloaded Firmware File**

Browse to the non-merged `.bin` file you downloaded. Select it and confirm.

**Step 5: Wait for the Update to Complete**

This typically takes 2-5 minutes. Don't interrupt the process, don't move out of range, don't power cycle the device. Just wait. The node will show a progress indicator (usually).

**Step 6: Verify the Update**

Once the update completes, the node will reboot automatically. Check the firmware version to confirm you're running the new version.

## Potential Issues

**Connection Drops During Update**

If WiFi/Bluetooth drops mid-update, the firmware upload fails and the node keeps its old firmware. No permanent damage, just failed attempt. You can retry immediately.

**Node Won't Connect After Update**

If a node becomes unresponsive after an OTA update, you have two options:
1. Wait 5-10 minutes for it to fully boot (some updates take longer)
2. Perform a USB-based firmware reflash to recover

USB recovery always works as a fallback, so OTA updates are relatively low-risk.

**Slow Upload Speeds**

If your node's WiFi signal is weak, upload speeds can be glacial. This increases the risk of connection dropout. If possible, get closer to the node or use Bluetooth (usually more reliable for short distances).

## Best Practices

**Before updating any critical node:**
- Make sure you have USB connectivity available as a fallback
- Test the update on a non-critical node first
- Schedule updates for low-traffic times
- Have a recovery plan if the update goes sideways

**Timing matters:**
- Don't update during active emergency operations
- Update during predictable, quiet periods
- Give yourself time to verify the node is working correctly after the update

**Network considerations:**
- If updating a critical repeater, warn users of brief downtime
- Batch update multiple nodes if possible (still individually, but plan them together)
- Monitor the node after update to ensure it's functioning normally

## Why OTA Updates Matter

Manual firmware updates via USB are tedious. They require physical access to the device—which might mean climbing that tree, accessing that remote tower, or driving to the site. OTA updates eliminate that requirement. You can push updates from home, from the office, or from anywhere within WiFi range.

For a growing mesh network with repeaters spread across multiple locations, OTA capability is invaluable. It transforms firmware maintenance from a physical site-visit problem into a wireless management task.

---

**73**

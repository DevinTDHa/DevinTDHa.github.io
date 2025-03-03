---
layout: post
title: Migrate a Raspberry Pi 3 from a failing SD card to an External Hard Drive
date: 2025-03-02
description: How to migrate a running Raspberry Pi 3 on a failing SD card to an external hard drive and boot from it (SATA HDD in an enclosure)
tags: raspberrypi homeserver
categories: diy
related_posts: false
toc:
  beginning: true
  sidebar: left
thumbnail: assets/img/projects/diy/harddrive-pi.webp
related_publications: true
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0" style="max-width: 300px; margin: auto;">
        {% include figure.liquid path="assets/img/projects/diy/harddrive-pi.webp" title="External Hard Drive and Raspberry pi" class="rounded z-depth-1" zoomable=false %}
    </div>
</div>
<div class="caption">
    Artist's rendition of how my setup now looks like. Images from pixabay.
</div>

Following scenario: You use a Raspberry Pi (in my case 3B+) as your tiny home server running some basic scripts and services. You like to periodically check in remotely to admire your little Pi doing its thing. To your shock you get the following message:

```text
$ ssh pi
kex_exchange_identification: read: Connection reset by peer
Connection reset by x.x.x.x port 22
```

But why? It just worked an hour ago? You come home and try the usual, which is replugging it. Hmm, seems to be working fine again. However, you soon encounter the same problem, even when regularly rebooting. This is getting annoying, and you really want it to be reliable. Why is this happening?

> **Summary**
>
> In this post we will
>
> - Identify the problem with our Raspberry Pi
> - Migrate our Pi to an external hard drive, hopefully running more reliably
>   - Note that some of this post is specific to pre Pi 4 models. Newer models have proper USB boot.
> - Iron out some kinks with running from an external hard drive

## Problem

We saw in the introduction, that sometimes the SSH server stops working. In fact, the whole Pi seems to freeze up, as all its services stop functioning as well (for example my Samba server also stopped running).

A quick online search revealed that it seems like the SSH server crashed while connecting {% cite kensterAnswerHowCan2021 %}. I tried looking up journal logs with various `journalctl` commands but could not identify the issue (if someone knows how I could've solved this with that, please let me know).

My Pi is set up to be headless (access only with SSH), so I had to really make a mess connecting it to my PC screen. At least on that, I recognized a useful hint:

```text
[2120927.947503] EXT4-fs error (device mmcblk0p2): _ext4_find_entry: 1664: inode #301
46561: comm systemd: reading directory lblock 0
[2120928.072284] EXT4-fs error (device mmcblk0p2): _ext4_find_entry: 1664: inode #301
46561: comm ngrok: reading directory lblock 0
[2120930.950441] EXT4-fs error (device mmcblk0p2): _ext4_find_entry: 1664: inode #301
46561: comm (python): reading directory lblock 0
[...]
```

According to another online search {% cite EXT4fsErrorDevice %}, it seems like my file system is corrupted! I remember reading somewhere, that SD cards are generally quicker to fail, when doing a lot of write operations. As my Pi has been running for at least a year at that point, I concluded that this could be the potential culprit.

## Solution

### Initial Cloning to a fresh SD Card

To determine if the SD card is actually the culprit, I cloned the current one to a different SD card that I had lying around. For this, I used a great tool called `rpi-clone` {% cite geerlingGeerlingguyRpiclone2025 %}. It allows you to clone a booted medium on a Pi to a different medium. There is also a slightly outdated guide that I used {% cite MigrateRaspberryPi %}. In that guide you need to manually set boot partitions. If you use the newest version of rpi-clone you do not need to do that, actually.

The cloning went well without further issues and I let my Pi run for about 10 days before I decided to clone it to an external hard drive. I recently upgraded my PC with more storage, so I had a 1TB SATA drive (I'll refer to this as just the hard drive) that was not used. This would be a good opportunity to both have larger and more reliable storage for the Pi.

### Cloning it to an External Hard Drive in an Enclosure

First, I needed a way to connect the hard drive to my Pi. It seems that the best method would be to get an external powered SATA enclosure {% cite bAnswerHowCan2015 %}, as the USB power output of the Pi can be limited. Not sure why exactly anymore, but I got this random one from eBay {% cite ORICOFestplattengehaeuse35 %}.

Similarly, we can use rpi-clone again to clone from an SD card to an external hard drive. The only thing that's different this time, is that the partition names are slightly different between the two media. The name of the partitions for the SD card have the format `mmcblk0pX` while hard drives have `sdaX`.

After the cloning process, I remove the SD card and try boot up the Pi from the hard drive. Lights are blinking in a weird way and... nothing. It doesn't work! It turns out, that some of the guides are only applicable to Pi generations 4 and up, as these have proper USB boot enabled. The most reliable way to boot a Pi 3B+ is to leave the SD card plugged in and specify the hard drive as the boot partition {% cite RunningRaspbianUSB %}.

To achieve this, we can take another look at the migration guide {% cite MigrateRaspberryPi %}. At step 6, the author describes that we need to change the `cmdline.txt` (by default located on the SD card at `/dev/mmcblk0p1`). Specifically, we need to change `root=/dev/mmcblk0p2` to specify the root partition of the Pi. If we execute `sudo lsblk -o name,partuuid` we can inspect the PARTUUID of the desired device (in my case `/dev/sda2`). After changing the root partition it should look something like

```bash
$ cat cmdline.txt
console=serial0,115200 console=tty1 root=PARTUUID=f1b2df46-02 rootfstype=ext4 fsck.repair=yes rootwait roo
tdelay=5 fsck.mode=force
```

After rebooting, it works! The Pi seems to work as expected and I can hear the hard drive spinning in its enclosure. Finally, victory?

### Power saving settings for the External Hard Drive

Following scenario: You use a Raspberry Pi (in my case 3B+) as your tiny home server running some basic scripts and services, _now running from a hard drive_. You like to periodically check in remotely to admire your little Pi doing its thing. To your shock you get the following message:

```text
$ ssh pi
kex_exchange_identification: read: Connection reset by peer
Connection reset by x.x.x.x port 22
```

Oh, the humanity! Please don't let me go through this whole thing again... I wrestle cables around to connect it to a screen again and see

```text
[2120927.947503] EXT4-fs error (device sda2): _ext4_find_entry: 1664: inode #301
46561: comm systemd: reading directory lblock 0
[2120928.072284] EXT4-fs error (device sda2): _ext4_find_entry: 1664: inode #301
46561: comm ngrok: reading directory lblock 0
[2120930.950441] EXT4-fs error (device sda2): _ext4_find_entry: 1664: inode #301
46561: comm (python): reading directory lblock 0
[...]
```

Same thing! Why is this happening? At this point I tried several approaches (disk checks and repairs) and nothing seems to be working. I despair, as I realize that I might have cloned corrupted files from the old partition... but I'm too lazy to set it up again from scratch.

As a temporary solution I resorted to regular reboots (which didn't even work reliably). However one time, I noticed that the external drive was making sounds, before I read a file. It sounded suspiciously like the disk was _spinning up_. I also noticed, that the LED lights on my enclosure were different and not glowing. Another time I tried to SSH in, heard the spinning sound and then saw the error message. This must be the issue!

Other people also seem to have experienced this {% cite HDDSpinDisconnects %}, where the power management of the disk messes up the Pi. There is a command to control this called `hdparm` and I looked at its manual {% cite Hdparm8LinuxManual %} to change the following power-related parameters:

| Parameter | Description                             | Function                                                                                                                                                                                                                                                                                               |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-B 254`  | Advanced Power Management (APM) setting | Get/set Advanced Power Management feature, if the drive supports it. A low value means aggressive power management and a high value means better performance.  Possible settings range from values 1 through 127 (which permit spin-down), and values 128 through 254 (which do not permit spin-down). |
| `-S 0`    | Spindown (idle) timeout setting         | Put the drive into idle (low-power) mode, and also set the standby (spindown) timeout for the drive. A value of zero means "timeouts are disabled"                                                                                                                                                     |
| `-Z`      | Disable drive's sleep mode              | Disable the automatic power-saving function of certain Seagate drives (ST3xxx models?), to prevent them from idling/spinning-down at inconvenient times.                                                                                                                                               |

Thus, the command to execute this is `sudo hdparm -S 0 -B 254 -Z /dev/sda`. To run this command at startup, we can edit the file `/etc/udev/rules.d/69-hdparm.rules` to include

```text
ACTION=="add", SUBSYSTEM=="block", KERNEL=="sda", RUN+="/usr/sbin/hdparm -S 0 -B 254 -Z /dev/sda"
```

where `/dev/sda` is my hard drive. With this set up the Pi seems to be running very stable! I saw it running for at least a month straight with no issue. That is, until I tried to mess with these settings (no need to have it at full power after all!) but it just caused problems. I ran out of patience and just left it at that.

## Conclusion

In this post we saw how we can migrate a Pi running on a faulty SD card to a more permanet form of storage, namely a hard drive in an external enclosure. To achieve this, we cloned the running partition using `rpi-clone` and adjusted `cmdline.txt` to specify the root partition during boot to the hard drive. Finally, we ironed out some kinks using `hdparm` to disable some power saving settings of the drive, which caused issues.

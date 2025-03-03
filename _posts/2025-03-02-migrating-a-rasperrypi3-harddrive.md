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
>   - Note that some of this post is specific to pre Pi 4 models, as they behave better when booting from USB
> - Iron out some kinks with running from an external hard drive

## Problem

We saw in the introduction, that sometimes the SSH server stops working. In fact, the whole Pi seems to freeze up, as all its services stop functioning as well (for example my Samba server also stopped running).

A quick online search revealed that it seems like the SSH server crashed while connecting {% cite kensterAnswerHowCan2021 %}. I tried looking up journal logs with various `journalctl` commands but could not identify the issue (if someone knows how I could've solved this with that, please let me know).

My Pi is set up to be headless (no screen), so I had to really make a mess connecting it to my computer screen. On the screen, I recognized a useful hint:

```text
[2120927.947503] EXT4-fs error (device sda2): _ext4_find_entry: 1664: inode #301
46561: comm systemd: reading directory lblock 0
[2120928.072284] EXT4-fs error (device sda2): _ext4_find_entry: 1664: inode #301
46561: comm ngrok: reading directory lblock 0
[2120930.950441] EXT4-fs error (device sda2): _ext4_find_entry: 1664: inode #301
46561: comm (python): reading directory lblock 0
[...]
```

(*Note: I believe this is actually from a later screenshot I took when trying to set it up with my HDD, but it should be the same error. More on that later.*)

According to another online search {% cite EXT4fsErrorDevice %}, it seems like my file system is corrupted! I remember reading somewhere, that SD cards are generally quicker to fail, when doing a lot of write operations. As my Pi has been running for at least a year at that point, I concluded that this could be the potential culprit.

## Solution




## Conclusion

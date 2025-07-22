---
title: It's Okay to Make Mistakes — Even in the Linux Kernel
date: 2025-07-19
tags: ["post", "lfx", "linux-kernel", "kconfig"]
layout: post.njk
permalink: "blog/lfx/first-major-mistake/index.html"
---

If there's one thing I've learned from contributing to the Linux kernel, it's this:

> **You're allowed to make mistakes. Just don't break anything big :)**

---

#### The Bug That Came After the Patch

So I had sent in this patch to fix `strncpy()` in the `nconf` tool ([Commit link](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=1b92b18ec419cac4bb57e405ac1f571e0943a950)) to ensure null termination. It was reviewed, accepted, and applied. All was well... or so I thought.

Until a few days later, I saw this in my inbox:

[**[BUG linux-next] nconfig: uncleared lines of text on help screens**](https://lore.kernel.org/lkml/CAK7LNAT54nvwYmTy20Ep8U2kr4thn68yYWXi9R-d3Yx3iXs=Bg@mail.gmail.com/T/#)

```c
When using F1, F2, or F3 (Help, SymInfo, or Help 2), short lines
of text are not cleared (blanked, space-filled).

Example F1:

  ┌── Global help ───────────────────────────────────────────────────────────┐
 ┌│                                                                          │┐
 ││ Help windows                                                             ││
 ││ ------------                                                             ││
 ││ o  Global help:  Unless in a data entry window, pressing <F1> will give `││
 ││    you the global help window, which you are just reading.F1> will give `││
 ││    you the global help window, which you are just reading.F1> will give `││
 ││ o  A short version of the global help is available by pressing <F3>.ive `││
 ││ o  A short version of the global help is available by pressing <F3>.ive `││
 ││ o  Local help:  To get help related to the current menu entry, use anye `││
 ││    of <?> <h>, or if in a data entry window then press <F1>.y, use anye `││
 ││    of <?> <h>, or if in a data entry window then press <F1>.y, use anye `││
 ││    of <?> <h>, or if in a data entry window then press <F1>.y, use anye `││
 ││ Menu entries>, or if in a data entry window then press <F1>.y, use anye `││
 ││ ------------>, or if in a data entry window then press <F1>.y, use anye `││
 ││ This interface lets you select features and parameters for the kernelye `││
 ││ build.  Kernel features can either be built-in, modularized, or removed.`││
 ││ Parameters must be entered as text or decimal or hexadecimal numbers.ed.`││
 ││ Parameters must be entered as text or decimal or hexadecimal numbers.ed.`││
 ││ Menu entries beginning with following braces represent features that.ed.`


Example F2:

     ┌── Sysfs syscall support ──────────────────────────────────────────┐
 ┌── │                                                                   │────┐
 │   │ CONFIG_SYSFS_SYSCALL:                                             │    │
 │ [*│ CONFIG_SYSFS_SYSCALL:                                             │    │
 │ [ │ sys_sysfs is an obsolete system call no longer supported in libc. │    │
 │ [*│ Note that disabling this option is more secure but might breakbc. │    │
 │   │ compatibility with some systems.is more secure but might breakbc. │    │
 │ [ │ compatibility with some systems.is more secure but might breakbc. │    │
 │ [*│ If unsure say N here.me systems.is more secure but might breakbc. │    │
 │ < │ If unsure say N here.me systems.is more secure but might breakbc. │    │
 │ [*│ Symbol: SYSFS_SYSCALL [=n]stems.is more secure but might breakbc. │    │
 │ -*│ Type  : boolS_SYSCALL [=n]stems.is more secure but might breakbc. │    │
 │ -*│ Defined at init/Kconfig:1600ems.is more secure but might breakbc. │    │
 │ [*│   Prompt: Sysfs syscall support.is more secure but might breakbc. │    │
 │ [ │   Location:ysfs syscall support.is more secure but might breakbc. │    │
 │ [*│     -> General setupall support.is more secure but might breakbc. │    │
 │ [ │       -> Sysfs syscall support (SYSFS_SYSCALL [=n])might breakbc. │    │
 │ -*│       -> Sysfs syscall support (SYSFS_SYSCALL [=n])might breakbc. │    │
 │ [ │       -> Sysfs syscall support (SYSFS_SYSCALL [=n])might breakbc.


Example F3:

 ┌──┌── Short help ────────────────────────────────────────────────────────┐──┐
 │  │                                                                      │  │
 │ [│ Legend:  [*] built-in  [ ] excluded  <M> module  < > module capable. │  │
 │ [│ Submenus are designated by a trailing "--->", empty ones by "----".. │  │
 │ [│ Submenus are designated by a trailing "--->", empty ones by "----".. │  │
 │  │ Use the following keys to navigate the menus: empty ones by "----".. │  │
 │ [│ Move up or down with <Up> or <Down>.he menus: empty ones by "----".. │  │
 │ [│ Enter a submenu with <Enter> or <Right>.enus: empty ones by "----".. │  │
 │ <│ Exit a submenu to its parent menu with <Esc> or <Left>.s by "----".. │  │
 │ [│ Pressing <y> includes, <n> excludes, <m> modularizes features.---".. │  │
 │ -│ Pressing <Space> cycles through the available options.eatures.---".. │  │
 │ -│ To search for menu entries press </>.vailable options.eatures.---".. │  │
 │ [│ <Esc> always leaves the current window.ilable options.eatures.---".. │  │
 │ [│ <Esc> always leaves the current window.ilable options.eatures.---".. │  │
 │ [│ Pressing <1> may be used instead of <F1>, <2> instead of <F2>, etc.. │  │
 │ [│ For verbose global help press <F1>. <F1>, <2> instead of <F2>, etc.. │  │
 │ -│ For help related to the current menu entry press <?> or <h>.>, etc.. 

```
At first glance, I panicked a bit. A *bug report* on a patch I had sent in. Not ideal. But after taking a step back, I carefully went through the report and realized the issue was most likely from this line I had changed:

```c
- tmp[len] = '\0';
+ tmp[sizeof(tmp) - 1] = '\0';
```
This was supposed to fix a strncpy() issue, but it ended up truncating help messages in nconfig. And yep, the maintainer confirmed that the regression was introduced by my change.

---

#### Fixing What I Broke
So the next step was clear: send a fix.
Here's the patch that I sent:
🔗 https://lore.kernel.org/linux-kbuild/934992e6-9a2d-426d-8bd7-895062966214@infradead.org/T/#

At the time of writing this, I haven’t received a formal review yet, but the original bug reporter tested it and confirmed that the fix works. That’s definitely a relief.

As per the Linux kernel process, it’s good practice to wait two weeks before following up if there’s no response. So I’ll wait. Patience is part of the workflow.

---

#### What I Learnt
- Even careful patches can go wrong.
- Linux kernel is a community. Whether you're new or experienced, you're welcomed, encouraged, and mentored.
- Mistakes are part of learning. What matters is how quickly and responsibly you respond.
- Maintainers are human. They’re busy and yet still take time to respond and guide you. Always be respectful of their time.

Also... I still mess up the small things:
- Forgetting to update changelogs (v2, v3 etc.)
- Missing links to previous reports
- Minor git send-email mistakes
But that's okay. These things are fixable, and the community understands that.

---

#### What's Next?
I’m currently working on patches in the selftests and BPF areas, so you’ll definitely see more blogs soon.

I also want to write about:
- Patches I sent but weren’t accepted because there’s a lot to learn from why something gets rejected.
- Tips on git send-email, and eventually, b4 - which I’m planning to explore more.

And of course, updates on the Rust kernel patches, which are still under review. It’s a big series and I’m really looking forward to seeing it go in.
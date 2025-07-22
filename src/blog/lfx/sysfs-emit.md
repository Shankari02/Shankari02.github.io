---
title: Getting Familiar with OrangeFS – and Making (and Fixing) Mistakes
date: 2025-07-15
tags: ["post", "lfx", "linux-kernel", "fs"]
layout: post.njk
permalink: "blog/lfx/sysfs-emit/index.html"
---
So my next patch came from a suggestion by Shuah, my LFX mentor - a small but important cleanup in the FS subsystem.

#### What was it?

This time, it was about replacing `scnprintf()` with `sysfs_emit()` in the FS sysfs code. Why? Well, because the kernel documentation clearly states in `Documentation/filesystems/sysfs.rst` that `show()` functions should only use `sysfs_emit()` or `sysfs_emit_at()` to ensure correct formatting of user-visible data. So yep, seemed simple enough - search, replace, test, send. I selected the `orangefs-sysfs.c` file.

The commit:
```c
fs: orangefs: replace scnprintf() with sysfs_emit()

Documentation/filesystems/sysfs.rst mentions that show() should only
use sysfs_emit() or sysfs_emit_at() when formating the value to be
returned to user space. So replace scnprintf() with sysfs_emit().

Signed-off-by: Shankari Anand <shankari.ak0208@gmail.com>
Signed-off-by: Mike Marshall <hubcap@omnibond.com>
```
There were a lot of places to update in the same file (`orangefs-sysfs.c`). I verified the patch twice, just to be sure.

...Except, I still managed to mess up one line 🤦🏽‍♀️
A small copy-paste mistake slipped through in one of the replacements and I didn’t run `xfstests` either (because I didn’t know I should!).

---
Example change in the Patch:
```c

diff --git a/fs/orangefs/orangefs-sysfs.c b/fs/orangefs/orangefs-sysfs.c
index 04e15dfa504aaf..369455b354efa0 100644
--- a/fs/orangefs/orangefs-sysfs.c
+++ b/fs/orangefs/orangefs-sysfs.c
@@ -217,36 +217,31 @@ static ssize_t sysfs_int_show(struct kobject *kobj,
 
 	if (!strcmp(kobj->name, ORANGEFS_KOBJ_ID)) {
 		if (!strcmp(attr->attr.name, "op_timeout_secs")) {
-			rc = scnprintf(buf,
-				       PAGE_SIZE,
+			rc = sysfs_emit(buf,
 				       "%d\n",
 				       op_timeout_secs);
 			goto out;
```

---

#### The Fix (and the Lesson)
Luckily, Mike (the maintainer) was super chill about it. He replied saying there's a small mistake but the patch itself is fine, and he even went ahead, fixed it, tested it with `xfstests`. Kindness in open source truly exists 😌.

So, in the next version, I fixed the mistake, ran the xfstests myself (now that I know about them), and sent the revised patch. And on July 15, it got accepted and applied 🎉

---

#### What I Took Away
This one taught me one big thing:
- Testing with the right suite (like xfstests for filesystems) is part of doing things right.

I now see 3 patches with my name and while they’re small, each came with a learning curve. I'm still waiting for my Rust patch series to be reviewed, but this one gave me a good confidence boost.

- [The Commit upstream](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=d03e0b97244d89abaf38aa776300a60df3222e7a)


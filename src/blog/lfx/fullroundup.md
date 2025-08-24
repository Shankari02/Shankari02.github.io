---
title: My Experience with the Linux Bug Fixing Mentorship Program Spring 2025 (Part-time)
date: 2025-08-24
tags: ["post", "lfx", "linux-kernel"]
layout: post.njk
permalink: "blog/lfx/full-round-up/index.html"
---

I applied for the **Linux Bug Fixing Mentorship Program (Spring 2025, Part-time)** in January 2025. A few of my college seniors had previously graduated from this program, and they encouraged me to participate. Their main point was simple - *this program would help me gain hands-on exposure to the Linux kernel: its workflow, how contributions are made, and the fundamentals of bug-fixing*.  

Looking back, I can say they were absolutely right.

---

### Application Period (January – February)

The application itself had a good number of tasks, which were designed to give applicants a **primary understanding of kernel contribution flow**:
- How patches are generated and submitted.
- How bugs are listed on [syzbot](https://syzkaller.appspot.com/).
- Using tools like `ftrace` and `strace` for debugging.
- Running tests using **kselftests** and **KUnit**.

During this time, I submitted my first small **Documentation patch**. For that, I had to set up `git send-email`. I initially tried sending directly, but quickly realized the “From:” field was showing my GitHub ID instead of my real name. The reviewer pointed this out, and I had to go fix my GitHub settings.  

👉 That was my very first learning: **identity and metadata matter just as much as the patch content**.

---

### Selection and Onboarding (March 2025)

In the **first week of March**, I got the email that I was selected as a mentee 🎉.  

We had the onboarding meet where **Shuah Khan** walked us through:
- How to start contributing.
- What kinds of contributions are considered.
- Tips for sending patches.
- The overall workflow of the program.

I had my college exams during the early weeks, so I couldn’t start contributing right away. But once they were done, I got into the real fun part.

---

### My First Contribution – `strncpy` to `strscpy`

One of my early tasks was working on replacing the use of `strncpy` with `strscpy`.  

- `strncpy`: Copies characters from source to destination, but does **not always null-terminate the string**, which can lead to bugs.
- `strscpy`: A safer version that ensures null termination and avoids buffer overflows.

I found some files still using `strncpy`, so I submitted patches. I got reviews quickly, but before I could resend the fixed versions, someone else had already submitted and their patches had landed in `linux-next`.  

Still, I kept searching and found more cases under **Kconfig**. However, there I ran into another issue: **`strscpy` is not supported in Kconfig**. So, I tried replacing it with `snprintf`.

- `snprintf`: Prints formatted data into a buffer, always null-terminating.
- But in my case, the maintainer (**Masahiro Yamada**) suggested it would be better to just add explicit null-termination instead of using `snprintf`.

So, I updated my patch accordingly and resent it. That became my first accepted contribution.

---

### Exploring Rust for Linux

I’ve always been curious about Rust, but never had much hands-on experience. The mentorship gave me a perfect chance to dive in.  

I started with small tasks like **documentation improvements**, such as clarifying the invariant for `MiscDeviceRegistration`.  

Next, I contributed to a **refactoring task**:
- Moving `ARef` and `AlwaysRefCounted` modules from `types.rs` to `sync/aref.rs`.
- Updating the call sites where these modules were used.

At first, I made two patches (move + update). The maintainers suggested splitting the update patch **subsystem-wise**, so that respective subsystem maintainers could review and ack them separately.  

This turned into **multiple patches**, some of which are now in `linux-next` while others have already made it into **mainline** 🎉.  

---

### OrangeFS Contribution

I also worked on **replacing `scnprintf()` with `sysfs_emit()`** in `show` functions of **OrangeFS**.  

This was suggested in the kernel docs (`Documentation/filesystems/sysfs.rst`), and my patch got reviewed and accepted.

---

### Other Attempts

I also tried contributing to the conversion of `.txt` bindings to `.yaml` for device tree documentation. That patch hasn’t been accepted upstream yet, but it was a good learning experience in itself.

---

### My Contributions So Far

✅ **4 patches are already present on mainline**:  
- [commit b9ff1c – Rust Documentation fix](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=b9ff1c2a26fa31216be18e9b14c419ff8fe39e72)  
- [commit 313bf5 – OrangeFS: scnprintf → sysfs_emit](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=313bf5b79ed1e218b8b793bb297e5d24bdeed0cc)  
- [commit f46899 – Kconfig null-termination](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=f468992936894c9ce3b1659cf38c230d33b77a16)  
- [commit 07dad4 – Rust: Move ARef / AlwaysRefCounted](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=07dad44aa9a93b16af19e8609a10b241c352b440)  

✅ **Several others are in linux-next**: 
- [Check all the commits here](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/log/?qt=author&q=Shankari+Anand)  

✅ Some are still under review.  

---

### Gratitude and Next Steps

This program has been a huge learning experience. From figuring out patch metadata, to handling reviews, to exploring Rust for Linux, every step taught me something new.  

I sincerely thank **Shuah Khan** for organizing this mentorship and for being so prompt and helpful whenever needed.  

Going forward, I want to contribute more to:
- **Rust for Linux**
- **BPF subsystem** (where I’ve already started working on a patch!)

---

### Closing Thoughts

The Linux kernel community is huge and sometimes intimidating, but this mentorship program made it approachable. I not only learned kernel internals and workflows, but also got my first real experience contributing to upstream Linux.  

If you’re curious about kernel development, **I’d strongly recommend applying for this mentorship program in the future.**

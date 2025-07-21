---
title: My First Patch Upstreamed to the Linux Kernel (Rust Subsystem)
date: 2025-07-01
tags: ["post", "lfx", "rust-for-linux"]
layout: post.njk
permalink: "blog/lfx/first-patch-upstream/index.html"
---

**1st July 2025** was a special day for me, I had my first patch accepted **upstream in the Linux kernel**! It was a contribution to the Rust abstraction for `miscdevice`, and the experience taught me a lot about contributing to large, community-driven projects like the kernel.

Though this wasn't the first patch I submitted to the mailing list, but yes, it was the first to be accepted!

---

#### Why Rust? Why the Kernel?

I’ve always been interested in both **low-level systems programming** and **Rust**. So when I found out that the **Linux kernel was gaining Rust support**, I was instantly curious. The `rust-for-linux` initiative is gradually introducing safe abstractions for kernel development in Rust.

But of course, contributing to the Linux kernel can be intimidating. So I decided to start with a “**good first issue**”.

---

#### The Patch

The patch I submitted clarified the **invariant documentation** for the `MiscDeviceRegistration` struct, which is part of the Rust interface to kernel `miscdevice`s.

Here’s a link to the issue I worked on:  
[Issue #1168](https://github.com/Rust-for-Linux/linux/issues/1168)

---

#### Before and After

Initially, the documentation simply said:

```c
/// # Invariants
///
/// `inner` is a registered misc device.
```
This felt vague. The improved version broke the invariant down more explicitly:
```c
/// # Invariants
///
/// - `inner` contains a `struct miscdevice` that is registered using
///   `misc_register()`.
/// - This registration remains valid for the entire lifetime of the
///   [`MiscDeviceRegistration`] instance.
/// - Deregistration occurs exactly once in [`Drop`] via `misc_deregister()`.
/// - `inner` wraps a valid, pinned `miscdevice` created using
///   [`MiscDeviceOptions::into_raw`].
```

A look to the Patch on the Mailing list: [rust: miscdevice: clarify invariant for `MiscDeviceRegistration`](https://lore.kernel.org/all/20250626104520.563036-1-shankari.ak0208@gmail.com/)
This change makes the contract much more precise and helpful for anyone reading or maintaining the code.

---

#### The Review Process
The patch went through two iterations. In my first version:
I hadn't formatted the list as bullets, which reduced clarity and one of the points was slightly incorrect.

Thanks to a helpful review from Benno Lossin, I quickly fixed both in the second version. After that, it was accepted and merged into linux-next!

Here’s the patch commit: [b9ff1c2a26fa](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=b9ff1c2a26fa31216be18e9b14c419ff8fe39e72)

---

#### What I Learned
This patch was a small one, but it taught me much more:
- How the kernel's Rust code is organized and documented.
- How the patch acceptance process works.

That contributing doesn't always mean writing big features. Even small doc fixes help improve the overall quality.

I also want to highlight just how clean and well-structured the Rust part of the kernel is. The codebase is extremely well-documented, making it easy for newcomers to understand. This patch was also an attempt to preserve and improve that clarity.

---

#### What’s Next?
I'm excited to continue contributing to the kernel and deepen my understanding of systems programming and Rust. If you're someone who's been considering contributing but unsure where to start, go look at the [“good first issues”](https://github.com/Rust-for-Linux/linux/issues?q=state%3Aopen%20label%3A%22good%20first%20issue%22) in the Rust for Linux GitHub or on the mailing list. There's room for everyone!

Signed-off-by: Me 😄
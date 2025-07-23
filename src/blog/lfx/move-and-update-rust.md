---
title: Long series of patches and still waiting...
date: 2025-07-17
tags: ["post", "lfx", "rust-for-linux", "sync"]
layout: post.njk
permalink: "blog/lfx/aref-change-rust/index.html"
---

So this patch series began when I looked at this [issue](https://github.com/Rust-for-Linux/linux/issues/1173) in the Rust for Linux project. It looked pretty simple on the surface.

> “Just move these parts (ARef and AlwaysRefCounted) into a new file, clean it up, done.”

---

#### The Rabbit Hole
I started out by moving the `ARef` and `AlwaysRefCounted` modules to a new files `sync/aref.rs` and removed them from `types.rs`.

```c
diff --git a/rust/kernel/sync/aref.rs b/rust/kernel/sync/aref.rs
new file mode 100644
index 00000000000000..dbd77bb68617ca
--- /dev/null
+++ b/rust/kernel/sync/aref.rs
@@ -0,0 +1,154 @@
+// SPDX-License-Identifier: GPL-2.0
+
+//! Internal reference counting support.
+
+use core::{marker::PhantomData, mem::ManuallyDrop, ops::Deref, ptr::NonNull};
+
+/// Types that are _always_ reference counted.
+///
+/// It allows such types to define their own custom ref increment and decrement functions.
+/// Additionally, it allows users to convert from a shared reference `&T` to an owned reference
+/// [`ARef<T>`].
+///
+/// This is usually implemented by wrappers to existing structures on the C side of the code. For
+/// Rust code, the recommendation is to use [`Arc`](crate::sync::Arc) to create reference-counted
+/// instances of a type.
+///

and so on..
```
You can have a look at the complete file [here](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/tree/rust/kernel/sync/aref.rs?id=07dad44aa9a93b16af19e8609a10b241c352b440).

Once, this was done, I had to test it ofcourse. The moment I ran `make LLVM=1`, I realized:

```c
error[E0432]: unresolved import `crate::types::ARef`
  --> rust/kernel/block/mq/operations.rs:13:5
   |
13 |     types::ARef,
   |     ^^^^^^^^^^^ no `ARef` in `types`
   |
   = help: consider importing this struct instead:
           crate::sync::aref::ARef

error[E0432]: unresolved imports `crate::types::ARef`, `crate::types::AlwaysRefCounted`
  --> rust/kernel/block/mq/request.rs:11:13
   |
11 |     types::{ARef, AlwaysRefCounted, Opaque},
   |             ^^^^  ^^^^^^^^^^^^^^^^ no `AlwaysRefCounted` in `types`
   |             |
   |             no `ARef` in `types`
   |
   = help: consider importing this struct instead:
           crate::sync::aref::ARef
   = help: consider importing this trait instead:
           crate::sync::aref::AlwaysRefCounted

error[E0432]: unresolved import `crate::types::AlwaysRefCounted`
  --> rust/kernel/cred.rs:14:13
   |
14 |     types::{AlwaysRefCounted, Opaque},
   |             ^^^^^^^^^^^^^^^^ no `AlwaysRefCounted` in `types`
   |
   = help: consider importing this trait instead:
           crate::sync::aref::AlwaysRefCounted

error[E0432]: unresolved import `crate::types::ARef`
  --> rust/kernel/device.rs:10:13
   |
10 |     types::{ARef, Opaque},
   |             ^^^^ no `ARef` in `types`
   |
   = help: consider importing this struct instead:
           crate::sync::aref::ARef

it was long... ending with -
error: aborting due to 28 previous errors

Some errors have detailed explanations: E0405, E0412, E0432.
For more information about an error, try `rustc --explain E0405`.
make[2]: *** [rust/Makefile:538: rust/kernel.o] Error 1
make[1]: *** [/home/shankari/rust_linux/Makefile:1286: prepare] Error 2
make: *** [Makefile:248: __sub-make] Error 2

```
There were references to `ARef` and `AlwaysRefCounted` all over the place. So this wasn't just about moving code; it involved updating all the call sites too.

I started wondering - should I really send this as one massive patch? It didn’t seem ideal. So I dropped a comment on the issue asking whether I should split the moving and refactoring. The maintainers replied with a clear *yes*.

I also had to declare the new file in `sync.rs` in this way:
```c

diff --git a/rust/kernel/sync.rs b/rust/kernel/sync.rs
index 096cb78c8ec3e5..00f9b558a3ade1 100644
--- a/rust/kernel/sync.rs
+++ b/rust/kernel/sync.rs
@@ -10,6 +10,7 @@ use crate::types::Opaque;
 use pin_init;
 
 mod arc;
+pub mod aref;
 pub mod completion;
 mod condvar;
 pub mod lock;
```

---

#### Learning About git --base
So I sent the first patch, just the moving one. And that's when someone pointed out:

> "Add --base to your git format-patch command."

That was a neat trick I hadn’t used before. It helps indicate the base commit over which your patch is applied, so reviewers don’t face weird diffs or merge conflicts. Been using it ever since for every patch.

---

#### Iterations Begin...
In v2, I sent both patches - the moving one and the call-site updates. But there was one thing which I took care about i.e. I re-exported the reference to `sync/aref.rs` in `types.rs` so even if only the first patch was picked, it wouldn't create an issue.

```c
pub use crate::sync::aref::{ARef, AlwaysRefCounted};
```

Except... I messed up. Again.
Some extra lines sneaked into the new file. No clue how it happens every time with me🥺 but hey, we learn from it. So I fixed it and sent v3.

That’s when maintainers pointed out something important:
> The call-site updates should be split subsystem-wise, so each maintainer can review  their relevant part and potentially give Acked-by.

They were kind enough to even give me an example to follow (you’ll see it in the Email thread if you're curious).

I also learnt a new thing present in rust-linux. Rust follows strict styling. So as soon as you run `make rustfmtcheck`, it will list all the styling issues. But don't worry, you can simply run `make rustfmt` and it will fix everything for you! That's truly honestly. It also has the Clippy tool which I haven't explored yet, but will surely do it soon.

---

#### Interactive Rebase Is Magic 🚀
Once I figured that out, I started digging through the tree to identify which subsystem each call-site belonged to and broke it down into separate patches.

That’s when I truly appreciated how powerful `git rebase -i` is. Being able to split, edit, squash, and reorder patches made everything feel more manageable. It went from one giant wall of change to a clean, modular patch series.

---

#### Confusion (and a Bit of a Gamble)
I hit a bit of a gray area when it came to the core kernel files.
Some of them had different maintainers here and there. I wasn’t sure if I should split these out too, but honestly, the series was already long enough and splitting these would take it higher by an additional 10.

```c
rust/kernel/auxiliary.rs     |  2 +-
rust/kernel/cred.rs          |  6 +-----
rust/kernel/device.rs        | 10 +++-------
rust/kernel/devres.rs        |  3 +--
rust/kernel/dma.rs           |  2 +-
rust/kernel/opp.rs           | 13 +++++++------
rust/kernel/pci.rs           |  5 +++--
rust/kernel/pid_namespace.rs |  5 +----
rust/kernel/platform.rs      |  2 +-
rust/kernel/task.rs          |  7 ++++---
```
If they ask me to separate them later, I’ll do it. But for now, I decided to leave them grouped.

---

#### Still Waiting...
So yeah, that’s the story of this patch series. Definitely the most involved one I’ve done yet.

The [first patch (the move)](https://lore.kernel.org/rust-for-linux/DBCLH4WXYTJL.FDZ9B39OO3TY@kernel.org/T/#mb67fbddcd894665d6ec6b0854e37930dedab468b) has already been accepted, which gave me a bit of peace of mind 😌

Now I’m just waiting on Acked-bys for the rest. Fingers crossed 🤞
Hopefully they’ll all be upstreamed soon!

---

#### Update, as on 22nd July 2025

The moving patch is applied to linux-next - [Commit 07dad44aa9a9](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=07dad44aa9a93b16af19e8609a10b241c352b440)

---

The series:
[1/7](https://lore.kernel.org/rust-for-linux/CANiq72k1ENBFw7eNc5Kb5cFagysqfsHt9a=Tr4NxuVcV2TD=nQ@mail.gmail.com/T/#mc3f4d39ca2d92ef4343fb60dd09450c3502d83c0), [2/7](https://lore.kernel.org/rust-for-linux/20250716090941.811418-1-shankari.ak0208@gmail.com/T/#u), [3/7](https://lore.kernel.org/rust-for-linux/20250716091158.812860-1-shankari.ak0208@gmail.com/T/#u), [4/7](https://lore.kernel.org/rust-for-linux/20250716091827.816971-1-shankari.ak0208@gmail.com/T/#u), [5/7](https://lore.kernel.org/rust-for-linux/20250717072724.14602-1-shankari.ak0208@gmail.com/T/#u), [6/7](https://lore.kernel.org/rust-for-linux/20250717073108.14943-1-shankari.ak0208@gmail.com/T/#u), [7/7](https://lore.kernel.org/rust-for-linux/20250717073450.15090-1-shankari.ak0208@gmail.com/T/#u)

(PS: I might have referenced this blog in few others just beacuse its been going on for quite a while now, but yes, there has been a lot of learning through this and the maintainers have been really good throughout.)
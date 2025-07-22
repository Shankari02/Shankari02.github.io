---
title: Long series of patches and still waiting...
date: 2025-07-17
tags: ["post", "lfx", "rust-for-linux", "sync"]
layout: post.njk
permalink: "blog/lfx/aref-change-rust/index.html"
---

So this patch series began when I looked at this [issue](https://github.com/Rust-for-Linux/linux/issues/1173) in the Rust for Linux project. It looked pretty simple on the surface.

> “Just move these parts (ARef and AlwaysRefCounted) into a new file, clean it up, done.”

At least that’s what I thought…

---

#### The Rabbit Hole
The moment I ran `make LLVM=1`, I realized:
There were references to `ARef` and `AlwaysRefCounted` all over the place. So this wasn't just about moving code; it involved updating all the call sites too.

I started wondering - should I really send this as one massive patch? It didn’t seem ideal. So I dropped a comment on the issue asking whether I should split the moving and refactoring. The maintainers replied with a clear *yes*.

---

#### Learning About git --base
So I sent the first patch, just the moving one. And that's when someone pointed out:

> "Add --base to your git format-patch command."

That was a neat trick I hadn’t used before. It helps indicate the base commit over which your patch is applied, so reviewers don’t face weird diffs or merge conflicts. Been using it ever since for every patch.

---

#### Iterations Begin...
In v2, I sent both patches - the moving one and the call-site updates.

Except... I messed up. Again.

Some extra lines sneaked into the new file. No clue how it happens every time with me🥺 but hey, we learn from it. So I fixed it and sent v3.

That’s when maintainers pointed out something important:
The call-site updates should be split subsystem-wise, so each maintainer can review their relevant part and potentially give Acked-by.
They were kind enough to even give me an example to follow (you’ll see it in the Email thread if you're curious).

---

#### Interactive Rebase Is Magic 🚀
Once I figured that out, I started digging through the tree to identify which subsystem each call-site belonged to and broke it down into separate patches.

That’s when I truly appreciated how powerful `git rebase -i` is. Being able to split, edit, squash, and reorder patches made everything feel more manageable. It went from one giant wall of change to a clean, modular patch series.

---

#### Confusion (and a Bit of a Gamble)
I hit a bit of a gray area when it came to the core kernel files.
Some of them had different maintainers here and there. I wasn’t sure if I should split these out too, but honestly, the series was already long enough and splitting these would take it higher by an additional 10.

If they ask me to separate them later, I’ll do it. But for now, I decided to leave them grouped.

---

#### Still Waiting...
So yeah, that’s the story of this patch series. Definitely the most involved one I’ve done yet.

The [first patch (the move)](https://lore.kernel.org/rust-for-linux/DBCLH4WXYTJL.FDZ9B39OO3TY@kernel.org/T/#mb67fbddcd894665d6ec6b0854e37930dedab468b) has already been accepted, which gave me a bit of peace of mind 😌

Now I’m just waiting on Acked-bys for the rest. Fingers crossed 🤞
Hopefully they’ll all be upstreamed soon!

---

#### Update, as on 22nd July 2025

The moving patch is applied to rust-next - [Commit 07dad44aa9a9](https://github.com/Rust-for-Linux/linux/commit/07dad44aa9a93b16af19e8609a10b241c352b440). Should show up in the [linux-next](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/) upstream soon!

---

The series:
[1/7](https://lore.kernel.org/rust-for-linux/CANiq72k1ENBFw7eNc5Kb5cFagysqfsHt9a=Tr4NxuVcV2TD=nQ@mail.gmail.com/T/#mc3f4d39ca2d92ef4343fb60dd09450c3502d83c0), [2/7](https://lore.kernel.org/rust-for-linux/20250716090941.811418-1-shankari.ak0208@gmail.com/T/#u), [3/7](https://lore.kernel.org/rust-for-linux/20250716091158.812860-1-shankari.ak0208@gmail.com/T/#u), [4/7](https://lore.kernel.org/rust-for-linux/20250716091827.816971-1-shankari.ak0208@gmail.com/T/#u), [5/7](https://lore.kernel.org/rust-for-linux/20250717072724.14602-1-shankari.ak0208@gmail.com/T/#u), [6/7](https://lore.kernel.org/rust-for-linux/20250717073108.14943-1-shankari.ak0208@gmail.com/T/#u), [7/7](https://lore.kernel.org/rust-for-linux/20250717073450.15090-1-shankari.ak0208@gmail.com/T/#u)

(PS: I might have referenced this blog in few others just beacuse its been going on for quite a while now, but yes, there has been a lot of learning through this and the maintainers have been really good throughout)
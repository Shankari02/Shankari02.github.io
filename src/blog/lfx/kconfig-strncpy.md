---
title: Fixing `strncpy()` in `nconf`
date: 2025-07-02
tags: ["post", "lfx", "linux-kernel", "kconfig"]
layout: post.njk
permalink: "blog/lfx/second-patch-upstream/index.html"
---

I have been putting patches right from when I was selected as a mentee in the Linux Kernel Bug Fixing Program Spring 2025. Though initially, not much of my patches received positive reviews, I wanted to keep going. 

One of the areas I saw recurring discussions about was the **deprecation of `strncpy()`** in favour of safer alternatives like `strscpy()`. That gave me the idea for my next patch = a small but meaningful change in the **userspace part of the kernel**: the `nconf` tool used for Kconfig configuration.

---

## The Problem with `strncpy()`

The `strncpy()` function in C is known for a subtle and dangerous behavior — **it does not null-terminate** the destination buffer if the source string is longer than the buffer size. This can result in string overflows, memory corruption or other undefined behaviour down the line.

In kernel space, the recommended replacement is `strscpy()`, a safer function that always null-terminates the destination. But in **userspace** (like `nconf`), `strscpy()` isn't available. That made this issue tricky.

---

## Finding the Fix

Initially, I thought of replacing `strncpy()` with `snprintf()`, a safer standard library alternative that also handles null termination. But after some discussion with the maintainer **Masahiro Yamada**, he suggested a cleaner and simpler solution:

> Just **keep the `strncpy()`** and **manually ensure null termination** by setting the last byte of the buffer to `\0`.

So that’s what I did.

---

## The Patch

Here’s what the final patch did:
- After each `strncpy()`, I explicitly null-terminated the buffer with:  
  ```c
  buffer[sizeof(buffer) - 1] = '\0';
This ensures that no matter what the input is, the buffer remains null-terminated and safe to use.

Here’s a snippet from one of the affected locations in nconf.c:
```c
strncpy(k_menu_items[index].str, tmp_str, sizeof(k_menu_items[index].str));
+ k_menu_items[index].str[sizeof(k_menu_items[index].str) - 1] = '\0';
```
And similarly, in nconf.gui.c, places like `fill_window()` and `dialog_inputbox()` were fixed the same way.

```c
diff --git a/scripts/kconfig/nconf.gui.c b/scripts/kconfig/nconf.gui.c
index 4bfdf8ac2a9a34..475a403ab8ba48 100644
--- a/scripts/kconfig/nconf.gui.c
+++ b/scripts/kconfig/nconf.gui.c
@@ -177,7 +177,7 @@ void fill_window(WINDOW *win, const char *text)
 		const char *line = get_line(text, i);
 		int len = get_line_length(line);
 		strncpy(tmp, line, min(len, x));
-		tmp[len] = '\0';
+		tmp[sizeof(tmp) - 1] = '\0';
 		mvwprintw(win, i, 0, "%s", tmp);
 	}
 }
@@ -359,6 +359,7 @@ int dialog_inputbox(WINDOW *main_window,
 	x = (columns-win_cols)/2;
 
 	strncpy(result, init, *result_len);
+	result[*result_len - 1] = '\0';
 
 	/* create the windows */
 	win = newwin(win_lines, win_cols, y, x);
```

---

#### Commit and Review Timeline
The patch was reviewed and accepted on June 27th, and later applied to the linux-kbuild tree on July 2nd, 2025. Thus, it became my second patch upstream!

It was a very smooth review process, and I really appreciated how prompt and helpful Masahiro Yamada was with feedback and suggestions.

- [Lore link](https://lore.kernel.org/linux-kbuild/CAK7LNASxXXVywppjM=aqc4_TohmZnt8PHrc9HVhcZNETwONxUA@mail.gmail.com/T/#)
- [Commit link](https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/commit/?id=1b92b18ec419cac4bb57e405ac1f571e0943a950)

---

#### What I Learned
This patch helped me:
- Understand the differences in APIs between kernel-space and user-space, like why strscpy() isn't available here.
- Handle subtle C bugs involving memory safety.
- Appreciate how small patches can still protect against real bugs in production tools.

---

#### Looking Ahead
I now have a better understanding of how the kernel build system tools work internally and I’m looking forward to contributing more - possibly in areas like selftests or bpf fixes.
---
name: git-update
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Actions
- Stage current changes: `git add .`
- Commit current changes: `git commit -m "[commit message]"`

## Your task

Based on the above changes, create a relevant git commit based on all the changes that have been made. After that, I want you to stage the changes and then commit them with the commit message that you have created.

---
# ── Tracker ────────────────────────────────────────────────────────────────────
# The issue tracker that symphony polls for work.
tracker:
  kind: linear                          # Required. Only "linear" is supported.
  api_key: $LINEAR_API_KEY              # Required. Use $ENV_VAR or a raw string.
  project_slug: 34e421d851f9            # Required. Found in the project URL on Linear.

  # States symphony will pick up and dispatch agents for.
  active_states:
    - To Do
    - In Progress
    - Changes Requested

  # States that mean "done, nothing left to do". Worktrees are cleaned up.
  terminal_states:
    - Done
    - Cancelled
    - Duplicate

  # Where blockers are checked before dispatch. Defaults to the first active state.
  todo_state: To Do
  # State symphony moves an issue to when it claims it.
  in_progress_state: In Progress
  # Moving an issue here (with review comments) re-runs the agent on those comments.
  changes_requested_state: Changes Requested

  # State the orchestrator moves an issue to after the agent finishes.
  review_state: Under Review               # the Claude reviewer posts findings here
  merge_state: Approved                    # move issue here to trigger auto-merge
  escalation_state: Needs Attention        # auto-fix exhausted, P1 found, or agent needs a decision

  # Label gate. Only issues labelled `symphony` are dispatched; issues labelled `manual`
  # are never dispatched (they're picked up by hand). Unlabelled issues are ignored.
  dispatch_label: symphony
  manual_label: manual

# ── Polling ────────────────────────────────────────────────────────────────────
polling:
  interval_ms: 30000                    # How often to poll Linear (ms). Default: 30000.

# ── Workspace ──────────────────────────────────────────────────────────────────
# Where per-issue git worktrees are created.
workspace:
  root: $SYMPHONY_REPO_ROOT/.worktrees  # $SYMPHONY_REPO_ROOT is injected automatically.
  base_branch: dev                      # Branch worktrees are cut from. main is only updated by releasing dev. Also available as {{ base_branch }} in hooks and the prompt.

# ── Hooks ──────────────────────────────────────────────────────────────────────
# Shell scripts run at key lifecycle points. Use bash syntax.
# Available Liquid variables: {{ branch }}, {{ base_branch }}, {{ issue.identifier }}, {{ issue.title }}
hooks:
  # Runs inside the worktree before the agent starts.
  before_run: |
    # Optional: pull latest credentials from GCP Secret Manager so .env stays in
    # sync across runs without manual SSH. Requires gcloud CLI and the VM's service
    # account to have roles/secretmanager.secretAccessor. Replace the secret name.
    # Fetch to a temp file first — writing straight to .env via `>` truncates it even
    # when gcloud fails (e.g. a permission/auth lapse), silently wiping working credentials.
    # fetch_secret() {
    #   local secret_name="$1" dest="$2" tmp
    #   tmp="$(mktemp)"
    #   if gcloud secrets versions access latest --secret="$secret_name" > "$tmp" 2>/dev/null && [ -s "$tmp" ]; then
    #     mv "$tmp" "$dest"
    #   else
    #     rm -f "$tmp"
    #     echo "[symphony] before_run: failed to fetch secret '$secret_name' — leaving $dest untouched" >&2
    #   fi
    # }
    # if command -v gcloud &>/dev/null; then
    #   fetch_secret "<your-secret-name>" "$SYMPHONY_REPO_ROOT/.env"
    # fi
    git fetch origin {{ base_branch }} || true

    # .tmp/ is gitignored, so worktrees don't get the reference docs. Copy them in fresh.
    if [ -d "$SYMPHONY_REPO_ROOT/.tmp/reference" ]; then
      mkdir -p .tmp && rm -rf .tmp/reference
      cp -r "$SYMPHONY_REPO_ROOT/.tmp/reference" .tmp/reference
    else
      echo "[symphony] before_run: no .tmp/reference in repo root — run /create-reference-docs" >&2
    fi

  # Runs inside the worktree after the agent finishes. Typically pushes and opens a PR.
  after_run: |
    command -v gh >/dev/null 2>&1 || export PATH="$PATH:/c/Program Files/GitHub CLI"
    if git log {{ base_branch }}..HEAD --oneline | grep -q .; then
      git push -u origin "{{ branch }}" || true
      gh pr create \
        --title "{{ issue.identifier }}: {{ issue.title }}" \
        --body "Closes {{ issue.identifier }}" \
        --base {{ base_branch }} \
        --head "{{ branch }}" || true
    else
      echo "[symphony] No commits on {{ branch }} — skipping PR"
    fi

  # Runs in the repo root after symphony merges an issue's PR into base_branch.
  # project-lead uses it to refresh the reference docs in the background.
  after_merge: |
    if command -v pl >/dev/null 2>&1; then
      pl refresh-reference --background
    else
      echo "[symphony] after_merge: pl not on PATH — run 'pl install-shim' in a Claude session" >&2
    fi

  # Maximum time (ms) a hook is allowed to run before being killed.
  timeout_ms: 180000

# ── Agent ──────────────────────────────────────────────────────────────────────
agent:
  max_concurrent_agents: 1             # How many agents run in parallel. Default: 1.
  max_turns: 35                        # Max conversation turns per agent run.
  max_retry_backoff_ms: 300000         # Cap on retry backoff delay (ms).

  # Optional: per-state concurrency overrides.
  # max_concurrent_agents_by_state:
  #   Todo: 2
  #   Rework: 1

# ── Codex (agent runtime) ──────────────────────────────────────────────────────
codex:
  # The command used to launch the coding agent.
  command: claude --print --verbose --output-format stream-json --dangerously-skip-permissions

  turn_timeout_ms: 3600000             # Max time for a full agent run (ms). Default: 1 hour.
  stall_timeout_ms: 300000             # Kill agent if no output for this long (ms). Default: 5 min.

# ── Status Server ──────────────────────────────────────────────────────────────
server:
  port: 4243                           # Dashboard port. Set to 0 to disable.
---

You are working on the **Ian Portfolio** project — a single-page Next.js portfolio that turns a visitor’s "can you automate this?" into a conversation with Ian Muigai, a freelance full-stack developer and automation architect.

Before starting work, check if `"$SYMPHONY_REPO_ROOT/.symphony/learnings.md"` exists and read it (it lives in the main checkout, not in your worktree). It contains patterns from past code reviews — apply these proactively to avoid repeating the same mistakes.

## Your first step

Read these reference docs before writing any code:

- `.tmp/reference/01-project-overview.md` — goals and scope
- `.tmp/reference/03-architecture.md` — system design
- `.tmp/reference/04-directory-structure.md` — where things live
- `.tmp/reference/17-implementation-status.md` — what is built vs. pending

Then read any additional files in `.tmp/reference/` relevant to this issue.

## Issue

**{{ issue.identifier }}**: {{ issue.title }}

{{ issue.description }}

{% if comments.size > 0 %}
## Review Feedback to Address

The following feedback was left during the review of your previous attempt.
Read every comment carefully and address each point before finishing.

{% for comment in comments %}
---
**{{ comment.authorName }}** ({{ comment.createdAt }}):
{{ comment.body }}
{% endfor %}
---
{% endif %}

## Working with Linear

Keep the Linear issue up to date as you work using the helper script.
The `LINEAR_API_KEY` environment variable is already set in this session.

**At the start of your session**, post a plan as a checklist. Always include the original issue description above the plan so it is not lost:

```bash
node "$SYMPHONY_HOME/scripts/linear-helper.mjs" describe {{ issue.identifier }} "$(cat <<'PLAN'
{{ issue.description }}

---

## Plan

- [ ] Step one
- [ ] Step two
- [ ] Step three
PLAN
)"
```

**After completing each step**, update the description with that checkbox ticked:

```bash
node "$SYMPHONY_HOME/scripts/linear-helper.mjs" describe {{ issue.identifier }} "$(cat <<'PLAN'
{{ issue.description }}

---

## Plan

- [x] Step one
- [ ] Step two
- [ ] Step three
PLAN
)"
```

## Verification

After completing all code changes and **before committing**, verify the work:

1. Start the dev server and confirm the affected pages/features work correctly
2. Take a screenshot of the finished result and attach it to the issue:

```bash
node "$SYMPHONY_HOME/scripts/linear-helper.mjs" screenshot {{ issue.identifier }} /path/to/screenshot.png
```

3. Stop the dev server

4. Post an implementation summary comment to the Linear issue describing everything you did.

{% if comments.size > 0 %}
This is a **Changes Requested** re-run. Your summary MUST include a "Feedback addressed" section that goes through each review comment and explains exactly what you changed in response. Do not skip this — it is the most important part of the comment.

```bash
node "$SYMPHONY_HOME/scripts/linear-helper.mjs" comment {{ issue.identifier }} "## Changes Made in Response to Review

### Feedback addressed
<!-- Go through each review comment one by one. For each point:
     - Quote or summarise the feedback
     - Explain exactly what you changed to address it and why -->

### Files changed
<!-- List each file you added, modified, or deleted, with a one-line description of what changed in each. -->

### ⚠️ Breaking changes
<!-- Anything that changes an existing API shape, database field/table, prop, or
     behavior that other code or consumers rely on. Omit this section entirely
     if there are none — do not write 'None' or similar filler. -->

### Migration / backfill for existing data
<!-- If this issue adds a field or feature that existing records/tenants need
     seeded/backfilled, describe what data is added and link the script (see
     'Seeding data for existing records' below). Omit this section if no
     backfill is needed. -->

### Notable decisions
<!-- Any non-obvious choices made while addressing the feedback. Omit if everything was straightforward. -->

### Follow-up suggestions
<!-- Brief, simple ideas that would enhance this feature but weren't part of this
     issue's scope — including anything noted in the issue's 'Out of Scope' section
     that's still worth doing later. One line each, no elaboration. Omit this
     section if there's nothing worth flagging. -->"
```
{% else %}
```bash
node "$SYMPHONY_HOME/scripts/linear-helper.mjs" comment {{ issue.identifier }} "## Implementation Summary

### What was done
<!-- Explain what the issue required and how you implemented it. Be specific. -->

### Files changed
<!-- List each file you added, modified, or deleted, with a one-line description of what changed in each. -->

### New functionality
<!-- Describe what the user can now do that they couldn't before. Include UI changes, API endpoints, data flows, or configuration added. -->

### Removed / deprecated
<!-- Anything deleted or intentionally removed. Omit if nothing was removed. -->

### ⚠️ Breaking changes
<!-- Anything that changes an existing API shape, database field/table, prop, or
     behavior that other code or consumers rely on. Omit this section entirely
     if there are none — do not write 'None' or similar filler. -->

### Migration / backfill for existing data
<!-- If this issue adds a field or feature that existing records/tenants need
     seeded/backfilled, describe what data is added and link the script (see
     'Seeding data for existing records' below). Omit this section if no
     backfill is needed. -->

### Notable decisions
<!-- Any non-obvious choices and why you made them. Omit if everything was straightforward. -->

### Follow-up suggestions
<!-- Brief, simple ideas that would enhance this feature but weren't part of this
     issue's scope — including anything noted in the issue's 'Out of Scope' section
     that's still worth doing later. One line each, no elaboration. Omit this
     section if there's nothing worth flagging. -->"
```
{% endif %}

Write the comment body yourself based on your actual work. Be specific and detailed enough that a non-technical reviewer can understand exactly what changed and why.

## Keep your branch mergeable

Other agents may merge to `{{ base_branch }}` while you're working, so your branch
can drift out of sync by the time you finish. Symphony's orchestrator does **not**
resolve merge conflicts itself — an unmergeable PR just stays stuck. Resolve this
yourself as your last step, after committing your work and before finishing:

```bash
git fetch origin {{ base_branch }}
git merge origin/{{ base_branch }}
```

If there are conflicts:
- **Generated/derived docs** (e.g. anything under `.tmp/reference/` or similar
  reference material that *describes* the real code/schema/config rather than
  being a source of truth itself): don't guess a side — check the actual
  already-merged code/config the doc describes and write it to match. Prefer
  the more detailed/specific wording when both sides describe the same thing
  correctly.
- **Code files**: resolve so both your feature and the incoming `{{ base_branch }}`
  change are preserved — conflicts here are usually adjacent, unrelated
  additions (e.g. two different functions/blocks near the same lines), not
  real logical conflicts.
- Re-run `npm run lint` and `npm run build` (and re-verify per the
  Verification section above if you touched user-facing behavior) after
  resolving, then commit the merge.

## Instructions

- You are on branch `{{ branch }}` cut from `{{ base_branch }}`.
- Write or update automated tests that cover this issue's acceptance criteria, and run `npm test`
  before finishing — it must pass. Untested changes will be sent back.
- Follow existing patterns (see `CLAUDE.md` and `DESIGN.md`): Next.js 16 App Router, React 19, TypeScript, Tailwind CSS with the brand tokens in `tailwind.config.ts` (no arbitrary hex classes), shadcn/ui + CVA components in `components/ui/`, Framer Motion and GSAP (gate GSAP with `gsap.matchMedia()` for reduced motion). Project data lives in `data/projects.ts`; the contact form uses React Hook Form + Zod and posts to `app/api/contact/route.ts` (Resend). Unit tests use Vitest + Testing Library; E2E uses Playwright (`npm run e2e`).
- Run `npm run lint` before finishing — fix any errors it reports.
- Run `npm run build` before finishing — it must complete successfully. A
  passing lint does not guarantee a passing build; fix any build errors before
  committing, since a broken build fails deployment. (Only include this step if
  the project has a distinct build step, e.g. `npm run build`, `tsc --build`.)
- Commit your changes with a conventional commit message (`feat:`, `fix:`, `refactor:`, etc.).
- Merge the latest `{{ base_branch }}` into your branch (see "Keep your branch mergeable" above) so the PR the `after_run` hook opens is cleanly mergeable.
- Do **not** push or open a PR — the `after_run` hook handles that automatically.
- If the issue is unclear or blocked on a decision you can't make, **don't guess and don't write a NOTES.md**.
  Commit any useful work so far, then escalate and stop:

  ```bash
  node "$SYMPHONY_HOME/scripts/linear-helper.mjs" escalate {{ issue.identifier }} "<what's blocking you, the options you see, and which you'd recommend>"
  ```

  This posts your question on the issue and moves it to Needs Attention. A human answers in a comment and
  moves it back, and you'll be re-run with their reply.

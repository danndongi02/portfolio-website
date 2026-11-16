// The deploy Action's last step (.github/workflows/deploy.yml): builds the deploy report from the steps'
// outcomes and posts it to the hub's deployResult function. If the hub can't take it (its own deploy may
// be what failed), sends a one-line Telegram message directly. No dependencies: it runs before `npm ci`
// would matter and in tests.
//
//   node scripts/deploy-report.mjs         env: TAG, OUTCOME_FIREBASE, OUTCOME_APPHOSTING, OUTCOME_VERCEL, OUTCOME_HEALTH,
//                                          GATE (deploy|waiting|skipped), GATE_REASON, STARTED_AT,
//                                          HUB_URL, DEPLOY_RESULT_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
//   node scripts/deploy-report.mjs --backfill <notes file>   prints "yes" when the notes hold a Backfill: line
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const TARGETS = ["firebase", "apphosting", "vercel", "health"];

/** A release needs a backfill when its notes have a line starting `Backfill:` (written by the release skill). */
export function isBackfillRelease(notes) {
  return /^Backfill:/m.test(notes ?? "");
}

/** GitHub step outcomes (success | failure | cancelled | skipped | "") → the hub's DeployReport. */
export function buildReport(env, outcomes) {
  const repo = String(env.GITHUB_REPOSITORY ?? "").split("/").pop();
  const gate = env.GATE && env.GATE !== "deploy" ? env.GATE : null;
  // A target the workflow has no step for is left out (its outcome is undefined, not an empty string).
  const targets = gate ? [] : TARGETS.filter((target) => outcomes[target] !== undefined).map((target) => {
    const o = outcomes[target];
    return { target, status: o === "success" ? "success" : o === "failure" || o === "cancelled" ? "failure" : "skipped" };
  });
  const status = gate ?? (targets.some((t) => t.status === "failure") || targets.every((t) => t.status !== "success") ? "failure" : "success");
  return {
    project: env.PROJECT || repo,
    repo,
    tag: env.TAG,
    sha: String(env.DEPLOY_SHA || env.GITHUB_SHA || "").slice(0, 40),
    status,
    targets,
    runUrl: `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`,
    ...(gate && env.GATE_REASON ? { reason: String(env.GATE_REASON).slice(0, 300) } : {}),
    startedAt: env.STARTED_AT || new Date().toISOString(),
    finishedAt: new Date().toISOString(),
  };
}

const EMOJI = { success: "✅", failure: "❌", waiting: "⏸", skipped: "⏸" };

/** Hub first; Telegram directly if the hub refuses or can't be reached. Never throws. */
export async function sendReport(report, { hubUrl, hubSecret, telegramToken, telegramChatId, fetchFn = fetch }) {
  try {
    const res = await fetchFn(hubUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-hub-secret": hubSecret ?? "" },
      body: JSON.stringify(report),
      signal: AbortSignal.timeout(20_000),
    });
    if (res.ok) return "hub";
    console.error(`hub answered ${res.status}: ${(await res.text()).slice(0, 200)}`);
  } catch (e) {
    console.error(`hub unreachable: ${e}`);
  }
  try {
    const text = `${EMOJI[report.status] ?? ""} ${report.repo} ${report.tag} deploy: ${report.status}. Hub unreachable. ${report.runUrl}`.trim();
    const res = await fetchFn(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(20_000),
    });
    if (res.ok) return "telegram";
    console.error(`telegram answered ${res.status}`);
  } catch (e) {
    console.error(`telegram unreachable: ${e}`);
  }
  return "none";
}

async function main(argv, env) {
  if (argv[0] === "--backfill") {
    console.log(isBackfillRelease(readFileSync(argv[1], "utf8")) ? "yes" : "no");
    return 0;
  }
  const report = buildReport(env, { firebase: env.OUTCOME_FIREBASE, apphosting: env.OUTCOME_APPHOSTING, vercel: env.OUTCOME_VERCEL, health: env.OUTCOME_HEALTH });
  console.log(`status: ${report.status}`);
  const via = await sendReport(report, {
    hubUrl: env.HUB_URL, hubSecret: env.DEPLOY_RESULT_SECRET, telegramToken: env.TELEGRAM_BOT_TOKEN, telegramChatId: env.TELEGRAM_CHAT_ID,
  });
  console.log(`reported via: ${via}`);
  // Red run on failure, so GitHub's own failure email is a second net.
  return report.status === "failure" ? 1 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = await main(process.argv.slice(2), process.env);
}

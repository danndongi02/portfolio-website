import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: `http://localhost:${PORT}`,
    // Never reuse a server already on this port: it may belong to another worktree or project, and
    // testing it would pass against the wrong code. A port clash should fail loudly instead.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

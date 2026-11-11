import { describe, expect, it, vi } from 'vitest';

// Load the real Playwright config without Playwright's test runner: defineConfig only returns its argument.
vi.mock('@playwright/test', () => ({
  defineConfig: (config: unknown) => config,
  devices: new Proxy({}, { get: () => ({}) }),
}));

describe('playwright config', () => {
  it('never reuses a server that is already running on an e2e port', async () => {
    const { default: config } = await import('../playwright.config');
    const servers = [config.webServer ?? []].flat();
    expect(servers.length).toBeGreaterThan(0);
    for (const server of servers) expect(server.reuseExistingServer).toBe(false);
  });
});

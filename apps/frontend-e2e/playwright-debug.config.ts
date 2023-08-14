import baseConfig from './playwright.config';
import { devices, PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    ...baseConfig.webServer,
    cwd: '../../',
    port: 3000,
    command: 'npm run dev',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default config;

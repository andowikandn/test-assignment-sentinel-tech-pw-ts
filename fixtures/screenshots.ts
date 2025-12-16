import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    const dir = path.join('screenshots', testInfo.project.name);
    fs.mkdirSync(dir, { recursive: true });

    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${dir}/${testInfo.title}.png`,
      fullPage: true
    });
  }
});

export { expect };
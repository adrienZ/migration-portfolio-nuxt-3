import { test, expect } from '@playwright/test';

test('Homepage', async ({ page, browser }) => {
  await page.goto("/");

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await page.setViewportSize({
    width: page.viewportSize()?.width || 0,
    height: 3000
  })

  await expect(page).toHaveScreenshot({
    fullPage: true, 
  })
});

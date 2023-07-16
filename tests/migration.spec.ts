import { test, expect } from '@playwright/test';


test.describe('index pages', () => {

  const pages = [
    ["Homepage", "/"],
    ["Blog", "/blog"],
    ["2018", "/2018"],
  ]

  pages.forEach(([ name, url]) => {
    test(name, async ({ page }) => {
      await page.goto(url);
    
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
  })
})


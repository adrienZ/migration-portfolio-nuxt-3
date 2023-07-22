import { test, expect, Page } from '@playwright/test';


async function monkeyScrollToForceLazyLoad(page: Page) {
  const body = await  page.$('body');
  await page.waitForLoadState('networkidle'); 

  // bottom
  await page.getByText('👋 Get in touch').scrollIntoViewIfNeeded()
  await page.waitForLoadState('networkidle');
  // top
  await body?.scrollIntoViewIfNeeded()
  await page.waitForLoadState('networkidle');
  // bottom
  await page.getByText('👋 Get in touch').scrollIntoViewIfNeeded()
  await page.waitForLoadState('networkidle');

  // top
  await body?.scrollIntoViewIfNeeded()
  await page.waitForLoadState('networkidle');

  // load iframes
  await page.waitForTimeout(2000);
}


test.describe('index pages', () => {

  const pages = [
    ["Homepage", "/"],
    ["Blog", "/blog"],
    ["2018", "/2018"],
  ] as const

  pages.forEach(([ name, url]) => {
    test(name, async ({ page }) => {
      await page.goto(url);

      if (name === "Homepage") {
        await page.setViewportSize({
          width: page.viewportSize()?.width || 0,
          height: 3000
        })
      } else if(name === "2018") {
      
      } else {
        await monkeyScrollToForceLazyLoad(page);
      }
      

      await expect(page).toHaveScreenshot({
        fullPage: true, 
      })
    });
  })
})




test.describe('posts pages', () => {

  const pages = [
    ["/blog/fr-recap-vuenation-2022-jour-2"],
    ["/blog/fr-recap-vuenation-jour-1"],
    ["/blog/how-to-share-variables-across-html-css-and-javascript-using-webpack"],
    ["/blog/time-saving-css-techniques-to-create-responsive-images"],
    ["/blog/how-to-make-your-app-work-offline-with-the-power-of-javascript"],
  ]

  pages.forEach(([ slug]) => {
    test(slug, async ({ page }) => {
      await page.goto(slug);
    
      await monkeyScrollToForceLazyLoad(page);
    
      await expect(page).toHaveScreenshot({
        fullPage: true, 
      })
    });
  })
})


test.describe('projects pages', () => {

  const pages = [
    ["/case-study/bonne-maman/"],
    ["/case-study/market-me-fr/"],
    ["/case-study/alium-bikes/"],
    ["/case-study/cnje/"],
    ["/case-study/devialet/"],
    ["/case-study/sketchfab/"],
    ["/case-study/pulsar-one/"]
  ]

  pages.forEach(([ slug]) => {
    test(slug, async ({ page }) => {
      await page.goto(slug);
  
      await monkeyScrollToForceLazyLoad(page);
    
      await expect(page).toHaveScreenshot({
        fullPage: true, 
      })
    });
  })
})
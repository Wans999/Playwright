const { setWorldConstructor, World, Before, After, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');
require('dotenv').config();

setDefaultTimeout(30000);
const { chromium } = require('playwright');

class PlaywrightWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(PlaywrightWorld);

Before(async function () {
  const isCI = process.env.CI === 'true';
  this.browser = await chromium.launch({ headless: isCI });
  this.context = await this.browser.newContext({
    recordVideo: {
      dir: '/Users/900173/Documents/playwright/videos/',
      size: { width: 1280, height: 720 }
    }
  });
  this.page = await this.context.newPage();
});

AfterStep(async function () {
  const screenshot = await this.page.screenshot();
  await this.attach(screenshot, 'image/png');
});

After(async function () {
  await this.page.waitForTimeout(1000);
  await this.context.close();
  await this.browser.close();
});
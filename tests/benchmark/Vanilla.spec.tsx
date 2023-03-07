import { Browser, launch, Page } from 'puppeteer';
import { makePerformanceTests } from './shared';

describe('Performance tests - vanilla-js', () => {
  let browser: Browser;
  let page: Page;
  beforeAll(async () => {
    browser = await launch();
    page = await browser.newPage();
    jest.setTimeout(30000);
    await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded',
    });
  });
  afterEach(async () => {
    await page.reload({
      waitUntil: 'domcontentloaded',
    });
  });
  const results = makePerformanceTests(() => page);
  afterAll(async () => {
    expect(await results).toMatchSnapshot('Vanilla JS');
    await browser.close();
  });
});

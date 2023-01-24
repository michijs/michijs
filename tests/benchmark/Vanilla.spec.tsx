import { launch } from 'puppeteer';
import { makePerformanceTests } from './shared';

const browser = await launch();
const page = await browser.newPage();

describe('Performance tests - vanilla-js', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded'
    });
  });
  afterEach(async () => {
    await page.reload({
      waitUntil: 'domcontentloaded'
    });
  });
  const results = makePerformanceTests(page);
  afterAll(async () => {
    expect(await results).toMatchSnapshot('Vanilla JS');
  });
});
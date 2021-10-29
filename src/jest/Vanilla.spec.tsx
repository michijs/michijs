import { makePerformanceTests } from './shared';

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
  const results = makePerformanceTests();
  afterAll(async () => {
    expect(await results).toMatchSnapshot('Vanilla JS');
  });
});
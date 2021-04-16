import { MainElement } from './MainElement';
import { makePerformanceTests } from './shared';
import { Main as vanillaDataController } from './vanillajs/vanillajs.js';
import * as fs from 'fs';
import * as path from 'path';
const vanillaTemplate = fs.readFileSync(path.resolve(__dirname, './vanillajs/index.html'), 'utf8');


describe('Performance tests - vanilla-js', () => {
  let component: MainElement;
  beforeEach(() => {
    document.body.innerHTML = '';
    const html = document.createElement('div');
    html.innerHTML += vanillaTemplate;
    document.body.appendChild(html);
    component = new vanillaDataController() as unknown as MainElement;
  });
  const getComponent = () => {
    return component;
  };

  const results = makePerformanceTests(getComponent, true);
  afterAll(() => {
    expect(results).toMatchSnapshot('vanilla JS');
  });
});
import { LSElement, Attribute, Property, h, Element, LSCustomElement, HTMLAttributes } from '../../LSElement';

@LSElement()
export class LsTestElement extends HTMLElement implements LSCustomElement {
  @Property({ reflect: true, onChange: 'onChangeXd' }) xd = 234;
  @Attribute({ onChange: 'onChangeXD2' }) xd2: string = 'xd';
  @Element({ id: 'xd' }) xdElement: HTMLHeadingElement;
  @Element({ id: 'xd2' }) xd2Element: HTMLHeadingElement;

  // const event = new CustomEvent('allAnimationsFinished', {
  //   detail: this.rippleId,
  //   bubbles: true,
  //   cancelable: false,
  // });
  // this.el.dispatchEvent(event);

  onChangeXd(newValue) {
    this.xdElement.textContent = newValue
  }

  onChangeXD2(newValue) {
    this.xd2Element.textContent = newValue;
  }

  styles() {
    return [
      import('./style.css'),
      import('./style2.css')
    ]
  }

  render() {
    return (
      <>
        <h1 id="xd" onClick={(_ev) => { this.xd++; console.log(this.xd) }}>{this.xd}</h1>
        <h1 id="xd2">{this.xd2}</h1>
      </>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ls-test-element": {
          xd2?: string;
      } & HTMLAttributes;
    }
  }
}
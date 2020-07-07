import { LSElement, Attribute, Property, h, Element } from '../LSElement';

@LSElement()
export class LsTestElement extends HTMLElement {

  @Property({ reflect: true, onChange: 'onChangeXd' }) xd = 234;
  @Attribute({ onChange: 'onChangeXD2' }) asdfXDFG: string = 'xd';
  @Element({ id: 'xd' }) xdElement: HTMLHeadingElement;

  onChangeXd(newValue) {
    console.log(this.xdElement)
    // this.xdElement.textContent = newValue
  }

  onChangeXD2(newValue) {
    if (this.shadowRoot) {
      const result = this.shadowRoot.getElementById("xd2");
      console.log(result);
      result.textContent = newValue
    }
  }

  styles() {
    return [
      require('./style.css'),
      require('./style2.css')
    ]
  }

  render() {
    return (
      <>
        <h1 id="xd" onClick={(_ev) => { this.xd++; console.log(this.xd) }}>{this.xd}</h1>
        <h1 id="xd2">{this.asdfXDFG}</h1>
      </>
    );
  }
}
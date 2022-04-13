import { HTMLElements, SingleJSXElement } from '../../../../src';
import { LSTag } from '../../../../src/LSElement/h/tags/LSTag';
import { ObservableObject } from '../../../../src/LSElement/hooks/observe';
import { getElementFactory, update } from '../../../../src/LSElement/DOMDiff/update';

const areSameNode = (jsx1: SingleJSXElement, jsx2: SingleJSXElement) => {
  // jsx1 and JSX2 are keyed
  if (typeof jsx1 === 'object' && 'key' in jsx1) {
    if (typeof jsx2 === 'object' && 'key' in jsx2)
      return jsx1.key === jsx2.key;
    // jsx1 and JSX2 are primitive
  } else if (typeof jsx2 !== 'object') {
    return true;
  }
  return false;
};

export class List<O> extends HTMLElement {
    data: () => ObservableObject<Array<O>>;
    renderItem: (item: ObservableObject<O>) => JSX.Element;
    props: LSTag<HTMLElements.div, Omit<List<O>, 'props'>>;
    // private nodes: Node[];
    private alreadyRendered = false;
    private template: ChildNode | ParentNode;

    static tag = 'ls-list';

    connectedCallback() {
      this.style.display = 'contents';
      if (!this.alreadyRendered) {
        this.reloadChildren();
        this.data().subscribe((changes) => {
          const newData = this.data();
          const orderedChanges = changes.map(change => Number(change.split('.')[1])).sort((a, b) => a - b);
          if(Number.isNaN(orderedChanges[0]))

            console.log(orderedChanges[0], this.childElementCount);
          console.log(orderedChanges);
          changes.forEach((change) => {
            // console.log(change)
            const changeSplitted = change.split('.');
            const arrayIndex = changeSplitted[1];
            // Nodes were replaced
            if (!arrayIndex)
              this.reloadChildren();
            else {
              const arrayIndexParsed = Number(arrayIndex);
              const newJSX = this.renderItem(newData[arrayIndexParsed]);
              // New nodes
              if (arrayIndexParsed >= this.childElementCount) {
                const el = this.getTemplate().cloneNode(true) as ChildNode;
                update(el, newJSX);
                this.append(el);

                // Old nodes
              } else {
                // const oldNode = this.nodes[arrayIndexParsed];
                // const oldJSX = oldNode.jsxElement;
                // if (areSameNode(oldJSX, newJSX))
                //     oldNode.updateElement(newJSX);
                // else {
                //     // If was moved truncate positions and update

                //     // If not was moved replace with a new node or remove it if 

                // }
              }
            }
          });
        });
        this.alreadyRendered = true;
      }
    }

    getTemplate() {
      if (!this.template)
        this.template = getElementFactory(this.renderItem(this.data()[0])).create();
      return this.template;
    }

    reloadChildren() {
      if (this.hasChildNodes())
        this.textContent = '';

      const data = this.data();

      // const newNodes = data.map(item => {
      //     return LSNode(this.renderItem(item)).valueOf()
      // });
      if (data.length > 0) {
        const template = this.getTemplate();
        const newNodes = data.map(item => {
          const el = template.cloneNode(true);
          update(el, this.renderItem(item));
          return el;
        });

        this.append(...newNodes);
      }
    }
}

window.customElements.define(List.tag, List);
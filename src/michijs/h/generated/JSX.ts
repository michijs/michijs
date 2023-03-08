import { HTMLElements, MathMLElements, SVGElements } from '@michijs/htmltype';
import { Tag } from '../Tag';
import { SingleJSXElement } from '../../types';

declare global {
  namespace JSX {
    type Element = SingleJSXElement;
    interface ElementChildrenAttribute {
      children: JSX.Element; // specify children name to use
    }
    interface IntrinsicElements
      extends HTMLElements,
      MathMLElements,
      SVGElements {
      a: Tag<HTMLElementTagNameMap['a'], HTMLElements['a']>;
      abbr: Tag<HTMLElementTagNameMap['abbr'], HTMLElements['abbr']>;
      address: Tag<HTMLElementTagNameMap['address'], HTMLElements['address']>;
      animate: Tag<SVGElementTagNameMap['animate'], SVGElements['animate']>;
      animateMotion: Tag<
        SVGElementTagNameMap['animateMotion'],
        SVGElements['animateMotion']
      >;
      animateTransform: Tag<
        SVGElementTagNameMap['animateTransform'],
        SVGElements['animateTransform']
      >;
      area: Tag<HTMLElementTagNameMap['area'], HTMLElements['area']>;
      article: Tag<HTMLElementTagNameMap['article'], HTMLElements['article']>;
      aside: Tag<HTMLElementTagNameMap['aside'], HTMLElements['aside']>;
      audio: Tag<HTMLElementTagNameMap['audio'], HTMLElements['audio']>;
      b: Tag<HTMLElementTagNameMap['b'], HTMLElements['b']>;
      base: Tag<HTMLElementTagNameMap['base'], HTMLElements['base']>;
      bdi: Tag<HTMLElementTagNameMap['bdi'], HTMLElements['bdi']>;
      bdo: Tag<HTMLElementTagNameMap['bdo'], HTMLElements['bdo']>;
      blockquote: Tag<
        HTMLElementTagNameMap['blockquote'],
        HTMLElements['blockquote']
      >;
      body: Tag<HTMLElementTagNameMap['body'], HTMLElements['body']>;
      br: Tag<HTMLElementTagNameMap['br'], HTMLElements['br']>;
      button: Tag<HTMLElementTagNameMap['button'], HTMLElements['button']>;
      canvas: Tag<HTMLElementTagNameMap['canvas'], HTMLElements['canvas']>;
      caption: Tag<HTMLElementTagNameMap['caption'], HTMLElements['caption']>;
      circle: Tag<SVGElementTagNameMap['circle'], SVGElements['circle']>;
      cite: Tag<HTMLElementTagNameMap['cite'], HTMLElements['cite']>;
      clipPath: Tag<SVGElementTagNameMap['clipPath'], SVGElements['clipPath']>;
      code: Tag<HTMLElementTagNameMap['code'], HTMLElements['code']>;
      col: Tag<HTMLElementTagNameMap['col'], HTMLElements['col']>;
      colgroup: Tag<
        HTMLElementTagNameMap['colgroup'],
        HTMLElements['colgroup']
      >;
      datalist: Tag<
        HTMLElementTagNameMap['datalist'],
        HTMLElements['datalist']
      >;
      dd: Tag<HTMLElementTagNameMap['dd'], HTMLElements['dd']>;
      defs: Tag<SVGElementTagNameMap['defs'], SVGElements['defs']>;
      del: Tag<HTMLElementTagNameMap['del'], HTMLElements['del']>;
      desc: Tag<SVGElementTagNameMap['desc'], SVGElements['desc']>;
      details: Tag<HTMLElementTagNameMap['details'], HTMLElements['details']>;
      dfn: Tag<HTMLElementTagNameMap['dfn'], HTMLElements['dfn']>;
      dialog: Tag<HTMLElementTagNameMap['dialog'], HTMLElements['dialog']>;
      div: Tag<HTMLElementTagNameMap['div'], HTMLElements['div']>;
      dl: Tag<HTMLElementTagNameMap['dl'], HTMLElements['dl']>;
      dt: Tag<HTMLElementTagNameMap['dt'], HTMLElements['dt']>;
      ellipse: Tag<SVGElementTagNameMap['ellipse'], SVGElements['ellipse']>;
      em: Tag<HTMLElementTagNameMap['em'], HTMLElements['em']>;
      embed: Tag<HTMLElementTagNameMap['embed'], HTMLElements['embed']>;
      feBlend: Tag<SVGElementTagNameMap['feBlend'], SVGElements['feBlend']>;
      feColorMatrix: Tag<
        SVGElementTagNameMap['feColorMatrix'],
        SVGElements['feColorMatrix']
      >;
      feComponentTransfer: Tag<
        SVGElementTagNameMap['feComponentTransfer'],
        SVGElements['feComponentTransfer']
      >;
      feComposite: Tag<
        SVGElementTagNameMap['feComposite'],
        SVGElements['feComposite']
      >;
      feConvolveMatrix: Tag<
        SVGElementTagNameMap['feConvolveMatrix'],
        SVGElements['feConvolveMatrix']
      >;
      feDiffuseLighting: Tag<
        SVGElementTagNameMap['feDiffuseLighting'],
        SVGElements['feDiffuseLighting']
      >;
      feDisplacementMap: Tag<
        SVGElementTagNameMap['feDisplacementMap'],
        SVGElements['feDisplacementMap']
      >;
      feDistantLight: Tag<
        SVGElementTagNameMap['feDistantLight'],
        SVGElements['feDistantLight']
      >;
      feDropShadow: Tag<
        SVGElementTagNameMap['feDropShadow'],
        SVGElements['feDropShadow']
      >;
      feFlood: Tag<SVGElementTagNameMap['feFlood'], SVGElements['feFlood']>;
      feFuncA: Tag<SVGElementTagNameMap['feFuncA'], SVGElements['feFuncA']>;
      feFuncB: Tag<SVGElementTagNameMap['feFuncB'], SVGElements['feFuncB']>;
      feFuncG: Tag<SVGElementTagNameMap['feFuncG'], SVGElements['feFuncG']>;
      feFuncR: Tag<SVGElementTagNameMap['feFuncR'], SVGElements['feFuncR']>;
      feGaussianBlur: Tag<
        SVGElementTagNameMap['feGaussianBlur'],
        SVGElements['feGaussianBlur']
      >;
      feImage: Tag<SVGElementTagNameMap['feImage'], SVGElements['feImage']>;
      feMerge: Tag<SVGElementTagNameMap['feMerge'], SVGElements['feMerge']>;
      feMergeNode: Tag<
        SVGElementTagNameMap['feMergeNode'],
        SVGElements['feMergeNode']
      >;
      feMorphology: Tag<
        SVGElementTagNameMap['feMorphology'],
        SVGElements['feMorphology']
      >;
      feOffset: Tag<SVGElementTagNameMap['feOffset'], SVGElements['feOffset']>;
      fePointLight: Tag<
        SVGElementTagNameMap['fePointLight'],
        SVGElements['fePointLight']
      >;
      feSpecularLighting: Tag<
        SVGElementTagNameMap['feSpecularLighting'],
        SVGElements['feSpecularLighting']
      >;
      feSpotLight: Tag<
        SVGElementTagNameMap['feSpotLight'],
        SVGElements['feSpotLight']
      >;
      feTile: Tag<SVGElementTagNameMap['feTile'], SVGElements['feTile']>;
      feTurbulence: Tag<
        SVGElementTagNameMap['feTurbulence'],
        SVGElements['feTurbulence']
      >;
      fieldset: Tag<
        HTMLElementTagNameMap['fieldset'],
        HTMLElements['fieldset']
      >;
      figcaption: Tag<
        HTMLElementTagNameMap['figcaption'],
        HTMLElements['figcaption']
      >;
      figure: Tag<HTMLElementTagNameMap['figure'], HTMLElements['figure']>;
      filter: Tag<SVGElementTagNameMap['filter'], SVGElements['filter']>;
      footer: Tag<HTMLElementTagNameMap['footer'], HTMLElements['footer']>;
      foreignObject: Tag<
        SVGElementTagNameMap['foreignObject'],
        SVGElements['foreignObject']
      >;
      form: Tag<HTMLElementTagNameMap['form'], HTMLElements['form']>;
      g: Tag<SVGElementTagNameMap['g'], SVGElements['g']>;
      h1: Tag<HTMLElementTagNameMap['h1'], HTMLElements['h1']>;
      h2: Tag<HTMLElementTagNameMap['h2'], HTMLElements['h2']>;
      h3: Tag<HTMLElementTagNameMap['h3'], HTMLElements['h3']>;
      h4: Tag<HTMLElementTagNameMap['h4'], HTMLElements['h4']>;
      h5: Tag<HTMLElementTagNameMap['h5'], HTMLElements['h5']>;
      h6: Tag<HTMLElementTagNameMap['h6'], HTMLElements['h6']>;
      head: Tag<HTMLElementTagNameMap['head'], HTMLElements['head']>;
      header: Tag<HTMLElementTagNameMap['header'], HTMLElements['header']>;
      hr: Tag<HTMLElementTagNameMap['hr'], HTMLElements['hr']>;
      html: Tag<HTMLElementTagNameMap['html'], HTMLElements['html']>;
      i: Tag<HTMLElementTagNameMap['i'], HTMLElements['i']>;
      iframe: Tag<HTMLElementTagNameMap['iframe'], HTMLElements['iframe']>;
      image: Tag<SVGElementTagNameMap['image'], SVGElements['image']>;
      img: Tag<HTMLElementTagNameMap['img'], HTMLElements['img']>;
      input: Tag<HTMLElementTagNameMap['input'], HTMLElements['input']>;
      ins: Tag<HTMLElementTagNameMap['ins'], HTMLElements['ins']>;
      kbd: Tag<HTMLElementTagNameMap['kbd'], HTMLElements['kbd']>;
      label: Tag<HTMLElementTagNameMap['label'], HTMLElements['label']>;
      legend: Tag<HTMLElementTagNameMap['legend'], HTMLElements['legend']>;
      li: Tag<HTMLElementTagNameMap['li'], HTMLElements['li']>;
      line: Tag<SVGElementTagNameMap['line'], SVGElements['line']>;
      linearGradient: Tag<
        SVGElementTagNameMap['linearGradient'],
        SVGElements['linearGradient']
      >;
      link: Tag<HTMLElementTagNameMap['link'], HTMLElements['link']>;
      main: Tag<HTMLElementTagNameMap['main'], HTMLElements['main']>;
      map: Tag<HTMLElementTagNameMap['map'], HTMLElements['map']>;
      mark: Tag<HTMLElementTagNameMap['mark'], HTMLElements['mark']>;
      marker: Tag<SVGElementTagNameMap['marker'], SVGElements['marker']>;
      math: Tag<MathMLElement, MathMLElements['math']>;
      merror: Tag<MathMLElement, MathMLElements['merror']>;
      meta: Tag<HTMLElementTagNameMap['meta'], HTMLElements['meta']>;
      metadata: Tag<SVGElementTagNameMap['metadata'], SVGElements['metadata']>;
      meter: Tag<HTMLElementTagNameMap['meter'], HTMLElements['meter']>;
      mfrac: Tag<MathMLElement, MathMLElements['mfrac']>;
      mi: Tag<MathMLElement, MathMLElements['mi']>;
      mmultiscripts: Tag<MathMLElement, MathMLElements['mmultiscripts']>;
      mn: Tag<MathMLElement, MathMLElements['mn']>;
      mo: Tag<MathMLElement, MathMLElements['mo']>;
      mover: Tag<MathMLElement, MathMLElements['mover']>;
      mpadded: Tag<MathMLElement, MathMLElements['mpadded']>;
      mpath: Tag<SVGElementTagNameMap['mpath'], SVGElements['mpath']>;
      mphantom: Tag<MathMLElement, MathMLElements['mphantom']>;
      mroot: Tag<MathMLElement, MathMLElements['mroot']>;
      mrow: Tag<MathMLElement, MathMLElements['mrow']>;
      ms: Tag<MathMLElement, MathMLElements['ms']>;
      mspace: Tag<MathMLElement, MathMLElements['mspace']>;
      msqrt: Tag<MathMLElement, MathMLElements['msqrt']>;
      mstyle: Tag<MathMLElement, MathMLElements['mstyle']>;
      msub: Tag<MathMLElement, MathMLElements['msub']>;
      msubsup: Tag<MathMLElement, MathMLElements['msubsup']>;
      mtable: Tag<MathMLElement, MathMLElements['mtable']>;
      mtd: Tag<MathMLElement, MathMLElements['mtd']>;
      mtext: Tag<MathMLElement, MathMLElements['mtext']>;
      mtr: Tag<MathMLElement, MathMLElements['mtr']>;
      munder: Tag<MathMLElement, MathMLElements['munder']>;
      munderover: Tag<MathMLElement, MathMLElements['munderover']>;
      nav: Tag<HTMLElementTagNameMap['nav'], HTMLElements['nav']>;
      noscript: Tag<
        HTMLElementTagNameMap['noscript'],
        HTMLElements['noscript']
      >;
      object: Tag<HTMLElementTagNameMap['object'], HTMLElements['object']>;
      ol: Tag<HTMLElementTagNameMap['ol'], HTMLElements['ol']>;
      optgroup: Tag<
        HTMLElementTagNameMap['optgroup'],
        HTMLElements['optgroup']
      >;
      option: Tag<HTMLElementTagNameMap['option'], HTMLElements['option']>;
      output: Tag<HTMLElementTagNameMap['output'], HTMLElements['output']>;
      p: Tag<HTMLElementTagNameMap['p'], HTMLElements['p']>;
      path: Tag<SVGElementTagNameMap['path'], SVGElements['path']>;
      pattern: Tag<SVGElementTagNameMap['pattern'], SVGElements['pattern']>;
      picture: Tag<HTMLElementTagNameMap['picture'], HTMLElements['picture']>;
      polygon: Tag<SVGElementTagNameMap['polygon'], SVGElements['polygon']>;
      polyline: Tag<SVGElementTagNameMap['polyline'], SVGElements['polyline']>;
      pre: Tag<HTMLElementTagNameMap['pre'], HTMLElements['pre']>;
      progress: Tag<
        HTMLElementTagNameMap['progress'],
        HTMLElements['progress']
      >;
      q: Tag<HTMLElementTagNameMap['q'], HTMLElements['q']>;
      radialGradient: Tag<
        SVGElementTagNameMap['radialGradient'],
        SVGElements['radialGradient']
      >;
      rect: Tag<SVGElementTagNameMap['rect'], SVGElements['rect']>;
      rp: Tag<HTMLElementTagNameMap['rp'], HTMLElements['rp']>;
      rt: Tag<HTMLElementTagNameMap['rt'], HTMLElements['rt']>;
      ruby: Tag<HTMLElementTagNameMap['ruby'], HTMLElements['ruby']>;
      s: Tag<HTMLElementTagNameMap['s'], HTMLElements['s']>;
      samp: Tag<HTMLElementTagNameMap['samp'], HTMLElements['samp']>;
      script: Tag<HTMLElementTagNameMap['script'], HTMLElements['script']> &
      Tag<SVGElementTagNameMap['script'], SVGElements['script']>;
      section: Tag<HTMLElementTagNameMap['section'], HTMLElements['section']>;
      select: Tag<HTMLElementTagNameMap['select'], HTMLElements['select']>;
      semantics: Tag<MathMLElement, MathMLElements['semantics']>;
      set: Tag<SVGElementTagNameMap['set'], SVGElements['set']>;
      small: Tag<HTMLElementTagNameMap['small'], HTMLElements['small']>;
      source: Tag<HTMLElementTagNameMap['source'], HTMLElements['source']>;
      span: Tag<HTMLElementTagNameMap['span'], HTMLElements['span']>;
      stop: Tag<SVGElementTagNameMap['stop'], SVGElements['stop']>;
      strong: Tag<HTMLElementTagNameMap['strong'], HTMLElements['strong']>;
      style: Tag<HTMLElementTagNameMap['style'], HTMLElements['style']> &
      Tag<SVGElementTagNameMap['style'], SVGElements['style']>;
      sub: Tag<HTMLElementTagNameMap['sub'], HTMLElements['sub']>;
      summary: Tag<HTMLElementTagNameMap['summary'], HTMLElements['summary']>;
      sup: Tag<HTMLElementTagNameMap['sup'], HTMLElements['sup']>;
      svg: Tag<SVGElementTagNameMap['svg'], SVGElements['svg']>;
      switch: Tag<SVGElementTagNameMap['switch'], SVGElements['switch']>;
      symbol: Tag<SVGElementTagNameMap['symbol'], SVGElements['symbol']>;
      table: Tag<HTMLElementTagNameMap['table'], HTMLElements['table']>;
      tbody: Tag<HTMLElementTagNameMap['tbody'], HTMLElements['tbody']>;
      td: Tag<HTMLElementTagNameMap['td'], HTMLElements['td']>;
      template: Tag<
        HTMLElementTagNameMap['template'],
        HTMLElements['template']
      >;
      text: Tag<SVGElementTagNameMap['text'], SVGElements['text']>;
      textPath: Tag<SVGElementTagNameMap['textPath'], SVGElements['textPath']>;
      textarea: Tag<
        HTMLElementTagNameMap['textarea'],
        HTMLElements['textarea']
      >;
      tfoot: Tag<HTMLElementTagNameMap['tfoot'], HTMLElements['tfoot']>;
      th: Tag<HTMLElementTagNameMap['th'], HTMLElements['th']>;
      thead: Tag<HTMLElementTagNameMap['thead'], HTMLElements['thead']>;
      time: Tag<HTMLElementTagNameMap['time'], HTMLElements['time']>;
      title: Tag<HTMLElementTagNameMap['title'], HTMLElements['title']> &
      Tag<SVGElementTagNameMap['title'], SVGElements['title']>;
      tr: Tag<HTMLElementTagNameMap['tr'], HTMLElements['tr']>;
      track: Tag<HTMLElementTagNameMap['track'], HTMLElements['track']>;
      u: Tag<HTMLElementTagNameMap['u'], HTMLElements['u']>;
      ul: Tag<HTMLElementTagNameMap['ul'], HTMLElements['ul']>;
      use: Tag<SVGElementTagNameMap['use'], SVGElements['use']>;
      var: Tag<HTMLElementTagNameMap['var'], HTMLElements['var']>;
      video: Tag<HTMLElementTagNameMap['video'], HTMLElements['video']>;
      view: Tag<SVGElementTagNameMap['view'], SVGElements['view']>;
      wbr: Tag<HTMLElementTagNameMap['wbr'], HTMLElements['wbr']>;
    }
  }
}

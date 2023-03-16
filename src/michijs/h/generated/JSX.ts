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
      a: HTMLElements['a'] &
        Tag<HTMLElementTagNameMap['a']> &
        SVGElements['a'] &
        Tag<SVGElementTagNameMap['a']>;
      abbr: HTMLElements['abbr'] & Tag<HTMLElementTagNameMap['abbr']>;
      address: HTMLElements['address'] & Tag<HTMLElementTagNameMap['address']>;
      animate: SVGElements['animate'] & Tag<SVGElementTagNameMap['animate']>;
      animateMotion: SVGElements['animateMotion'] &
        Tag<SVGElementTagNameMap['animateMotion']>;
      animateTransform: SVGElements['animateTransform'] &
        Tag<SVGElementTagNameMap['animateTransform']>;
      area: HTMLElements['area'] & Tag<HTMLElementTagNameMap['area']>;
      article: HTMLElements['article'] & Tag<HTMLElementTagNameMap['article']>;
      aside: HTMLElements['aside'] & Tag<HTMLElementTagNameMap['aside']>;
      audio: HTMLElements['audio'] & Tag<HTMLElementTagNameMap['audio']>;
      b: HTMLElements['b'] & Tag<HTMLElementTagNameMap['b']>;
      base: HTMLElements['base'] & Tag<HTMLElementTagNameMap['base']>;
      bdi: HTMLElements['bdi'] & Tag<HTMLElementTagNameMap['bdi']>;
      bdo: HTMLElements['bdo'] & Tag<HTMLElementTagNameMap['bdo']>;
      blockquote: HTMLElements['blockquote'] &
        Tag<HTMLElementTagNameMap['blockquote']>;
      body: HTMLElements['body'] & Tag<HTMLElementTagNameMap['body']>;
      br: HTMLElements['br'] & Tag<HTMLElementTagNameMap['br']>;
      button: HTMLElements['button'] & Tag<HTMLElementTagNameMap['button']>;
      canvas: HTMLElements['canvas'] & Tag<HTMLElementTagNameMap['canvas']>;
      caption: HTMLElements['caption'] & Tag<HTMLElementTagNameMap['caption']>;
      circle: SVGElements['circle'] & Tag<SVGElementTagNameMap['circle']>;
      cite: HTMLElements['cite'] & Tag<HTMLElementTagNameMap['cite']>;
      clipPath: SVGElements['clipPath'] & Tag<SVGElementTagNameMap['clipPath']>;
      code: HTMLElements['code'] & Tag<HTMLElementTagNameMap['code']>;
      col: HTMLElements['col'] & Tag<HTMLElementTagNameMap['col']>;
      colgroup: HTMLElements['colgroup'] &
        Tag<HTMLElementTagNameMap['colgroup']>;
      data: HTMLElements['data'] & Tag<HTMLElementTagNameMap['data']>;
      datalist: HTMLElements['datalist'] &
        Tag<HTMLElementTagNameMap['datalist']>;
      dd: HTMLElements['dd'] & Tag<HTMLElementTagNameMap['dd']>;
      defs: SVGElements['defs'] & Tag<SVGElementTagNameMap['defs']>;
      del: HTMLElements['del'] & Tag<HTMLElementTagNameMap['del']>;
      desc: SVGElements['desc'] & Tag<SVGElementTagNameMap['desc']>;
      details: HTMLElements['details'] & Tag<HTMLElementTagNameMap['details']>;
      dfn: HTMLElements['dfn'] & Tag<HTMLElementTagNameMap['dfn']>;
      dialog: HTMLElements['dialog'] & Tag<HTMLElementTagNameMap['dialog']>;
      discard: SVGElements['discard'] & Tag<SVGElement>;
      div: HTMLElements['div'] & Tag<HTMLElementTagNameMap['div']>;
      dl: HTMLElements['dl'] & Tag<HTMLElementTagNameMap['dl']>;
      dt: HTMLElements['dt'] & Tag<HTMLElementTagNameMap['dt']>;
      ellipse: SVGElements['ellipse'] & Tag<SVGElementTagNameMap['ellipse']>;
      em: HTMLElements['em'] & Tag<HTMLElementTagNameMap['em']>;
      embed: HTMLElements['embed'] & Tag<HTMLElementTagNameMap['embed']>;
      feBlend: SVGElements['feBlend'] & Tag<SVGElementTagNameMap['feBlend']>;
      feColorMatrix: SVGElements['feColorMatrix'] &
        Tag<SVGElementTagNameMap['feColorMatrix']>;
      feComponentTransfer: SVGElements['feComponentTransfer'] &
        Tag<SVGElementTagNameMap['feComponentTransfer']>;
      feComposite: SVGElements['feComposite'] &
        Tag<SVGElementTagNameMap['feComposite']>;
      feConvolveMatrix: SVGElements['feConvolveMatrix'] &
        Tag<SVGElementTagNameMap['feConvolveMatrix']>;
      feDiffuseLighting: SVGElements['feDiffuseLighting'] &
        Tag<SVGElementTagNameMap['feDiffuseLighting']>;
      feDisplacementMap: SVGElements['feDisplacementMap'] &
        Tag<SVGElementTagNameMap['feDisplacementMap']>;
      feDistantLight: SVGElements['feDistantLight'] &
        Tag<SVGElementTagNameMap['feDistantLight']>;
      feDropShadow: SVGElements['feDropShadow'] &
        Tag<SVGElementTagNameMap['feDropShadow']>;
      feFlood: SVGElements['feFlood'] & Tag<SVGElementTagNameMap['feFlood']>;
      feFuncA: SVGElements['feFuncA'] & Tag<SVGElementTagNameMap['feFuncA']>;
      feFuncB: SVGElements['feFuncB'] & Tag<SVGElementTagNameMap['feFuncB']>;
      feFuncG: SVGElements['feFuncG'] & Tag<SVGElementTagNameMap['feFuncG']>;
      feFuncR: SVGElements['feFuncR'] & Tag<SVGElementTagNameMap['feFuncR']>;
      feGaussianBlur: SVGElements['feGaussianBlur'] &
        Tag<SVGElementTagNameMap['feGaussianBlur']>;
      feImage: SVGElements['feImage'] & Tag<SVGElementTagNameMap['feImage']>;
      feMerge: SVGElements['feMerge'] & Tag<SVGElementTagNameMap['feMerge']>;
      feMergeNode: SVGElements['feMergeNode'] &
        Tag<SVGElementTagNameMap['feMergeNode']>;
      feMorphology: SVGElements['feMorphology'] &
        Tag<SVGElementTagNameMap['feMorphology']>;
      feOffset: SVGElements['feOffset'] & Tag<SVGElementTagNameMap['feOffset']>;
      fePointLight: SVGElements['fePointLight'] &
        Tag<SVGElementTagNameMap['fePointLight']>;
      feSpecularLighting: SVGElements['feSpecularLighting'] &
        Tag<SVGElementTagNameMap['feSpecularLighting']>;
      feSpotLight: SVGElements['feSpotLight'] &
        Tag<SVGElementTagNameMap['feSpotLight']>;
      feTile: SVGElements['feTile'] & Tag<SVGElementTagNameMap['feTile']>;
      feTurbulence: SVGElements['feTurbulence'] &
        Tag<SVGElementTagNameMap['feTurbulence']>;
      fieldset: HTMLElements['fieldset'] &
        Tag<HTMLElementTagNameMap['fieldset']>;
      figcaption: HTMLElements['figcaption'] &
        Tag<HTMLElementTagNameMap['figcaption']>;
      figure: HTMLElements['figure'] & Tag<HTMLElementTagNameMap['figure']>;
      filter: SVGElements['filter'] & Tag<SVGElementTagNameMap['filter']>;
      footer: HTMLElements['footer'] & Tag<HTMLElementTagNameMap['footer']>;
      foreignObject: SVGElements['foreignObject'] &
        Tag<SVGElementTagNameMap['foreignObject']>;
      form: HTMLElements['form'] & Tag<HTMLElementTagNameMap['form']>;
      g: SVGElements['g'] & Tag<SVGElementTagNameMap['g']>;
      h1: HTMLElements['h1'] & Tag<HTMLElementTagNameMap['h1']>;
      h2: HTMLElements['h2'] & Tag<HTMLElementTagNameMap['h2']>;
      h3: HTMLElements['h3'] & Tag<HTMLElementTagNameMap['h3']>;
      h4: HTMLElements['h4'] & Tag<HTMLElementTagNameMap['h4']>;
      h5: HTMLElements['h5'] & Tag<HTMLElementTagNameMap['h5']>;
      h6: HTMLElements['h6'] & Tag<HTMLElementTagNameMap['h6']>;
      head: HTMLElements['head'] & Tag<HTMLElementTagNameMap['head']>;
      header: HTMLElements['header'] & Tag<HTMLElementTagNameMap['header']>;
      hgroup: HTMLElements['hgroup'] & Tag<HTMLElementTagNameMap['hgroup']>;
      hr: HTMLElements['hr'] & Tag<HTMLElementTagNameMap['hr']>;
      html: HTMLElements['html'] & Tag<HTMLElementTagNameMap['html']>;
      i: HTMLElements['i'] & Tag<HTMLElementTagNameMap['i']>;
      iframe: HTMLElements['iframe'] & Tag<HTMLElementTagNameMap['iframe']>;
      image: SVGElements['image'] & Tag<SVGElementTagNameMap['image']>;
      img: HTMLElements['img'] & Tag<HTMLElementTagNameMap['img']>;
      input: HTMLElements['input'] & Tag<HTMLElementTagNameMap['input']>;
      ins: HTMLElements['ins'] & Tag<HTMLElementTagNameMap['ins']>;
      kbd: HTMLElements['kbd'] & Tag<HTMLElementTagNameMap['kbd']>;
      label: HTMLElements['label'] & Tag<HTMLElementTagNameMap['label']>;
      legend: HTMLElements['legend'] & Tag<HTMLElementTagNameMap['legend']>;
      li: HTMLElements['li'] & Tag<HTMLElementTagNameMap['li']>;
      line: SVGElements['line'] & Tag<SVGElementTagNameMap['line']>;
      linearGradient: SVGElements['linearGradient'] &
        Tag<SVGElementTagNameMap['linearGradient']>;
      link: HTMLElements['link'] & Tag<HTMLElementTagNameMap['link']>;
      main: HTMLElements['main'] & Tag<HTMLElementTagNameMap['main']>;
      map: HTMLElements['map'] & Tag<HTMLElementTagNameMap['map']>;
      mark: HTMLElements['mark'] & Tag<HTMLElementTagNameMap['mark']>;
      marker: SVGElements['marker'] & Tag<SVGElementTagNameMap['marker']>;
      mask: SVGElements['mask'] & Tag<SVGElementTagNameMap['mask']>;
      math: MathMLElements['math'] & Tag<MathMLElement>;
      menu: HTMLElements['menu'] & Tag<HTMLElementTagNameMap['menu']>;
      merror: MathMLElements['merror'] & Tag<MathMLElement>;
      meta: HTMLElements['meta'] & Tag<HTMLElementTagNameMap['meta']>;
      metadata: SVGElements['metadata'] & Tag<SVGElementTagNameMap['metadata']>;
      meter: HTMLElements['meter'] & Tag<HTMLElementTagNameMap['meter']>;
      mfrac: MathMLElements['mfrac'] & Tag<MathMLElement>;
      mi: MathMLElements['mi'] & Tag<MathMLElement>;
      mmultiscripts: MathMLElements['mmultiscripts'] & Tag<MathMLElement>;
      mn: MathMLElements['mn'] & Tag<MathMLElement>;
      mo: MathMLElements['mo'] & Tag<MathMLElement>;
      mover: MathMLElements['mover'] & Tag<MathMLElement>;
      mpadded: MathMLElements['mpadded'] & Tag<MathMLElement>;
      mpath: SVGElements['mpath'] & Tag<SVGElementTagNameMap['mpath']>;
      mphantom: MathMLElements['mphantom'] & Tag<MathMLElement>;
      mroot: MathMLElements['mroot'] & Tag<MathMLElement>;
      mrow: MathMLElements['mrow'] & Tag<MathMLElement>;
      ms: MathMLElements['ms'] & Tag<MathMLElement>;
      mspace: MathMLElements['mspace'] & Tag<MathMLElement>;
      msqrt: MathMLElements['msqrt'] & Tag<MathMLElement>;
      mstyle: MathMLElements['mstyle'] & Tag<MathMLElement>;
      msub: MathMLElements['msub'] & Tag<MathMLElement>;
      msubsup: MathMLElements['msubsup'] & Tag<MathMLElement>;
      mtable: MathMLElements['mtable'] & Tag<MathMLElement>;
      mtd: MathMLElements['mtd'] & Tag<MathMLElement>;
      mtext: MathMLElements['mtext'] & Tag<MathMLElement>;
      mtr: MathMLElements['mtr'] & Tag<MathMLElement>;
      munder: MathMLElements['munder'] & Tag<MathMLElement>;
      munderover: MathMLElements['munderover'] & Tag<MathMLElement>;
      nav: HTMLElements['nav'] & Tag<HTMLElementTagNameMap['nav']>;
      noscript: HTMLElements['noscript'] &
        Tag<HTMLElementTagNameMap['noscript']>;
      object: HTMLElements['object'] & Tag<HTMLElementTagNameMap['object']>;
      ol: HTMLElements['ol'] & Tag<HTMLElementTagNameMap['ol']>;
      optgroup: HTMLElements['optgroup'] &
        Tag<HTMLElementTagNameMap['optgroup']>;
      option: HTMLElements['option'] & Tag<HTMLElementTagNameMap['option']>;
      output: HTMLElements['output'] & Tag<HTMLElementTagNameMap['output']>;
      p: HTMLElements['p'] & Tag<HTMLElementTagNameMap['p']>;
      param: HTMLElements['param'] & Tag<HTMLElement>;
      path: SVGElements['path'] & Tag<SVGElementTagNameMap['path']>;
      pattern: SVGElements['pattern'] & Tag<SVGElementTagNameMap['pattern']>;
      picture: HTMLElements['picture'] & Tag<HTMLElementTagNameMap['picture']>;
      polygon: SVGElements['polygon'] & Tag<SVGElementTagNameMap['polygon']>;
      polyline: SVGElements['polyline'] & Tag<SVGElementTagNameMap['polyline']>;
      pre: HTMLElements['pre'] & Tag<HTMLElementTagNameMap['pre']>;
      progress: HTMLElements['progress'] &
        Tag<HTMLElementTagNameMap['progress']>;
      q: HTMLElements['q'] & Tag<HTMLElementTagNameMap['q']>;
      radialGradient: SVGElements['radialGradient'] &
        Tag<SVGElementTagNameMap['radialGradient']>;
      rb: HTMLElements['rb'] & Tag<HTMLElement>;
      rect: SVGElements['rect'] & Tag<SVGElementTagNameMap['rect']>;
      rp: HTMLElements['rp'] & Tag<HTMLElementTagNameMap['rp']>;
      rt: HTMLElements['rt'] & Tag<HTMLElementTagNameMap['rt']>;
      ruby: HTMLElements['ruby'] & Tag<HTMLElementTagNameMap['ruby']>;
      s: HTMLElements['s'] & Tag<HTMLElementTagNameMap['s']>;
      samp: HTMLElements['samp'] & Tag<HTMLElementTagNameMap['samp']>;
      script: HTMLElements['script'] &
        Tag<HTMLElementTagNameMap['script']> &
        SVGElements['script'] &
        Tag<SVGElementTagNameMap['script']>;
      section: HTMLElements['section'] & Tag<HTMLElementTagNameMap['section']>;
      select: HTMLElements['select'] & Tag<HTMLElementTagNameMap['select']>;
      semantics: MathMLElements['semantics'] & Tag<MathMLElement>;
      set: SVGElements['set'] & Tag<SVGElementTagNameMap['set']>;
      slot: HTMLElements['slot'] & Tag<HTMLElementTagNameMap['slot']>;
      small: HTMLElements['small'] & Tag<HTMLElementTagNameMap['small']>;
      source: HTMLElements['source'] & Tag<HTMLElementTagNameMap['source']>;
      span: HTMLElements['span'] & Tag<HTMLElementTagNameMap['span']>;
      stop: SVGElements['stop'] & Tag<SVGElementTagNameMap['stop']>;
      strong: HTMLElements['strong'] & Tag<HTMLElementTagNameMap['strong']>;
      style: HTMLElements['style'] &
        Tag<HTMLElementTagNameMap['style']> &
        SVGElements['style'] &
        Tag<SVGElementTagNameMap['style']>;
      sub: HTMLElements['sub'] & Tag<HTMLElementTagNameMap['sub']>;
      summary: HTMLElements['summary'] & Tag<HTMLElementTagNameMap['summary']>;
      sup: HTMLElements['sup'] & Tag<HTMLElementTagNameMap['sup']>;
      svg: SVGElements['svg'] & Tag<SVGElementTagNameMap['svg']>;
      switch: SVGElements['switch'] & Tag<SVGElementTagNameMap['switch']>;
      symbol: SVGElements['symbol'] & Tag<SVGElementTagNameMap['symbol']>;
      table: HTMLElements['table'] & Tag<HTMLElementTagNameMap['table']>;
      tbody: HTMLElements['tbody'] & Tag<HTMLElementTagNameMap['tbody']>;
      td: HTMLElements['td'] & Tag<HTMLElementTagNameMap['td']>;
      template: HTMLElements['template'] &
        Tag<HTMLElementTagNameMap['template']>;
      text: SVGElements['text'] & Tag<SVGElementTagNameMap['text']>;
      textPath: SVGElements['textPath'] & Tag<SVGElementTagNameMap['textPath']>;
      textarea: HTMLElements['textarea'] &
        Tag<HTMLElementTagNameMap['textarea']>;
      tfoot: HTMLElements['tfoot'] & Tag<HTMLElementTagNameMap['tfoot']>;
      th: HTMLElements['th'] & Tag<HTMLElementTagNameMap['th']>;
      thead: HTMLElements['thead'] & Tag<HTMLElementTagNameMap['thead']>;
      time: HTMLElements['time'] & Tag<HTMLElementTagNameMap['time']>;
      title: HTMLElements['title'] &
        Tag<HTMLElementTagNameMap['title']> &
        SVGElements['title'] &
        Tag<SVGElementTagNameMap['title']>;
      tr: HTMLElements['tr'] & Tag<HTMLElementTagNameMap['tr']>;
      track: HTMLElements['track'] & Tag<HTMLElementTagNameMap['track']>;
      tspan: SVGElements['tspan'] & Tag<SVGElementTagNameMap['tspan']>;
      u: HTMLElements['u'] & Tag<HTMLElementTagNameMap['u']>;
      ul: HTMLElements['ul'] & Tag<HTMLElementTagNameMap['ul']>;
      use: SVGElements['use'] & Tag<SVGElementTagNameMap['use']>;
      var: HTMLElements['var'] & Tag<HTMLElementTagNameMap['var']>;
      video: HTMLElements['video'] & Tag<HTMLElementTagNameMap['video']>;
      view: SVGElements['view'] & Tag<SVGElementTagNameMap['view']>;
      wbr: HTMLElements['wbr'] & Tag<HTMLElementTagNameMap['wbr']>;
    }
  }
}

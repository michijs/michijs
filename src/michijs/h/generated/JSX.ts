import {
  HTMLElements as HTMLElementsHTMLType,
  MathMLElements,
  SVGElements as SVGElementsHTMLType,
} from "@michijs/htmltype";
import { MichiAttributes } from "../MichiAttributes";
import { SingleJSXElement } from "../../types";

interface ElementsInterfaceOverride {
  title: HTMLElementTagNameMap["title"] & SVGElementTagNameMap["title"];
  style: HTMLElementTagNameMap["style"] & SVGElementTagNameMap["style"];
  a: HTMLElementTagNameMap["a"] & SVGElementTagNameMap["a"];
  script: HTMLElementTagNameMap["script"] & SVGElementTagNameMap["script"];
}
type HTMLElements = HTMLElementsHTMLType<ElementsInterfaceOverride>;
type SVGElements = SVGElementsHTMLType<ElementsInterfaceOverride>;

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
      a: HTMLElements["a"] &
        SVGElements["a"] &
        MichiAttributes<HTMLElementTagNameMap["a"] & SVGElementTagNameMap["a"]>;
      abbr: HTMLElements["abbr"] &
        MichiAttributes<HTMLElementTagNameMap["abbr"]>;
      address: HTMLElements["address"] &
        MichiAttributes<HTMLElementTagNameMap["address"]>;
      animate: SVGElements["animate"] &
        MichiAttributes<SVGElementTagNameMap["animate"]>;
      animateMotion: SVGElements["animateMotion"] &
        MichiAttributes<SVGElementTagNameMap["animateMotion"]>;
      animateTransform: SVGElements["animateTransform"] &
        MichiAttributes<SVGElementTagNameMap["animateTransform"]>;
      area: HTMLElements["area"] &
        MichiAttributes<HTMLElementTagNameMap["area"]>;
      article: HTMLElements["article"] &
        MichiAttributes<HTMLElementTagNameMap["article"]>;
      aside: HTMLElements["aside"] &
        MichiAttributes<HTMLElementTagNameMap["aside"]>;
      audio: HTMLElements["audio"] &
        MichiAttributes<HTMLElementTagNameMap["audio"]>;
      b: HTMLElements["b"] & MichiAttributes<HTMLElementTagNameMap["b"]>;
      base: HTMLElements["base"] &
        MichiAttributes<HTMLElementTagNameMap["base"]>;
      bdi: HTMLElements["bdi"] & MichiAttributes<HTMLElementTagNameMap["bdi"]>;
      bdo: HTMLElements["bdo"] & MichiAttributes<HTMLElementTagNameMap["bdo"]>;
      blockquote: HTMLElements["blockquote"] &
        MichiAttributes<HTMLElementTagNameMap["blockquote"]>;
      body: HTMLElements["body"] &
        MichiAttributes<HTMLElementTagNameMap["body"]>;
      br: HTMLElements["br"] & MichiAttributes<HTMLElementTagNameMap["br"]>;
      button: HTMLElements["button"] &
        MichiAttributes<HTMLElementTagNameMap["button"]>;
      canvas: HTMLElements["canvas"] &
        MichiAttributes<HTMLElementTagNameMap["canvas"]>;
      caption: HTMLElements["caption"] &
        MichiAttributes<HTMLElementTagNameMap["caption"]>;
      circle: SVGElements["circle"] &
        MichiAttributes<SVGElementTagNameMap["circle"]>;
      cite: HTMLElements["cite"] &
        MichiAttributes<HTMLElementTagNameMap["cite"]>;
      clipPath: SVGElements["clipPath"] &
        MichiAttributes<SVGElementTagNameMap["clipPath"]>;
      code: HTMLElements["code"] &
        MichiAttributes<HTMLElementTagNameMap["code"]>;
      col: HTMLElements["col"] & MichiAttributes<HTMLElementTagNameMap["col"]>;
      colgroup: HTMLElements["colgroup"] &
        MichiAttributes<HTMLElementTagNameMap["colgroup"]>;
      data: HTMLElements["data"] &
        MichiAttributes<HTMLElementTagNameMap["data"]>;
      datalist: HTMLElements["datalist"] &
        MichiAttributes<HTMLElementTagNameMap["datalist"]>;
      dd: HTMLElements["dd"] & MichiAttributes<HTMLElementTagNameMap["dd"]>;
      defs: SVGElements["defs"] & MichiAttributes<SVGElementTagNameMap["defs"]>;
      del: HTMLElements["del"] & MichiAttributes<HTMLElementTagNameMap["del"]>;
      desc: SVGElements["desc"] & MichiAttributes<SVGElementTagNameMap["desc"]>;
      details: HTMLElements["details"] &
        MichiAttributes<HTMLElementTagNameMap["details"]>;
      dfn: HTMLElements["dfn"] & MichiAttributes<HTMLElementTagNameMap["dfn"]>;
      dialog: HTMLElements["dialog"] &
        MichiAttributes<HTMLElementTagNameMap["dialog"]>;
      discard: SVGElements["discard"] & MichiAttributes<SVGElement>;
      div: HTMLElements["div"] & MichiAttributes<HTMLElementTagNameMap["div"]>;
      dl: HTMLElements["dl"] & MichiAttributes<HTMLElementTagNameMap["dl"]>;
      dt: HTMLElements["dt"] & MichiAttributes<HTMLElementTagNameMap["dt"]>;
      ellipse: SVGElements["ellipse"] &
        MichiAttributes<SVGElementTagNameMap["ellipse"]>;
      em: HTMLElements["em"] & MichiAttributes<HTMLElementTagNameMap["em"]>;
      embed: HTMLElements["embed"] &
        MichiAttributes<HTMLElementTagNameMap["embed"]>;
      feBlend: SVGElements["feBlend"] &
        MichiAttributes<SVGElementTagNameMap["feBlend"]>;
      feColorMatrix: SVGElements["feColorMatrix"] &
        MichiAttributes<SVGElementTagNameMap["feColorMatrix"]>;
      feComponentTransfer: SVGElements["feComponentTransfer"] &
        MichiAttributes<SVGElementTagNameMap["feComponentTransfer"]>;
      feComposite: SVGElements["feComposite"] &
        MichiAttributes<SVGElementTagNameMap["feComposite"]>;
      feConvolveMatrix: SVGElements["feConvolveMatrix"] &
        MichiAttributes<SVGElementTagNameMap["feConvolveMatrix"]>;
      feDiffuseLighting: SVGElements["feDiffuseLighting"] &
        MichiAttributes<SVGElementTagNameMap["feDiffuseLighting"]>;
      feDisplacementMap: SVGElements["feDisplacementMap"] &
        MichiAttributes<SVGElementTagNameMap["feDisplacementMap"]>;
      feDistantLight: SVGElements["feDistantLight"] &
        MichiAttributes<SVGElementTagNameMap["feDistantLight"]>;
      feDropShadow: SVGElements["feDropShadow"] &
        MichiAttributes<SVGElementTagNameMap["feDropShadow"]>;
      feFlood: SVGElements["feFlood"] &
        MichiAttributes<SVGElementTagNameMap["feFlood"]>;
      feFuncA: SVGElements["feFuncA"] &
        MichiAttributes<SVGElementTagNameMap["feFuncA"]>;
      feFuncB: SVGElements["feFuncB"] &
        MichiAttributes<SVGElementTagNameMap["feFuncB"]>;
      feFuncG: SVGElements["feFuncG"] &
        MichiAttributes<SVGElementTagNameMap["feFuncG"]>;
      feFuncR: SVGElements["feFuncR"] &
        MichiAttributes<SVGElementTagNameMap["feFuncR"]>;
      feGaussianBlur: SVGElements["feGaussianBlur"] &
        MichiAttributes<SVGElementTagNameMap["feGaussianBlur"]>;
      feImage: SVGElements["feImage"] &
        MichiAttributes<SVGElementTagNameMap["feImage"]>;
      feMerge: SVGElements["feMerge"] &
        MichiAttributes<SVGElementTagNameMap["feMerge"]>;
      feMergeNode: SVGElements["feMergeNode"] &
        MichiAttributes<SVGElementTagNameMap["feMergeNode"]>;
      feMorphology: SVGElements["feMorphology"] &
        MichiAttributes<SVGElementTagNameMap["feMorphology"]>;
      feOffset: SVGElements["feOffset"] &
        MichiAttributes<SVGElementTagNameMap["feOffset"]>;
      fePointLight: SVGElements["fePointLight"] &
        MichiAttributes<SVGElementTagNameMap["fePointLight"]>;
      feSpecularLighting: SVGElements["feSpecularLighting"] &
        MichiAttributes<SVGElementTagNameMap["feSpecularLighting"]>;
      feSpotLight: SVGElements["feSpotLight"] &
        MichiAttributes<SVGElementTagNameMap["feSpotLight"]>;
      feTile: SVGElements["feTile"] &
        MichiAttributes<SVGElementTagNameMap["feTile"]>;
      feTurbulence: SVGElements["feTurbulence"] &
        MichiAttributes<SVGElementTagNameMap["feTurbulence"]>;
      fieldset: HTMLElements["fieldset"] &
        MichiAttributes<HTMLElementTagNameMap["fieldset"]>;
      figcaption: HTMLElements["figcaption"] &
        MichiAttributes<HTMLElementTagNameMap["figcaption"]>;
      figure: HTMLElements["figure"] &
        MichiAttributes<HTMLElementTagNameMap["figure"]>;
      filter: SVGElements["filter"] &
        MichiAttributes<SVGElementTagNameMap["filter"]>;
      footer: HTMLElements["footer"] &
        MichiAttributes<HTMLElementTagNameMap["footer"]>;
      foreignObject: SVGElements["foreignObject"] &
        MichiAttributes<SVGElementTagNameMap["foreignObject"]>;
      form: HTMLElements["form"] &
        MichiAttributes<HTMLElementTagNameMap["form"]>;
      g: SVGElements["g"] & MichiAttributes<SVGElementTagNameMap["g"]>;
      h1: HTMLElements["h1"] & MichiAttributes<HTMLElementTagNameMap["h1"]>;
      h2: HTMLElements["h2"] & MichiAttributes<HTMLElementTagNameMap["h2"]>;
      h3: HTMLElements["h3"] & MichiAttributes<HTMLElementTagNameMap["h3"]>;
      h4: HTMLElements["h4"] & MichiAttributes<HTMLElementTagNameMap["h4"]>;
      h5: HTMLElements["h5"] & MichiAttributes<HTMLElementTagNameMap["h5"]>;
      h6: HTMLElements["h6"] & MichiAttributes<HTMLElementTagNameMap["h6"]>;
      head: HTMLElements["head"] &
        MichiAttributes<HTMLElementTagNameMap["head"]>;
      header: HTMLElements["header"] &
        MichiAttributes<HTMLElementTagNameMap["header"]>;
      hgroup: HTMLElements["hgroup"] &
        MichiAttributes<HTMLElementTagNameMap["hgroup"]>;
      hr: HTMLElements["hr"] & MichiAttributes<HTMLElementTagNameMap["hr"]>;
      html: HTMLElements["html"] &
        MichiAttributes<HTMLElementTagNameMap["html"]>;
      i: HTMLElements["i"] & MichiAttributes<HTMLElementTagNameMap["i"]>;
      iframe: HTMLElements["iframe"] &
        MichiAttributes<HTMLElementTagNameMap["iframe"]>;
      image: SVGElements["image"] &
        MichiAttributes<SVGElementTagNameMap["image"]>;
      img: HTMLElements["img"] & MichiAttributes<HTMLElementTagNameMap["img"]>;
      input: HTMLElements["input"] &
        MichiAttributes<HTMLElementTagNameMap["input"]>;
      ins: HTMLElements["ins"] & MichiAttributes<HTMLElementTagNameMap["ins"]>;
      kbd: HTMLElements["kbd"] & MichiAttributes<HTMLElementTagNameMap["kbd"]>;
      label: HTMLElements["label"] &
        MichiAttributes<HTMLElementTagNameMap["label"]>;
      legend: HTMLElements["legend"] &
        MichiAttributes<HTMLElementTagNameMap["legend"]>;
      li: HTMLElements["li"] & MichiAttributes<HTMLElementTagNameMap["li"]>;
      line: SVGElements["line"] & MichiAttributes<SVGElementTagNameMap["line"]>;
      linearGradient: SVGElements["linearGradient"] &
        MichiAttributes<SVGElementTagNameMap["linearGradient"]>;
      link: HTMLElements["link"] &
        MichiAttributes<HTMLElementTagNameMap["link"]>;
      main: HTMLElements["main"] &
        MichiAttributes<HTMLElementTagNameMap["main"]>;
      map: HTMLElements["map"] & MichiAttributes<HTMLElementTagNameMap["map"]>;
      mark: HTMLElements["mark"] &
        MichiAttributes<HTMLElementTagNameMap["mark"]>;
      marker: SVGElements["marker"] &
        MichiAttributes<SVGElementTagNameMap["marker"]>;
      mask: SVGElements["mask"] & MichiAttributes<SVGElementTagNameMap["mask"]>;
      math: MathMLElements["math"] & MichiAttributes<MathMLElement>;
      menu: HTMLElements["menu"] &
        MichiAttributes<HTMLElementTagNameMap["menu"]>;
      merror: MathMLElements["merror"] & MichiAttributes<MathMLElement>;
      meta: HTMLElements["meta"] &
        MichiAttributes<HTMLElementTagNameMap["meta"]>;
      metadata: SVGElements["metadata"] &
        MichiAttributes<SVGElementTagNameMap["metadata"]>;
      meter: HTMLElements["meter"] &
        MichiAttributes<HTMLElementTagNameMap["meter"]>;
      mfrac: MathMLElements["mfrac"] & MichiAttributes<MathMLElement>;
      mi: MathMLElements["mi"] & MichiAttributes<MathMLElement>;
      mmultiscripts: MathMLElements["mmultiscripts"] &
        MichiAttributes<MathMLElement>;
      mn: MathMLElements["mn"] & MichiAttributes<MathMLElement>;
      mo: MathMLElements["mo"] & MichiAttributes<MathMLElement>;
      mover: MathMLElements["mover"] & MichiAttributes<MathMLElement>;
      mpadded: MathMLElements["mpadded"] & MichiAttributes<MathMLElement>;
      mpath: SVGElements["mpath"] &
        MichiAttributes<SVGElementTagNameMap["mpath"]>;
      mphantom: MathMLElements["mphantom"] & MichiAttributes<MathMLElement>;
      mroot: MathMLElements["mroot"] & MichiAttributes<MathMLElement>;
      mrow: MathMLElements["mrow"] & MichiAttributes<MathMLElement>;
      ms: MathMLElements["ms"] & MichiAttributes<MathMLElement>;
      mspace: MathMLElements["mspace"] & MichiAttributes<MathMLElement>;
      msqrt: MathMLElements["msqrt"] & MichiAttributes<MathMLElement>;
      mstyle: MathMLElements["mstyle"] & MichiAttributes<MathMLElement>;
      msub: MathMLElements["msub"] & MichiAttributes<MathMLElement>;
      msubsup: MathMLElements["msubsup"] & MichiAttributes<MathMLElement>;
      mtable: MathMLElements["mtable"] & MichiAttributes<MathMLElement>;
      mtd: MathMLElements["mtd"] & MichiAttributes<MathMLElement>;
      mtext: MathMLElements["mtext"] & MichiAttributes<MathMLElement>;
      mtr: MathMLElements["mtr"] & MichiAttributes<MathMLElement>;
      munder: MathMLElements["munder"] & MichiAttributes<MathMLElement>;
      munderover: MathMLElements["munderover"] & MichiAttributes<MathMLElement>;
      nav: HTMLElements["nav"] & MichiAttributes<HTMLElementTagNameMap["nav"]>;
      noscript: HTMLElements["noscript"] &
        MichiAttributes<HTMLElementTagNameMap["noscript"]>;
      object: HTMLElements["object"] &
        MichiAttributes<HTMLElementTagNameMap["object"]>;
      ol: HTMLElements["ol"] & MichiAttributes<HTMLElementTagNameMap["ol"]>;
      optgroup: HTMLElements["optgroup"] &
        MichiAttributes<HTMLElementTagNameMap["optgroup"]>;
      option: HTMLElements["option"] &
        MichiAttributes<HTMLElementTagNameMap["option"]>;
      output: HTMLElements["output"] &
        MichiAttributes<HTMLElementTagNameMap["output"]>;
      p: HTMLElements["p"] & MichiAttributes<HTMLElementTagNameMap["p"]>;
      param: HTMLElements["param"] & MichiAttributes<HTMLElement>;
      path: SVGElements["path"] & MichiAttributes<SVGElementTagNameMap["path"]>;
      pattern: SVGElements["pattern"] &
        MichiAttributes<SVGElementTagNameMap["pattern"]>;
      picture: HTMLElements["picture"] &
        MichiAttributes<HTMLElementTagNameMap["picture"]>;
      polygon: SVGElements["polygon"] &
        MichiAttributes<SVGElementTagNameMap["polygon"]>;
      polyline: SVGElements["polyline"] &
        MichiAttributes<SVGElementTagNameMap["polyline"]>;
      pre: HTMLElements["pre"] & MichiAttributes<HTMLElementTagNameMap["pre"]>;
      progress: HTMLElements["progress"] &
        MichiAttributes<HTMLElementTagNameMap["progress"]>;
      q: HTMLElements["q"] & MichiAttributes<HTMLElementTagNameMap["q"]>;
      radialGradient: SVGElements["radialGradient"] &
        MichiAttributes<SVGElementTagNameMap["radialGradient"]>;
      rb: HTMLElements["rb"] & MichiAttributes<HTMLElement>;
      rect: SVGElements["rect"] & MichiAttributes<SVGElementTagNameMap["rect"]>;
      rp: HTMLElements["rp"] & MichiAttributes<HTMLElementTagNameMap["rp"]>;
      rt: HTMLElements["rt"] & MichiAttributes<HTMLElementTagNameMap["rt"]>;
      ruby: HTMLElements["ruby"] &
        MichiAttributes<HTMLElementTagNameMap["ruby"]>;
      s: HTMLElements["s"] & MichiAttributes<HTMLElementTagNameMap["s"]>;
      samp: HTMLElements["samp"] &
        MichiAttributes<HTMLElementTagNameMap["samp"]>;
      script: HTMLElements["script"] &
        SVGElements["script"] &
        MichiAttributes<
          HTMLElementTagNameMap["script"] & SVGElementTagNameMap["script"]
        >;
      section: HTMLElements["section"] &
        MichiAttributes<HTMLElementTagNameMap["section"]>;
      select: HTMLElements["select"] &
        MichiAttributes<HTMLElementTagNameMap["select"]>;
      semantics: MathMLElements["semantics"] & MichiAttributes<MathMLElement>;
      set: SVGElements["set"] & MichiAttributes<SVGElementTagNameMap["set"]>;
      slot: HTMLElements["slot"] &
        MichiAttributes<HTMLElementTagNameMap["slot"]>;
      small: HTMLElements["small"] &
        MichiAttributes<HTMLElementTagNameMap["small"]>;
      source: HTMLElements["source"] &
        MichiAttributes<HTMLElementTagNameMap["source"]>;
      span: HTMLElements["span"] &
        MichiAttributes<HTMLElementTagNameMap["span"]>;
      stop: SVGElements["stop"] & MichiAttributes<SVGElementTagNameMap["stop"]>;
      strong: HTMLElements["strong"] &
        MichiAttributes<HTMLElementTagNameMap["strong"]>;
      style: HTMLElements["style"] &
        SVGElements["style"] &
        MichiAttributes<
          HTMLElementTagNameMap["style"] & SVGElementTagNameMap["style"]
        >;
      sub: HTMLElements["sub"] & MichiAttributes<HTMLElementTagNameMap["sub"]>;
      summary: HTMLElements["summary"] &
        MichiAttributes<HTMLElementTagNameMap["summary"]>;
      sup: HTMLElements["sup"] & MichiAttributes<HTMLElementTagNameMap["sup"]>;
      svg: SVGElements["svg"] & MichiAttributes<SVGElementTagNameMap["svg"]>;
      switch: SVGElements["switch"] &
        MichiAttributes<SVGElementTagNameMap["switch"]>;
      symbol: SVGElements["symbol"] &
        MichiAttributes<SVGElementTagNameMap["symbol"]>;
      table: HTMLElements["table"] &
        MichiAttributes<HTMLElementTagNameMap["table"]>;
      tbody: HTMLElements["tbody"] &
        MichiAttributes<HTMLElementTagNameMap["tbody"]>;
      td: HTMLElements["td"] & MichiAttributes<HTMLElementTagNameMap["td"]>;
      template: HTMLElements["template"] &
        MichiAttributes<HTMLElementTagNameMap["template"]>;
      text: SVGElements["text"] & MichiAttributes<SVGElementTagNameMap["text"]>;
      textPath: SVGElements["textPath"] &
        MichiAttributes<SVGElementTagNameMap["textPath"]>;
      textarea: HTMLElements["textarea"] &
        MichiAttributes<HTMLElementTagNameMap["textarea"]>;
      tfoot: HTMLElements["tfoot"] &
        MichiAttributes<HTMLElementTagNameMap["tfoot"]>;
      th: HTMLElements["th"] & MichiAttributes<HTMLElementTagNameMap["th"]>;
      thead: HTMLElements["thead"] &
        MichiAttributes<HTMLElementTagNameMap["thead"]>;
      time: HTMLElements["time"] &
        MichiAttributes<HTMLElementTagNameMap["time"]>;
      title: HTMLElements["title"] &
        SVGElements["title"] &
        MichiAttributes<
          HTMLElementTagNameMap["title"] & SVGElementTagNameMap["title"]
        >;
      tr: HTMLElements["tr"] & MichiAttributes<HTMLElementTagNameMap["tr"]>;
      track: HTMLElements["track"] &
        MichiAttributes<HTMLElementTagNameMap["track"]>;
      tspan: SVGElements["tspan"] &
        MichiAttributes<SVGElementTagNameMap["tspan"]>;
      u: HTMLElements["u"] & MichiAttributes<HTMLElementTagNameMap["u"]>;
      ul: HTMLElements["ul"] & MichiAttributes<HTMLElementTagNameMap["ul"]>;
      use: SVGElements["use"] & MichiAttributes<SVGElementTagNameMap["use"]>;
      var: HTMLElements["var"] & MichiAttributes<HTMLElementTagNameMap["var"]>;
      video: HTMLElements["video"] &
        MichiAttributes<HTMLElementTagNameMap["video"]>;
      view: SVGElements["view"] & MichiAttributes<SVGElementTagNameMap["view"]>;
      wbr: HTMLElements["wbr"] & MichiAttributes<HTMLElementTagNameMap["wbr"]>;
    }
  }
}

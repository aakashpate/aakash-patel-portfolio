function wrapChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.textContent = "";
  const chars: HTMLElement[] = [];

  for (const ch of text) {
    if (ch === " ") {
      el.appendChild(document.createTextNode(" "));
    } else if (ch === "\n") {
      el.appendChild(document.createElement("br"));
    } else {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.verticalAlign = "top";
      span.textContent = ch;
      el.appendChild(span);
      chars.push(span);
    }
  }
  return chars;
}

function wrapWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.textContent = "";
  const words: HTMLElement[] = [];

  const wordArr = text.split(/(\s+)/);
  for (const part of wordArr) {
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
    } else if (part.length > 0) {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.verticalAlign = "top";
      span.textContent = part;
      el.appendChild(span);
      words.push(span);
    }
  }
  return words;
}

export default class FreeSplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originals: Map<HTMLElement, string> = new Map();
  private elements: HTMLElement[] = [];

  constructor(
    selector: string | HTMLElement | (string | HTMLElement)[],
    options: { type?: string; linesClass?: string } = {}
  ) {
    let targets: HTMLElement[];
    if (typeof selector === "string") {
      targets = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    } else if (Array.isArray(selector)) {
      targets = selector
        .map((item) =>
          typeof item === "string"
            ? (document.querySelectorAll(item) as unknown as HTMLElement[])
            : [item]
        )
        .flat() as HTMLElement[];
    } else {
      targets = [selector];
    }

    this.elements = targets;
    const type = options.type || "chars";

    for (const el of targets) {
      this.originals.set(el, el.innerHTML);

      if (type.includes("chars")) {
        const chars = wrapChars(el);
        this.chars.push(...chars);
      } else if (type.includes("words") || type.includes("lines")) {
        const words = wrapWords(el);
        this.words.push(...words);
      }
    }
  }

  revert() {
    for (const el of this.elements) {
      const original = this.originals.get(el);
      if (original !== undefined) {
        el.innerHTML = original;
      }
    }
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

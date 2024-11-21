declare global {
  interface Window {
    React: {
      functions: Record<string, Function>;
    };
  }
}

window.React = {
  functions: {},
}

export const render = (strings: TemplateStringsArray, ...values: any[]): ChildNode => {
  const htmlString = strings.reduce((result, string, i) => {
    let value = values[i];

    if (typeof value === "function") {
      const fnId = `fn_${Math.random().toString(36).substring(2, 15)}`;
      window.React.functions[fnId] = value;
      value = `window.React.functions.${fnId}()`;
    }

    if (Array.isArray(value)) {
      value = value.reduce((str, item) => {
        str += (item as Element).outerHTML;
        return str;
      }, "");
    }

    if (typeof value === "object")
      return result + string;

    return result + string + value;
  }, "");

  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  const node = template.content.firstChild!;

  for (let i = 0; i < values.length; i++)
    if (values[i].constructor.name === "Ref")
      values[i].current = node;

  return node;
};
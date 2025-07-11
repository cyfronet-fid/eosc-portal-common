import { render } from "preact";
import { fetchPropertiesFrom } from "./parsers";

/**
 * @param cssSelector {string} - CSS tag, id or class, i. e. div, .class, #id
 * @param {Component} Component - Commons lib component
 * @param {object=} elementAttr - HTML element attributes to be set
 */
export function renderComponent(cssSelector, Component, elementAttr = {}) {
  const elementsToBeRendered = getElementsBy(cssSelector);
  elementsToBeRendered.forEach((element) => {
    const params = {
      ...fetchPropertiesFrom(element),
      ...elementAttr
    };
    render(<Component {...params} />, element);
  });
}
window.renderCustomComponent = renderComponent;

export function getElementsBy(cssSelector) {
  const elements = [];

  const element = document.getElementById(cssSelector.substring(1));
  const selectorTypeChar = cssSelector.charAt(0);

  switch (selectorTypeChar) {
    case ".":
      elements.push(...Array.from(document.getElementsByClassName(cssSelector.substring(1))));
      break;
    case "#":
      if (element) {
        elements.push(element);
      }
      break;
    default:
      elements.push(...Array.from(document.getElementsByTagName(cssSelector)));
  }

  return elements;
}

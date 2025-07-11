import { fetchPropertiesFrom } from "./parsers";

describe("Parsers", () => {
  test("should get element attributes in camel case", () => {
    const element = {
      attributes: [
        {
          nodeName: "(onLogin)",
          nodeValue: "console.log();"
        },
        {
          nodeName: "login-url",
          nodeValue: "https://test.pl"
        }
      ]
    };
    const parsedAttributes = fetchPropertiesFrom(element);
    const elementSortedNames = element.attributes.map((node) => node.nodeName).sort();
    expect(Object.keys(parsedAttributes).sort()).toEqual(elementSortedNames);
    const elementSortedValues = element.attributes.map((node) => node.nodeValue).sort();
    expect(Object.values(parsedAttributes).sort()).toEqual(elementSortedValues);
  });
});

/**
 * Fetch snake case attributes as with camel case names
 * @param {Element} element
 * @return {{camelCaseProperty: any}}
 */
export const fetchPropertiesFrom = (element) => {
  const properties = {};
  Object.assign(
    properties,
    ...Array.from(element.attributes).map((attribute) => ({
      [attribute.nodeName.replace(/^(data-)/, "")]: attribute.nodeValue
    }))
  );
  return properties;
};

/**
 *
 * @param {string} url
 * @param {function(error, data)} callback
 */
export function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  function handleResponse() {
    callback(xhr.status === 200 ? xhr.status : null, xhr.response);
  }
  xhr.onload = handleResponse;
  xhr.send();
}

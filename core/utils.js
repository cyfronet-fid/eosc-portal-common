import PropTypes from "prop-types";

/**
 * Transform snake case fields names to camel case one
 * @param object
 * @returns {Object} object with camel case fields
 */
export function fieldsToCamelCase(object) {
  const objectWithCamelCaseFields = {};
  Object.assign(
    objectWithCamelCaseFields,
    ...Object.keys(object).map((key) => ({
      [_toCamelCase(key)]: object[key]
    }))
  );
  return objectWithCamelCaseFields;
}

const _toCamelCase = (sentence) => {
  const [firstWord, ...restOfWords] = sentence.split("-");
  if (restOfWords.length === 0) {
    return firstWord;
  }
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const camelCasedWords = restOfWords.map(capitalize).join("");
  return firstWord + camelCasedWords;
};

/**
 * Valid input types and required fields. Merge default properties.
 * @param {Object} initialProps
 * @param {Component} WrappedComponent
 * @returns {Object} valid properties
 */
export function usePropTypes(initialProps, WrappedComponent) {
  let props = initialProps;
  if (WrappedComponent.propTypes && Object.keys(WrappedComponent.propTypes).length > 0) {
    if (WrappedComponent.defaultProps) {
      props = { ...WrappedComponent.defaultProps, ...props };
    }
    PropTypes.checkPropTypes(WrappedComponent.propTypes, props, "prop", WrappedComponent.name);
  }

  return props;
}

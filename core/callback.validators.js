/**
 * Valid dynamically (a string can be parsed to a function?)
 * @param {string} JSscripts
 * @return {boolean}
 */
export function allValidScripts(...JSscripts) {
  if (!JSscripts || JSscripts.some((script) => !isStaticallyValid(script))) {
    return false;
  }

  const scriptsCallbacks = JSscripts.map((script) => script.split(";"));
  const callbacks = scriptsCallbacks.reduce((acc, callbacks) => [...acc, ...callbacks]);
  return !callbacks.some((callback) => {
    try {
      return !isDynamicallyValid(callback);
    } catch (e) {
      return true;
    }
  });
}

/**
 * Property type validation of a JS script
 * @param props
 * @param propName
 * @returns {Error | null}
 */
export const isJsScript = (props, propName) => {
  if (!allValidScripts(props[propName])) {
    return new Error(`Invalid property ${propName}. JS script isn't valid.`);
  }

  return null;
};
/**
 * Is non empty string
 * @param {String} callback
 * @return {boolean}
 */
export const isStaticallyValid = (callback) => !!callback && callback.trim() !== "";
/**
 * Can a string be parsed to a function
 * @param {string} callback
 * @param {object} event
 * @return {boolean}
 */
export const isDynamicallyValid = (callback, event = {}) => {
  try {
    if (callback.includes("$event")) {
      return !!new Function("$event", callback);
    }
    return !!new Function(`{ return ${callback} };`);
  } catch (e) {
    throw new Error(`Calling ${callback} on ${event.type} ${event.target} has been crashed: ${e}`);
  }
};

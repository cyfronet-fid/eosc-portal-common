import Cookies from "js-cookie";
import { environment } from "../../env/env";
import callAll from "../../core/callback";

export const AUTOLOGIN_COOKIE_NAME = "_eosc_common_autologin";
export const LOGIN_ATTEMPT_COOKIE_NAME = "_eosc_common_login_attempt";
export const LOGOUT_ATTEMPT_COOKIE_NAME = "_eosc_common_logout_attempt";

/**
 * IMPORTANT!!! The cookies life is equal to AAI Session Life Time
 * @ignore
 */
const AUTOLOGIN_COOKIE_LIFE_OFFSET_MS = 60 * 1000;
export const AUTOLOGIN_COOKIE_LIFE_MS = 60 * 60 * 1000 - AUTOLOGIN_COOKIE_LIFE_OFFSET_MS;

export function tryAutologin(props) {
  const isLoggedIn = !!props.username && props.username.trim() !== "";
  if (setAutologinCookie(isLoggedIn) || removeAutologinCookie(isLoggedIn) || shouldSkipAutologin(isLoggedIn)) {
    return;
  }

  tryLogin(props);
}

export function isAutologinOn(autoLogin) {
  return autoLogin === true || autoLogin === "true" || autoLogin === "1" || autoLogin === 1 || autoLogin === undefined;
}

export function getCookieConfig(domain) {
  return {
    domain,
    expires: new Date(new Date().getTime() + AUTOLOGIN_COOKIE_LIFE_MS),
    secure: environment.production,
    sameSite: "strict"
  };
}

function setAutologinCookie(isLoggedIn) {
  const _setAutologinCookie = !!Cookies.get(LOGIN_ATTEMPT_COOKIE_NAME) && isLoggedIn;
  if (_setAutologinCookie) {
    Cookies.remove(LOGIN_ATTEMPT_COOKIE_NAME, getCookieConfig(window.location.hostname));
    const setAutologin = (domain) => Cookies.set(AUTOLOGIN_COOKIE_NAME, AUTOLOGIN_COOKIE_NAME, getCookieConfig(domain));
    environment.defaultConfiguration.autoLoginDomains.forEach((domain) => setAutologin(domain));
  }
  return _setAutologinCookie;
}

function removeAutologinCookie(isLoggedIn) {
  const _removeAutologinCookie = !!Cookies.get(LOGIN_ATTEMPT_COOKIE_NAME) && !isLoggedIn;
  if (_removeAutologinCookie) {
    Cookies.remove(LOGIN_ATTEMPT_COOKIE_NAME, getCookieConfig(window.location.hostname));
    const removeAutologin = (domain) => Cookies.remove(AUTOLOGIN_COOKIE_NAME, getCookieConfig(domain));
    environment.defaultConfiguration.autoLoginDomains.forEach((domain) => removeAutologin(domain));
  }
  return _removeAutologinCookie;
}

function shouldSkipAutologin(isLoggedIn) {
  const logoutAttempt = !!Cookies.get(LOGOUT_ATTEMPT_COOKIE_NAME);
  const _shouldSkipAutologin = (!Cookies.get(AUTOLOGIN_COOKIE_NAME) && !isLoggedIn) || logoutAttempt || isLoggedIn;
  if (_shouldSkipAutologin) {
    Cookies.remove(LOGOUT_ATTEMPT_COOKIE_NAME, getCookieConfig(window.location.hostname));
  }
  return _shouldSkipAutologin;
}

function tryLogin(props) {
  Cookies.set(LOGIN_ATTEMPT_COOKIE_NAME, LOGIN_ATTEMPT_COOKIE_NAME, getCookieConfig(window.location.hostname));

  if (props.loginUrl) {
    window.location.href = props.loginUrl;
    return;
  }

  // TODO: Deprecate braces in props names
  const onLogin = props["(onLogin)"] && props["(onLogin)"].trim() !== "" ? props["(onLogin)"] : props.onLogin;
  if (onLogin) {
    callAll(null, onLogin);
    return;
  }

  console.warn("Login attempt goes wrong. Your session may expired.");
}

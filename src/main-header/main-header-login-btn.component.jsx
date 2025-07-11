import Cookies from "js-cookie";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";
import { h, Component } from "preact";
import { getCookieConfig, LOGIN_ATTEMPT_COOKIE_NAME } from "./auto-login.utils";
import { isJsScript } from "../../core/callback.validators";
import callAll from "../../core/callback";
import { usePropTypes } from "../../core/utils";

export default class EoscMainHeaderLoginBtn extends Component {
  static propTypes = {
    loginUrl: requiredIf(PropTypes.string, (props) => !props["(onLogin)"] || props["(onLogin)"].trim() === ""),
    "(onLogin)": requiredIf(isJsScript, (props) => !props.loginUrl || props.loginUrl.trim() === "")
  };

  static defaultProps = {
    loginUrl: "",
    "(onLogin)": ""
  };

  render(props) {
    // TODO: deprecate braces around properties names
    const onLogin = props["(onLogin)"] && props["(onLogin)"].trim() !== "" ? props["(onLogin)"] : props.onLogin;
    const { loginUrl } = usePropTypes(props, EoscMainHeaderLoginBtn);
    return (
      <li id="login-btn">
        <strong>
          <a
            href={loginUrl || "#!"}
            onClick={(event) => {
              Cookies.set(
                LOGIN_ATTEMPT_COOKIE_NAME,
                LOGIN_ATTEMPT_COOKIE_NAME,
                getCookieConfig(window.location.hostname)
              );
              if (onLogin && onLogin.trim() !== "") {
                callAll(event, onLogin);
              }
            }}
          >
            Login
          </a>
        </strong>
      </li>
    );
  }
}

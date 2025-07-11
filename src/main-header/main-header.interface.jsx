import PropTypes from "prop-types";
import { Component } from "preact";
import { environment } from "../../env/env";
import { isAutologinOn, tryAutologin } from "./auto-login.utils";
import EoscMainHeaderBtn from "./main-header-btn.component";
import { getAuthBtn, isBtnActive } from "./main-header.utils";
import { isJsScript } from "../../core/callback.validators";
import { renderComponent } from "../../core/render";
import { fieldsToCamelCase, usePropTypes } from "../../core/utils";
import RWD from "../../core/rwd.hoc";

/**
 * @version 1.1
 */
class EoscCommonMainHeader extends Component {
  static propTypes = {
    /**
     * Username property
     */
    username: PropTypes.string,
    "loginUrl": PropTypes.string,
    "logoutUrl": PropTypes.string,
    "onLogin": isJsScript,
    "onLogout": isJsScript,
    autoLogin: PropTypes.bool,
    "showEoscLinks": PropTypes.bool,
    "profileLinks": PropTypes.string
  };

  static defaultProps = {
    username: "",
    "loginUrl": "",
    "logoutUrl": "",
    "onLogin": "",
    "onLogout": "",
    autoLogin: true,
    "showEoscLinks": false,
    "profileLinks": "[]"
  };

  render(props) {
    /**
     * IMPORTANT!!! By default is on
     */
    const parsedProps = fieldsToCamelCase(usePropTypes(props, EoscCommonMainHeader));
    parsedProps.profileLinks = JSON.parse(parsedProps.profileLinks);
    const { autoLogin } = parsedProps;
    if (isAutologinOn(autoLogin)) {
      tryAutologin(parsedProps);
    }

    return (
      <RWD showOn={["lg", "xl", "md", "sm", "xsm"]}>
        <div class="commons-header">
          <nav className={`eosc-common top ${environment.production ? "" : "demo"}`}>
            <div className="container">
              <div className="left-links">
                <a href="https://www.eosc-beyond.eu/" className="beyond-logo">
                  &nbsp;
                </a>
              </div>

              <input className="menu-btn" type="checkbox" id="menu-btn"/>
              <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>

              <ul className="menu center-links">
                {environment.mainHeaderConfig.map((config) => (
                  <EoscMainHeaderBtn
                    {...{
                      ...config,
                      isActive: isBtnActive(
                        environment.mainHeaderConfig.map((btn) => btn.url),
                        config.url
                      )
                    }}
                  />
                ))}
              </ul>
              <ul className="right-links">
                {getAuthBtn(parsedProps)}
              </ul>
            </div>
          </nav>
        </div>
      </RWD>
    );
  }
}

renderComponent(EoscCommonMainHeader.name, EoscCommonMainHeader);
renderComponent(".eosc-common-main-header", EoscCommonMainHeader);
renderComponent("#eosc-common-main-header", EoscCommonMainHeader);
renderComponent("eosc-common-main-header", EoscCommonMainHeader);
window[environment.windowTagName].renderMainHeader = (cssSelector, elementAttr = {}) => {
  renderComponent(cssSelector, EoscCommonMainHeader, elementAttr);
};

export default EoscCommonMainHeader;
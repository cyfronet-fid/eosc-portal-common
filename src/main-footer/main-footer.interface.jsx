import PropTypes from "prop-types";
import { Component } from "preact";
import { environment } from "../../env/env";
import EoscMainFooterLogoBar from "./main-footer-logo-bar.component";
import EoscMainFooterLegalBar from "./main-footer-legal.component";
import EoscMainFooterBtn from "./main-footer-btn.component";
import { fieldsToCamelCase, usePropTypes } from "../../core/utils";
import { renderComponent } from "../../core/render";
import { isBtnActive } from "../main-header/main-header.utils";

/**
 * @version 1.1
 */
// eslint-disable-next-line no-unused-vars
class EoscCommonMainFooter extends Component {
  static propTypes = {
    production: PropTypes.bool,
    socialIcons: PropTypes.arrayOf(
        PropTypes.shape({
          class: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
    ),
    termsOfUse: PropTypes.string,
    privacyPolicy: PropTypes.string
  };

  static defaultProps = {
    production: environment.production,
  };

  render(props) {
    const { production, termsOfUse, privacyPolicy} = fieldsToCamelCase(usePropTypes(props, EoscCommonMainFooter));
    return (
        <div>
          <div className={`eosc-common footer-common pt-3 pb-3 ${production ? "" : "demo"}`}>
            <div className="container">
              <div className="footer-row">
                <ul className="footer-menu">
                  {environment.mainFooterConfig.links.map((config) => (
                      <EoscMainFooterBtn
                          {...{
                            ...config,
                            isActive: isBtnActive(
                                environment.mainFooterConfig.links.map((btn) => btn.url),
                                config.url
                            ),
                          }}
                      />
                  ))}
                </ul>
                <EoscMainFooterLogoBar/>
              </div>
              <div className="eosc-common copyright">
                <EoscMainFooterLegalBar/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

renderComponent(EoscCommonMainFooter.name, EoscCommonMainFooter);
renderComponent("eosc-common-main-footer", EoscCommonMainFooter);
renderComponent(".eosc-common-main-footer", EoscCommonMainFooter);
renderComponent("#eosc-common-main-footer", EoscCommonMainFooter);
window[environment.windowTagName].renderMainFooter = (cssSelector, elementAttr) => {
  renderComponent(cssSelector, EoscCommonMainFooter, elementAttr);
};

export default EoscCommonMainFooter;

import Cookies from "js-cookie";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";
import { Component, Fragment } from "preact";
import { environment } from "../../env/env";
import { AUTOLOGIN_COOKIE_NAME, getCookieConfig, LOGOUT_ATTEMPT_COOKIE_NAME } from "./auto-login.utils";
import { isJsScript } from "../../core/callback.validators";
import callAll from "../../core/callback";
import FasUserIcon from "../../core/icons/fas-user.icon";
import { usePropTypes } from "../../core/utils";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import * as React from "react";
import FasChevronDownIcon from "../../core/icons/fas-chevron-down.icon";

const AccountToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        className={"account-dropdown"}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
    >
      {children}
    </a>
));

export default class EoscMainHeaderLogoutBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "user" // Ustawienie domyślnej wartości na "user"
    };
  }

  static propTypes = {
    username: PropTypes.string,
    profileLinks: PropTypes.array,
    customTabs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(PropTypes.shape({
        caption: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
      }))
    })),
    showEoscLinks: PropTypes.bool,
    logoutUrl: requiredIf(PropTypes.string, (props) => !props["(onLogout)"] || props["(onLogout)"].trim() === ""),
    "(onLogout)": requiredIf(isJsScript, (props) => !props.logoutUrl || props.logoutUrl.trim() === "")
  };

  static defaultProps = {
    username: "",
    profileLinks: [],
    customTabs: [],
    logoutUrl: "",
    showEoscLinks: false,
    "(onLogout)": ""
  };

  eoscLinks() {
    const marketplaceUrl = environment.marketplaceUrl;
    const dashboardUrl = environment.dashboardUrl;
    return [
      { href: dashboardUrl, caption: "Dashboard" },
      { href: `${marketplaceUrl}/projects`, caption: "My projects" },
      // favourites will be move shortly to dashboard
      // { href: "/favourites", caption: "Favourite resources", "data-e2e": "favourites" },
      { href: `${marketplaceUrl}/profile`, caption: "Profile", "data-e2e": "profile" },
      { href: `${marketplaceUrl}/api_docs`, caption: "Marketplace API", "data-e2e": "marketplace-api" }
    ];
  }

  handleTabClick = (tabId, event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ activeTab: tabId });
  };

  renderLogoutItem(props, onLogout, logoutUrl) {
    return (
        <Dropdown.Item
            className="text-end"
            href={logoutUrl || "#!"}
            id="logout-btn"
            data-e2e="logout"
            onClick={(event) => {
              Cookies.set(
                  LOGOUT_ATTEMPT_COOKIE_NAME,
                  LOGOUT_ATTEMPT_COOKIE_NAME,
                  getCookieConfig(window.location.hostname)
              );
              const { autoLoginDomains } = environment.defaultConfiguration;
              autoLoginDomains.forEach((domain) => Cookies.remove(AUTOLOGIN_COOKIE_NAME, getCookieConfig(domain)));
              if (onLogout && onLogout.trim() !== "") {
                callAll(event, onLogout);
              }
            }}
        >
          Logout
          <span className="ms-2">→</span>
        </Dropdown.Item>
    );
  }

  renderDefaultTabContent(props, onLogout, logoutUrl) {
    return (
        <Fragment>
          {(props.showEoscLinks ? this.eoscLinks() : []).map((link, index) => (
              <Dropdown.Item key={`eosc-${index}`} {...link}>{link.caption}</Dropdown.Item>
          ))}

          {props.profileLinks.map((link, index) => (
              <Dropdown.Item key={`profile-${index}`} {...link}>{link.caption}</Dropdown.Item>
          ))}
        </Fragment>
    );
  }

  renderCustomTabContent(tab) {
    return (
        <Fragment>
          {tab.links && tab.links.map((link, index) => (
              <Dropdown.Item key={`${tab.id}-${index}`} {...link}>{link.caption}</Dropdown.Item>
          ))}
        </Fragment>
    );
  }

  renderTabsContent(props, onLogout, logoutUrl) {
    const { activeTab } = this.state;

    if (activeTab === "user" || !activeTab) { // Dodatkowa kontrola dla undefined
      return this.renderDefaultTabContent(props, onLogout, logoutUrl);
    }

    const selectedTab = props.customTabs.find(tab => tab.id === activeTab);
    if (selectedTab) {
      return this.renderCustomTabContent(selectedTab);
    }

    return this.renderDefaultTabContent(props, onLogout, logoutUrl); // Fallback na domyślną zawartość
  }

  render(props) {
    // TODO: deprecate braces around properties names
    const onLogout = props["(onLogout)"] && props["(onLogout)"].trim() !== "" ? props["(onLogout)"] : props.onLogout;
    const { username, logoutUrl } = usePropTypes(props, EoscMainHeaderLogoutBtn);
    const { customTabs } = props;
    const { activeTab } = this.state;

    const hasCustomTabs = customTabs && customTabs.length > 0;
    const currentActiveTab = activeTab || "user";

    return (
        <Fragment>
          <li>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-menu-button" as={AccountToggle}>
                <FasUserIcon />
                <span>{username}</span>
                <FasChevronDownIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {hasCustomTabs ? (
                    <Fragment>
                      <div className="dropdown-tabs-container" onClick={(e) => e.stopPropagation()}>
                        <Nav variant="tabs" activeKey={currentActiveTab} className="dropdown-tabs">
                          <Nav.Item>
                            <Nav.Link
                                eventKey="user"
                                onClick={(e) => this.handleTabClick("user", e)}
                            >
                              User
                            </Nav.Link>
                          </Nav.Item>
                          {customTabs.map((tab) => (
                              <Nav.Item key={tab.id}>
                                <Nav.Link
                                    eventKey={tab.id}
                                    onClick={(e) => this.handleTabClick(tab.id, e)}
                                >
                                  {tab.name}
                                </Nav.Link>
                              </Nav.Item>
                          ))}
                        </Nav>
                      </div>
                      <Dropdown.Divider />
                      {this.renderTabsContent(props, onLogout, logoutUrl)}
                      <Dropdown.Divider />
                      {this.renderLogoutItem(props, onLogout, logoutUrl)}
                    </Fragment>
                ) : (
                    <Fragment>
                      {this.renderDefaultTabContent(props, onLogout, logoutUrl)}
                      <Dropdown.Divider />
                      {this.renderLogoutItem(props, onLogout, logoutUrl)}
                    </Fragment>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </Fragment>
    );
  }
}
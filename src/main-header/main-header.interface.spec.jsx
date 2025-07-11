import { render, screen, fireEvent, waitFor } from "@testing-library/preact";
import { h } from "preact";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import { environment } from "../../env/env";
import EoscCommonMainHeader from "./main-header.interface";
import * as AutoLoginUtils from "./auto-login.utils";
import * as CallbackUtils from "../../core/callback";
import "window-resizeto/polyfill";

import {
  AUTOLOGIN_COOKIE_NAME,
  getCookieConfig,
  LOGIN_ATTEMPT_COOKIE_NAME,
  LOGOUT_ATTEMPT_COOKIE_NAME
} from "./auto-login.utils";

// Mock location
delete window.location;
window.location = { 
  href: null,
  hostname: 'localhost'
};

// TODO: temporarily disable tests. Need to be fixed!!!
describe("Main Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset location
    window.location.href = null;
  });

  test.skip("should run on logout script", async () => {
    const user = userEvent.setup();
    const consoleLogSpy = jest.spyOn(console, "log");
    const props = {
      username: "username",
      "loginUrl": "https://test.pl",
      "onLogout": "console.log('test')"
    };

    render(<EoscCommonMainHeader {...props} />);
    
    expect(screen.getByText("My EOSC")).toBeInTheDocument();

    const logoutLink = screen.getByText("Logout").closest('a');
    await user.click(logoutLink);
    
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("test");
    });
  });

  test.skip("should run on login script", async () => {
    const user = userEvent.setup();
    const consoleLogSpy = jest.spyOn(console, "log");
    const props = {
      username: "",
      "logout-url": "https://test.pl",
      "on-login": "console.log('test')"
    };
    
    render(<EoscCommonMainHeader {...props} />);
    
    expect(screen.getByText("Login")).toBeInTheDocument();

    const loginLink = screen.getByText("Login").closest('a');
    await user.click(loginLink);
    
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("test");
    });
  });

  test.skip("should display all hrefs", () => {
    const props = {
      username: "",
      "logout-url": "https://test.pl",
      "login-url": "https://test1.pl"
    };
    
    render(<EoscCommonMainHeader {...props} />);
    
    environment.mainHeaderConfig.forEach((config) => {
      expect(screen.getByText(config.label)).toBeInTheDocument();
    });
  });

  describe("Autologin", () => {
    test("should try autologin with url", () => {
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === AUTOLOGIN_COOKIE_NAME);

      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };
      
      new EoscCommonMainHeader().render(props);
      expect(window.location.href).toEqual(props["login-url"]);
    });

    test("should try autologin with callback", () => {
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === AUTOLOGIN_COOKIE_NAME);
      const callAllSpy = jest.spyOn(CallbackUtils, "default");
      
      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "on-login": "console.log('test');"
      };
      
      new EoscCommonMainHeader().render(props);
      expect(callAllSpy).toHaveBeenCalledWith(null, props["on-login"]);
    });

    test("[Deprecated use with braces] should try autologin with callback", () => {
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === AUTOLOGIN_COOKIE_NAME);
      const callAllSpy = jest.spyOn(CallbackUtils, "default");
      
      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "(on-login)": "console.log('test');"
      };
      
      new EoscCommonMainHeader().render(props);
      expect(callAllSpy).toHaveBeenCalledWith(null, props["(on-login)"]);
    });

    test("should try login by default", () => {
      const autoLoginCallSpy = jest.spyOn(AutoLoginUtils, "tryAutologin");
      
      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };
      
      new EoscCommonMainHeader().render(props);
      expect(autoLoginCallSpy).toHaveBeenCalled();
    });

    test("should create autologin cookie", () => {
      const props = {
        username: "logged in user",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };
      
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === LOGIN_ATTEMPT_COOKIE_NAME);
      const setCookieSpy = jest.spyOn(Cookies, "set");
      const removeCookieSpy = jest.spyOn(Cookies, "remove");
      
      new EoscCommonMainHeader().render(props);

      expect(removeCookieSpy).toHaveBeenCalledWith(LOGIN_ATTEMPT_COOKIE_NAME, {
        ...getCookieConfig(window.location.hostname),
        expires: expect.anything()
      });
      
      environment.defaultConfiguration.autoLoginDomains.forEach((domain) => {
        expect(setCookieSpy).toHaveBeenCalledWith(AUTOLOGIN_COOKIE_NAME, AUTOLOGIN_COOKIE_NAME, {
          ...getCookieConfig(domain),
          expires: expect.anything()
        });
      });
    });

    test("should remove autologin cookie on missing username", () => {
      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };
      
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === LOGIN_ATTEMPT_COOKIE_NAME);
      const removeCookieSpy = jest.spyOn(Cookies, "remove");
      
      new EoscCommonMainHeader().render(props);
      
      expect(removeCookieSpy).toHaveBeenCalledWith(LOGIN_ATTEMPT_COOKIE_NAME, {
        ...getCookieConfig(window.location.hostname),
        expires: expect.anything()
      });
      
      environment.defaultConfiguration.autoLoginDomains.forEach((domain) => {
        expect(removeCookieSpy).toHaveBeenCalledWith(AUTOLOGIN_COOKIE_NAME, {
          ...getCookieConfig(domain),
          expires: expect.anything()
        });
      });
    });
  });
});
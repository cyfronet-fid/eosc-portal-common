import EoscMainHeaderLogoutBtn from "./main-header-logout-btn.component";
import EoscMainHeaderLoginBtn from "./main-header-login-btn.component";

export function isBtnActive(btnsUrls, btnUrl) {
  const currentUrlBase = `${window.location.protocol}//${window.location.hostname}`;
  if (!btnUrl.includes(currentUrlBase)) {
    return false;
  }

  const allBtnsSubpages = btnsUrls
    .filter((url) => !!url && url.trim() !== "")
    .map((url) => new URL(url).pathname)
    .filter((path) => path !== "/");
  const parsedBtnUrl = new URL(btnUrl);

  // Global active btn
  const isMainPageBtn = parsedBtnUrl.pathname === "/";
  const isMainBtnRestrictedSubpage = !allBtnsSubpages.includes(window.location.pathname);
  const shouldBeActivatedOnSubpages = isMainPageBtn && isMainBtnRestrictedSubpage;

  // Subpage btn
  const isMainPage = window.location.pathname !== "/";
  const isSpecificSubpage = isMainPage && new URL(btnUrl).pathname.includes(window.location.pathname);

  return shouldBeActivatedOnSubpages || isSpecificSubpage;
}

export function getAuthBtn(props) {

  const { loginUrl, logoutUrl, onLogin, onLogout } = props;
  if (!loginUrl && !logoutUrl && !onLogin && !onLogout) {
    return null;
  }

  const { username } = props;
  const isLoggedIn = !!username && username.trim() !== "";
  return isLoggedIn ? <EoscMainHeaderLogoutBtn {...props} /> : <EoscMainHeaderLoginBtn {...props} />;
}

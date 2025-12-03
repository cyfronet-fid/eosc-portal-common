const mainHeaderConfig = require("../configurations/main-header.beta.config.json");
const mainFooterConfig = require("../configurations/main-footer.development.config.json");
const defaultConfiguration = require("../configurations/configuration.development.json");

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
  marketplaceUrl: "https://userspace.sandbox.eosc-beyond.eu",
  dashboardUrl: "https://my.sandbox.eosc-beyond.eu",
  production: false,
  windowTagName: "eosccommon",
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}

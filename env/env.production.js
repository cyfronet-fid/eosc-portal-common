const mainHeaderConfig = require("../configurations/main-header.production.config.json");
const mainFooterConfig = require("../configurations/main-footer.production.config.json");
const defaultConfiguration = require("../configurations/configuration.production.json");

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
  marketplaceUrl: "https://userspace.sandbox.eosc-beyond.eu",
  dashboardUrl: "https://my.sandbox.eosc-beyond.eu",
  production: true,
  windowTagName: "eosccommon",
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}

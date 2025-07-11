const log = require("fancy-log");

const validProductionArgv = (production) => {
  function validProductionArgvTask(cb) {
    const isValid = production === true || production === undefined;
    if (isValid) {
      cb();
      return;
    }

    log(`
      To get more knowledge about params please see documentation under URL:\n
      - https://github.com/cyfronet-fid/eosc-portal-common#development
      - https://github.com/cyfronet-fid/eosc-portal-common#building
    `);
    log("Production param is only a flag and shouldn't have any value");
    process.exit(1);
  }
  return validProductionArgvTask;
};

const validEnvArgv = (env) => {
  function validEnvArgvTask(cb) {
    if (!env) {
      log("Environment configuration file is required");
      log("Please provide --env parameter with path to configuration file");
      process.exit(1);
    }

    const fs = require("fs");
    const path = require("path");

    const envPath = path.resolve(env);
    if (!fs.existsSync(envPath)) {
      log(`Environment configuration file not found: ${envPath}`);
      process.exit(1);
    }

    cb();
  }
  return validEnvArgvTask;
};

module.exports = {
  validProductionArgv,
  validEnvArgv,
};
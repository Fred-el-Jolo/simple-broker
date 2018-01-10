const envalid = require('envalid');

const config = envalid.cleanEnv(process.env, {
    NODE_ENV: envalid.str({ choices: [`development`, `production`, `test`, `provision`] }),
});

module.exports = config;

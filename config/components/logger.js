const envalid = require('envalid');

const config = envalid.cleanEnv(process.env, {
    LOGGER_LEVEL: envalid.str({
        choices: [`error`, `warn`, `info`, `verbose`, `debug`, `silly`],
        default: `info`,
    }),
    LOGGER_ENABLED: envalid.bool({ default: true }),
    LOGGER_PATH: envalid.str({ default: `` }),
});

module.exports = config;

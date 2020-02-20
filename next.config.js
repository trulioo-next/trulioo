const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/*eslint-disable no-unused-vars */
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};

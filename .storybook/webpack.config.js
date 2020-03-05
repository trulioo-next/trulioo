const path = require("path");
const webpack = require("webpack");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need

    config.module.rules.pop();
    config.module.rules.pop();

    config.module.rules.push({
        test: /\.svg$/,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    svgoConfig: {
                        plugins: {
                            removeViewBox: false
                        }
                    },
                    titleProp: true
                }
            }
        ]
    });

    // Return the altered config
    return config;
};

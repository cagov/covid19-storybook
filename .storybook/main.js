const path = require('path');

module.exports = {
  // Commented out to allow full page reload configuration in preview.js to work (and not conflict)
  // "stories": [
  //   "../stories/**/*.stories.mdx",
  //   "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  //   path.join(__dirname, '..', 'stories.@(js|jsx|ts|tsx|mdx'),
  // ],
  "addons": [

    // "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-cssresources",
    // { 
    //   name: '@storybook/addon-a11y', 
    //   options: {
    //     maxLevels: 2,
    //   }
    // },
    // "storybook-addon-designs",
    '@storybook/preset-scss'
  ],
  watch: true,
  watchOptions: {
    ignored: "/node_modules/"
  },
  // Handle re-rendering of story component https://github.com/storybookjs/storybook/issues/12578
  babel: async (options) => {
    Object.assign(options.plugins.find((plugin) => plugin[0].includes('plugin-proposal-decorators'))[1], {
      decoratorsBeforeExport: true,
      legacy: false
    })
    return options;
  },
  // webpackFinal: async (config, { configType }) => {
  //   // get index of css rule
  //   const ruleCssIndex = config.module.rules.findIndex(
  //     (rule) => rule.test.toString() === "/\\.css$/"
  //   );
    
  //   // map over the 'use' array of the css rule and set the 'module' option to true
  //   config.module.rules[ruleCssIndex].use.map((item) => {
  //     if (item.loader && item.loader.includes("/css-loader/")) {
  //       item.options.modules = {
  //         mode: "local",
  //         localIdentName:
  //           configType === "PRODUCTION"
  //             ? "[local]__[hash:base64:5]"
  //             : "[name]__[local]__[hash:base64:5]",
  //       };
  //     }

  //     return item;
  //   });

  //   return config;
  // },
}


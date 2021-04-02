import { withConsole, setConsoleOptions } from "@storybook/addon-console";
// import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import {
  configure,
  // setCustomElements,
} from "@storybook/web-components";

import { themes } from "@storybook/theming";
import storybookTheme from "./covid19.theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // viewport: {
  //   viewports: MINIMAL_VIEWPORTS,
  // },
  docs: {
    theme: themes.light,
    // theme: storybookTheme,
  },
  options: {
    storySort: {
      order: [
        "Intro",
        "Covid19",
        ["Intro", "Web components"],
      ],
    },
  },
};

setConsoleOptions({
  panelExclude: [],
});

// https://github.com/storybookjs/storybook/issues/12307
// Force full reload to not reregister web components.

const req = require.context("../js", true, /\.stories\.(js|mdx)$/);
configure(req, module);
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}

import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import storybookTheme from './covid19.theme';

addons.setConfig({
  theme: themes.light,
});

// addons.setConfig({
//   theme: storybookTheme,
// });
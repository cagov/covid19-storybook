import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#1F2574',
  colorSecondary: '#FF8000',

  // UI
  appBg: 'white',
  appContentBg: 'silver',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
  fontSize: "1.2rem",

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'white',
  barBg: '#1F2574',

  // Form colors
  inputBg: 'white',
  inputBorder: '#F8F8F8',
  inputTextColor: 'white',
  inputBorderRadius: 4,

  brandTitle: 'ca.gov Web Component Library',
  brandUrl: 'https://ca.gov',
  brandImage: 'https://placehold.it/350x150',
});
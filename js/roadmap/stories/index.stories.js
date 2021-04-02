import { withDesign } from "storybook-addon-designs";
import { WebComponent, WebComponentSpanish } from './storybook-web-component';
import { data } from "./../scripts/auto-generated-data/data";

export default {
  title: 'Covid19/cagov-reopening',
  argTypes: {
  },
  decorators: [withDesign]
};

// Hide some data from the controls display.
let argTypes = {
  parameters: { 
    a11y: {
      disabled: true
    } 
  },
  data : { control: { disable: true } },
  // county : { control: { disable: true } },
  // language : { control: { disable: true } },
};

const Template = (args) => WebComponent(args);
const TemplateSpanish = (args) => WebComponentSpanish(args);


// let remoteData = fetchData({
//   hostUrl: "https://covid19.ca.gov",
// });




/**
* Connect mock data
*/
Template.args = {
    data: data,
};


export const CountyOnlyEn = Template.bind({});
CountyOnlyEn.argTypes = argTypes;
CountyOnlyEn.args = {
  countyValue: 'Alameda',
  activityValue: '',
  language: 'en',
  data: data['en'],
};
/**
* Connect Figma Frame
*/
CountyOnlyEn.parameters = {
  design: {
    type: "figma",
    url:
      "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3815%3A0",
  },
};

export const CountyOnlyEs = TemplateSpanish.bind({});
CountyOnlyEs.argTypes = argTypes;
CountyOnlyEs.args = {
  countyValue: 'San Francisco',
  activityValue: '',
  language: 'es',
  data: data['es'],
};
/**
* Connect Figma Frame
*/
// CountyOnlyEs.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3815%3A0",
//   },
// };

// export const CountyOnlyTl = Template.bind({});
// CountyOnlyEn.args = {
//   countyValue: 'Alameda',
//   activityValue: '',
//   language: 'tl',
//   data: data['tl'],
// };
// /**
// * Connect Figma Frame
// */
// CountyOnlyTl.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3815%3A0",
//   },
// };

// export const CountyOnlyAr = Template.bind({});
// CountyOnlyAr.args = {
//   countyValue: 'Alameda',
//   activityValue: '',
//   language: 'ar',
//   data: data['ar'],
// };
// /**
// * Connect Figma Frame
// */
// CountyOnlyAr.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3815%3A0",
//   },
// };

export const CountyActivityEn = Template.bind({});
CountyActivityEn.argTypes = argTypes;
CountyActivityEn.args = {
  countyValue: 'Alameda',
  activityValue: 'Appliance repair shops',
  language: 'en',
  data: data['en'],
};

/**
* Connect Figma Frame
*/
// CountyActivityEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A168",
//   },
// };

export const ActivityOnlyEn = Template.bind({});
ActivityOnlyEn.argTypes = argTypes;
ActivityOnlyEn.args = {
  countyValue: '',
  activityValue: 'Appliance repair shops',
  language: 'en',
  data: data['en'],
};

/**
* Connect Figma Frame
*/
// ActivityOnlyEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };

export const NoCountyActivityEn = Template.bind({});
NoCountyActivityEn.argTypes = argTypes;
NoCountyActivityEn.args = {
  countyValue: '',
  activityValue: '',
  language: 'en',
  data: data['en'],
};

/**
* Connect Figma Frame
*/
// NoCountyActivityEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };

// export const SchoolsCountyEn = Template.bind({});
// SchoolsCountyEn.argTypes = argTypes;
// SchoolsCountyEn.args = {
//   countyValue: 'Alameda',
//   activityValue: 'Schools',
//   language: 'en',
//   data: data['en'],
// };

/**
* Connect Figma Frame
*/
// SchoolsCountyEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };

// export const SchoolsNoCountyEn = Template.bind({});
// SchoolsNoCountyEn.argTypes = argTypes;
// SchoolsNoCountyEn.args = {
//   countyValue: '',
//   activityValue: 'Schools',
//   language: 'en',
//   data: data['en'],
// };

/**
* Connect Figma Frame
*/
// SchoolsNoCountyEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };


// export const RSHOActivityCountyEn = Template.bind({});
// RSHOActivityCountyEn.argTypes = argTypes;
// RSHOActivityCountyEn.args = {
//   countyValue: 'Yolo',
//   activityValue: 'Aquariums',
//   isUnderRSHO: true,
//   language: 'en',
//   data: data['en'],
// };

/**
* Connect Figma Frame
*/
// RSHOActivityCountyEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };

// export const RSHOSchoolsCountyEn = Template.bind({});
// RSHOSchoolsCountyEn.argTypes = argTypes;
// RSHOSchoolsCountyEn.args = {
//   countyValue: 'San Francisco',
//   activityValue: 'Schools',
//   isUnderRSHO: true,
//   language: 'en',
//   data: data['en'],
// };

/**
* Connect Figma Frame
*/
// RSHOActivityCountyEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };

// export const RSHOSchoolsNoCountyEn = Template.bind({});
// RSHOSchoolsNoCountyEn.argTypes = argTypes;
// RSHOSchoolsNoCountyEn.args = {
//   countyValue: '',
//   activityValue: 'Schools',
//   isUnderRSHO: true,
//   language: 'en',
//   data: data['en'],
// };

/**
* Connect Figma Frame
*/
// RSHOActivityCountyEn.parameters = {
//   design: {
//     type: "figma",
//     url:
//       "https://www.figma.com/file/LrzsOu8U5KcMAjJTQ1O3BG/covid19.ca.gov-screens?node-id=3813%3A309",
//   },
// };
import { getMoreLanguages as WebComponent } from './../src';
import { data } from "./../../scripts/auto-generated-data/data";

console.log("pdf", data['en']);

export default {
  title: 'Covid19/pdf-more-languages',
};

const Template = (args) => WebComponent(args);

export const AgricultureGuidance = Template.bind({});
AgricultureGuidance.args = {
  links: data["en"]["state-industry-guidance"].data["agriculture"].pdf,
  language: "en",
  type: "Guidance",
  label: "More languages"
};

export const AgricultureChecklist = Template.bind({});
AgricultureChecklist.args = {
  links: data["en"]["state-industry-guidance"].data["agriculture"].pdf,
  language: "en",
  type: "Guidance",
  label: "More languages"
};

export const NullLinks = Template.bind({});
NullLinks.args = {
  links: null,
  language: "en",
  type: "Guidance",
  label: "More languages"
};

export const EmptyLinks = Template.bind({});
EmptyLinks.args = {
  links: [],
  language: "en",
  type: "Guidance",
  label: "More languages"
};

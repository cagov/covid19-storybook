import { WebComponent } from './storybook-web-component';

export default {
  title: 'Covid19/dropdown',
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
  decorators: []
};

const Template = (args) => WebComponent(args);

export const TestDropdown = Template.bind({});
TestDropdown.args = {
  primary: true,
  label: 'Dropdown',
  data: [
    {
      link: "#link1",
      language: "en",
      label: "Label 1"
    },
    {
      link: "#link2",
      language: "es",
      label: "Label 2"
    }
  ]
};

import { WebComponent } from "./storybook-web-component";
import { html } from "lit-html";
import { PlusIcon } from "./../../../arrow/plus-icon";
import { MinusIcon } from "./../../../arrow/minus-icon";
import './../src/index.scss';

export default {
  title: "Covid19/drawer",
  argTypes: {
    drawerLabel: { control: { type: "string" } },
    drawerContent: { control: { type: "string", disable: true } },
    drawers: { control: { type: "array", disable: true } },
    expanded: { control: { type: "boolean", disable: true } },
  },
  decorators: [],
};

const Template = (args) => WebComponent(args);

export const BasicDrawer = Template.bind({});
BasicDrawer.storyName = "Basic Drawer";
BasicDrawer.args = {
  expanded: false,
  drawerLabel:
    "Drawer content",
  drawerContent: html`<p>
      Influenza (flu) and COVID-19 are both contagious respiratory illnesses,
      but they’re caused by different viruses. COVID-19 is caused by a
      <a href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html#Basics"
        >new coronavirus (called SARS-CoV-2)</a
      >
    </p>`,
};

export const BasicDrawerOpen = Template.bind({});
BasicDrawerOpen.storyName = "Basic Drawer, open";
BasicDrawerOpen.args = {
  expanded: true,
  drawerLabel: "Open drawer",
  drawerContent: html`<p>Drawer content</p>`,
};


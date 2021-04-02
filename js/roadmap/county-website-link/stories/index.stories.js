import { buildCountyWebsiteLink as WebComponent } from './../src';
import { data } from "./../../scripts/auto-generated-data/data";

export default {
  title: 'Covid19/county-website-link',
};

const Template = (args) => WebComponent(args);

export const AlamedaCounty = Template.bind({});
AlamedaCounty.args = {
    linkLabel: `Check <span data-attribute="county"></span>’s COVID-19 website`,
    county: "Alameda County",
    defaultUrl: "../get-local-information",
    language: "en",
    countyWebpages: data["en"]["covid19-county-webpages"].data,
};

export const SanDiegoCounty = Template.bind({});
SanDiegoCounty.args = {
    linkLabel: `Check <span data-attribute="county"></span>’s COVID-19 website`,
    county: "San Diego County",
    defaultUrl: "../get-local-information",
    language: "en",
    countyWebpages: data["en"]["covid19-county-webpages"].data,
};

export const YoloCounty = Template.bind({});
YoloCounty.args = {
    linkLabel: `Check <span data-attribute="county"></span>’s COVID-19 website`,
    county: "Yolo County",
    defaultUrl: "../get-local-information",
    language: "en",
    countyWebpages: data["en"]["covid19-county-webpages"].data,
};


export const NoCounty = Template.bind({});
NoCounty.args = {
  linkLabel: `Check <span data-attribute="county"></span>’s COVID-19 website`,
    county: "",
    defaultUrl: "../get-local-information",
    language: "en",
    countyWebpages: data["en"]["covid19-county-webpages"].data,
};

export const NonExistentCountyData = Template.bind({});
NonExistentCountyData.args = {
    linkLabel: `Check <span data-attribute="county"></span>’s COVID-19 website`,
    county: "Rainbow County",
    defaultUrl: "../get-local-information",
    language: "en",
    countyWebpages: data["en"]["covid19-county-webpages"].data,
};

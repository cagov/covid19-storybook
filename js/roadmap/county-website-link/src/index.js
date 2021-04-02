import { replaceMarkupAttributeContent } from "./../../../common/replace-markup-attribute-content";

/**
 * Generate tier status display component.
 * @param {string} param.countyRestrictionsCountyWebsiteLabel - Label for county website link
 * @param {array} param.countyWebpages - Data set of COVID-19 County Webpages from ...
 * @param {string} param.county - Currently selected county.
 * @param {string} param.defaultUrl - Fallback url if link not found
 * @param {string} param.language - Language code for current display.
 * @return {string} HTML markup rendering link to COVID-19 County website
 */
export const buildCountyWebsiteLink = ({
  linkLabel = `Check <span data-attribute="county"></span>’s COVID-19 website`,
  countyWebpages = null,
  county = null,
  defaultUrl = "../get-local-information", // Might not need this
  language = "en"
}) => {

  let url = null;

  // Override default url with URL lookup for the county.
  if (county && countyWebpages) {
    url = lookupCountyWebsite({ county, countyWebpages });
  }

  // Replace string template selectors in markup with content.
  let label = replaceMarkupAttributeContent({
    markup: linkLabel,
    selector: "[data-attribute=county]",
    content: county,
  });

  let link = "";
  if (url !== null) {
    link = `<a href="${url}">${label}</a>.`;
  } else {
    
  }
  return link;
};

/**
 * Get the URL to the current county webpage
 * @param {array} param.countyWebpages - Data set of COVID-19 County Webpages from ...
 * @param {string} param.county - Currently selected county.
 *
 * 
 * For @example / test
    [{
      "id": "rec0729VPjP4XjcoM",
      "fields": {
          "id": "Lake",
          "county_label": "Lake County",
          "county_covid19_website": "http://health.co.lake.ca.us/Coronavirus/Businesses.htm",
          "county_department": "Lake County Public Health",
          "last_modified_time": "2020-12-24T00:17:00.000Z"
      },
      "createdTime": "2020-12-18T15:20:26.000Z"
    }],

 * @TODO make this return an error if the data source format changes.
 * @TODO add a test with mock data samples
 * @return {string} Url of the currently selected county webpage, or `null` if not found.
 */
const lookupCountyWebsite = ({ county = null, countyWebpages = null }) => {
  let result = null;
  if (countyWebpages !== null && county !== null) {
    let countyWebpage = countyWebpages.filter((page) => {
      // console.log("match", page.fields.id, county, page.fields.id === county );
      return page.fields.county_label === county;
    });
    if (
      countyWebpage !== undefined &&
      countyWebpage.length > 0 &&
      countyWebpage[0].fields !== undefined &&
      countyWebpage[0].fields.county_covid19_website !== undefined
    ) {
      result = countyWebpage[0].fields.county_covid19_website;
    }
  }
  return result;
};

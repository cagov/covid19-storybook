import { buildTierCard } from "./buildTierCard";
import { buildActivityCard } from "./buildActivityCard";
import { buildCountyWebsiteLink } from "./../../county-website-link/src";

/**
 * Output results of What's Open Search
 * return cardHtml
 * */

/**
 * Generate tier status display component.
 * // @TODO check these data types, they might be wrong.
 * @param {object} param
 * @param {string} param.selectedCounties - Definition
 * ... @TODO look up types & explain the data
 * @return {string} HTML markup rendering What's Open search results
 *
 * https://jsdoc.app/tags-param.html#parameters-with-properties
 */
export const cardTemplate = ({
  selectedCounties = null,
  selectedActivities = null,
  schoolsCanReopenList = null,
  schoolLabels = null,
  schoolReopeningStatuses = null,
  county = null,
  countyRegions = null,
  regionsclosed = null,
  tierStatusDescriptors = null,
  regionLabel = null,
  understandTheData = null,
  understandTheDataLink = null,
  countyRestrictionsAdvice = null,
  countyRestrictionsCountyWebsiteLabel = null,
  seeGuidanceText = null,
  selectedActivity = null,
  allActivities = null,
  countyWebpages = null,
  seeStateIndustryGuidanceLabel = null,
  primaryGuidanceLabel = null,
  secondaryGuidanceLabel = null,
  additionalGuidanceLabel = null,
  relatedGuidanceLabel = null,
  guidancePdfLabel = null,
  checklistPdfLabel = null,
  stateIndustryGuidanceData = null,
  hasActivityInput = null,
  hasCountyInput = null,
  policies = null,
}) => {
  console.log(
    "cardTemplate selectedCounties",
    selectedCounties,
    "selectedActivities",
    selectedActivities
  );
  console.log(
    "cardTemplate selectedCounties",
    selectedCounties.length,
    "selectedActivities",
    selectedActivities.length
  );
  let cards = [];

  if (selectedCounties.length > 0 && selectedActivities.length > 0) {
    // Some county selected
    // console.log("selectedCounties and activities", selectedCounties);

    selectedCounties.forEach((selectedCounty) => {
      console.log("county Select", selectedCounty);

      let card = buildCard({
        selectedCounty,
        selectedActivity,
        selectedActivities,
        allActivities,
        selectedCounties,
        schoolsCanReopenList,
        schoolLabels,
        schoolReopeningStatuses,
        county,
        countyRegions,
        regionsclosed,
        tierStatusDescriptors,
        regionLabel,
        understandTheData,
        understandTheDataLink,
        countyRestrictionsAdvice,
        countyWebpages,
        countyRestrictionsCountyWebsiteLabel,
        seeGuidanceText,
        seeStateIndustryGuidanceLabel,
        primaryGuidanceLabel,
        secondaryGuidanceLabel,
        additionalGuidanceLabel,
        relatedGuidanceLabel,
        guidancePdfLabel,
        checklistPdfLabel,
        stateIndustryGuidanceData,
        hasActivityInput,
        hasCountyInput,
        policies
      });
      cards.push(card);
    });
  } else if (selectedCounties.length > 0 && selectedActivities.length === 0) {
    // Some county selected
    // console.log("selectedCounties ", selectedCounties);

    selectedCounties.forEach((selectedCounty) => {
      // console.log("county Select", selectedCounty);

      let card = buildCard({
        selectedCounty,
        selectedActivity,
        selectedActivities,
        allActivities,
        selectedCounties,
        schoolsCanReopenList,
        schoolLabels,
        schoolReopeningStatuses,
        county,
        countyRegions,
        regionsclosed,
        tierStatusDescriptors,
        regionLabel,
        understandTheData,
        understandTheDataLink,
        countyRestrictionsAdvice,
        countyWebpages,
        countyRestrictionsCountyWebsiteLabel,
        seeGuidanceText,
        seeStateIndustryGuidanceLabel,
        primaryGuidanceLabel,
        secondaryGuidanceLabel,
        additionalGuidanceLabel,
        relatedGuidanceLabel,
        guidancePdfLabel,
        checklistPdfLabel,
        stateIndustryGuidanceData,
        hasActivityInput,
        hasCountyInput,
        policies
      });
      cards.push(card);
    });
  } else {

    // console.log("selectedActivities cardTemplate", selectedActivities);

    // No county selected
    selectedActivities.forEach((selectedActivity) => {
      let card = buildCard({
        selectedCounty: {
          county: ""
        },
        selectedActivity,
        selectedActivities,
        allActivities,
        selectedCounties,
        schoolsCanReopenList,
        schoolLabels,
        schoolReopeningStatuses,
        county,
        countyRegions,
        regionsclosed,
        tierStatusDescriptors,
        regionLabel,
        understandTheData,
        understandTheDataLink,
        countyRestrictionsAdvice,
        countyWebpages,
        countyRestrictionsCountyWebsiteLabel,
        seeGuidanceText,
        seeStateIndustryGuidanceLabel,
        primaryGuidanceLabel,
        secondaryGuidanceLabel,
        additionalGuidanceLabel,
        relatedGuidanceLabel,
        guidancePdfLabel,
        checklistPdfLabel,
        stateIndustryGuidanceData,
        hasActivityInput,
        hasCountyInput,
        policies
      });
      cards.push(card);
    });
  }
  return cards.join("");
};

const buildCard = ({
  selectedCounty = null,
  selectedActivity,
  county = null,

  hasActivityInput = false,
  hasCountyInput = false,
  selectedCounties = null,
  selectedActivities = null,
  allActivities = null,
  regionsclosed = null,
  countyRegions = null,
  tierStatusDescriptors = null,
  schoolsCanReopenList = null,
  schoolReopeningStatuses = null,
  countyWebpages = null,
  stateIndustryGuidanceData = null,
  policies,
  schoolLabels = null,
  regionLabel = null,
  understandTheData = null,
  understandTheDataLink = null,
  countyRestrictionsAdvice = null,
  countyRestrictionsCountyWebsiteLabel = null,
  seeGuidanceText = null,
  stayAtHomeOrder = `<p>Under <a href="/stay-home-except-for-essential-needs/#regional-stay-home-order">Regional Stay Home Order</a></p>`,
  seeStateIndustryGuidanceLabel = null,
  primaryGuidanceLabel = null,
  secondaryGuidanceLabel = null,
  additionalGuidanceLabel = null,
  relatedGuidanceLabel = null,
  guidancePdfLabel = null,
  checklistPdfLabel = null,
}) => {
  // Create link to county covid-19 website.
  let countyWebsiteLink = buildCountyWebsiteLink({
    linkLabel: countyRestrictionsCountyWebsiteLabel,
    countyWebpages,
    county: `${county} County`,
  });

  // Build the tier card.
  let tierCard = buildTierCard({
    // States
    county,
    selectedCounty,
    hasActivityInput,
    hasCountyInput,
    // Markup
    countyWebsiteLink,
    // Data
    tierStatusDescriptors,
    countyRegions,
    regionsclosed,
    policies,
    // Labels
    regionLabel,
    stayAtHomeOrder,
    understandTheData,
    understandTheDataLink,
    countyRestrictionsAdvice,
  });

  // Build the activity card.
  let activityCards = buildActivityCard({
    // States
    selectedActivity,
    selectedActivities,
    county,
    selectedCounty,
    hasActivityInput,
    hasCountyInput,
    // Data
    allActivities,
    stateIndustryGuidanceData,
    policies,
    regionsclosed,
    countyRegions,
    // Labels
    seeGuidanceText,
    schoolLabels,
    schoolsCanReopenList,
    seeStateIndustryGuidanceLabel,
    primaryGuidanceLabel,
    secondaryGuidanceLabel,
    guidancePdfLabel,
    checklistPdfLabel,
    additionalGuidanceLabel,
    relatedGuidanceLabel,
  });

  return `
    ${tierCard}
    ${activityCards}
  `;
};

import { buildSchoolsCanReopen } from "./buildSchoolsCanReopen";

export const buildTierRestrictionActivityDisplay = ({
  activityLabel = null,
  searchResultData = null,
  seeGuidanceText = null,
  county = null,
  selectedCounty = null,
  schoolLabels = null,
}) => {
  
  let schoolReopeningText = "";

  // Handle special templates for special content.
  if (activityLabel === "Schools") {
    schoolReopeningText = buildSchoolsCanReopen({ county, schoolLabels });
    return `<div class="card-activity">
    
    <h4>${activityLabel}</h4>

    <p>${schoolReopeningText}</p>

    <p></p>
  </div>`;
  } else {

    let tierModificationStatus = "";
    if (
      county !== null &&
      selectedCounty !== undefined &&
      selectedCounty !== null &&
      selectedCounty["Overall Status"] !== undefined
    ) {

      let statusMap = null;

      if (selectedCounty["Overall Status"] === "4") {
        statusMap = "4 - WIDESPREAD";
      } else if (selectedCounty["Overall Status"] === "3") {
        statusMap = "3 - SUBSTANTIAL";
      } else if (selectedCounty["Overall Status"] === "2") {
        statusMap = "2 - MODERATE";
      } else if (selectedCounty["Overall Status"] === "1") {
        statusMap = "1 - MINIMAL";
      }
      
      if (statusMap !== null) {
        tierModificationStatus = searchResultData[statusMap];
      }
    }

    return `<div class="card-activity">
    
    <h4>${activityLabel}</h4>

    <p>${tierModificationStatus}</p>

  </div>`;
  }
};

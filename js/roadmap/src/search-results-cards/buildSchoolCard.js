
import { buildSchoolsCanReopen } from "./buildSchoolsCanReopen";

export const buildSchoolCard = ({ 
  seeGuidanceText, 
  searchResultData,
  selectedCounty,
  schoolLabels
}) => {
  
    let schoolsDisplay = searchResultData["activity_search_autocomplete"] === "Schools"
        ? buildSchoolsCanReopen({ county: selectedCounty.county, schoolLabels })
        : ""
    return `
      <p class="school-card">
      ${schoolsDisplay}
      </p>
      `;
  };

  // Schools map?
  // `${replaceAllInMap(
  //   searchResultData["5"]
  // )}`
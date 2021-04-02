import { buildSchoolsCanReopen } from "./buildSchoolsCanReopen";

/**
 *
 * @param {*} param0
 * @return HTML markup
 */
export const buildSchoolActivityDisplay = ({
  activityLabel = null,
  searchResultData = null,
  selectedCounty = null,
  schoolLabels = null,
}) => {
  return `<div class="school-activity-display">
  <p>${
  activityLabel === "Schools"
    ? buildSchoolsCanReopen({
        county: selectedCounty.county,
        schoolLabels,
      })
    : searchResultData["RSHO"]
  }</p>
  </div>`;
};

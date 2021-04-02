import { replaceMarkupAttributeContent } from "./../../../common/replace-markup-attribute-content";
import { getMoreLanguages } from "./../../pdf-more-languages/src";
import "./../../drawer/src";
// import marked from "marked";


const marked = (data) => {
  return data;
}
/**
 * Generate interactive list of state industry guidance
 *
 * @param {string} param.activityLabel - Activity name (from autocomplete search)
 * @param {string} param.county - County name
 * @param {object} param.stateIndustryGuidanceData - Data source keyed by industy_category_key
 * @param {object} param.searchResultData - Matched result from autocomplete activity search
 * @param {string} param.seeStateIndustryGuidanceLabel - Label
 * @param {string} param.primaryGuidanceLabel - Label, with markup string replacement
 * @param {string} param.secondaryGuidanceLabel - Label, with markup string replacement
 * @param {string} param.guidancePdfLabel - Label, with markup string replacement
 * @param {string} param.checklistPdfLabel - Label, with markup string replacement
 * @param {string} param.additionalGuidanceLabel - Label
 * @param {string} param.relatedGuidanceLabel - Label
 * @param {string} param.resultType - "default" or "simple" - what layout for the results (used for embedding in different contexts)
 * @param {string} param.language - Language code, e.g. "en" or "es" or "zh-hant" (we have a table of codes in languages-keys csv file from Airtable)
 * @param {bool} param.expanded - If drawer should be open by default.
 */
export const buildStateIndustryGuidanceCard = ({
  activityLabel = null,
  county = null,
  stateIndustryGuidanceData = null,
  searchResultData = null,
  seeStateIndustryGuidanceLabel = "Get state industry guidance",
  primaryGuidanceLabel = `<span data-attribute="activityLabel"></span> must follow guidance for <span data-attribute="guidances"></span>.`,
  secondaryGuidanceLabel = `Secondary guidance label`,
  additionalGuidanceLabel = "",
  relatedGuidanceLabel = "Depending on your business operations, other guidance may apply",
  guidancePdfLabel = `Guidance for <span data-attribute="activityLabel"></span>`,
  checklistPdfLabel = `Checklist for <span data-attribute="activityLabel"></span>`,
  resultType = "default",
  language = "en",
  expanded = false,
}) => {
  try {
    if (resultType === "default") {
      let drawerContent = getAccordionContent({
        stateIndustryGuidanceData,
        activityLabel,
        searchResultData,
        language,
        primaryGuidanceLabel,
        secondaryGuidanceLabel,
        additionalGuidanceLabel,
        relatedGuidanceLabel,
        guidancePdfLabel,
        checklistPdfLabel,
      });
      return `    <cagov-drawer>
      <div class="card">
        <button
          class="card-header drawer-alpha"
          type="button"
          aria-expanded="${expanded}"
        >
          <div class="drawer-title">
            <h4>${seeStateIndustryGuidanceLabel}</h4>
          </div>
          <div class="plus-munus">
            <cagov-plus></cagov-plus><cagov-minus></cagov-minus>
          </div>
        </button>
        <div
          class="card-container"
          aria-hidden="${!expanded}"
          style="height: 0px;"
        >
          <div class="card-body">${drawerContent}</div>
        </div>
      </div>
    </cagov-drawer>
       `;
    } else if (resultType === "simple") {
      // Example: for industry guidance display
      return `<div class="state-guidance">
        </div>`;
    }
  } catch (error) {
    console.error("Error rendering buildStateIndustryGuidanceCard", error);
  }

  return ``;
};

/**
 *
 * @param {object} param.stateIndustryGuidanceData - All state industry guidance
 */
const getAccordionContent = ({
  stateIndustryGuidanceData,
  activityLabel,
  searchResultData,
  language = "en",
  primaryGuidanceLabel = null,
  secondaryGuidanceLabel = null,
  additionalGuidanceLabel = null,
  relatedGuidanceLabel = null,
  guidancePdfLabel = null,
  checklistPdfLabel = null,
}) => {
  // Get primary guidance list
  let primaryGuidance = getPrimaryGuidance({
    activityLabel,
    searchResultData,
    data: stateIndustryGuidanceData,
    guidances: getGuidanceData({ searchResultData, field: "primary_guidance" }),
    language,
    label: primaryGuidanceLabel,
    labelGuidance: guidancePdfLabel,
    labelChecklist: checklistPdfLabel,
    additionalGuidanceLabel,
  });

  // Get secondary guidance list
  let secondaryGuidance = getSecondaryGuidance({
    searchResultData,
    data: stateIndustryGuidanceData,
    guidances: getGuidanceData({
      searchResultData,
      field: "secondary_guidance",
    }),
    language,
    label: secondaryGuidanceLabel,
    labelGuidance: guidancePdfLabel,
    labelChecklist: checklistPdfLabel,
    additionalGuidanceLabel,
  });

  // Get related guidance list
  let relatedGuidance = getRelatedGuidance({
    data: stateIndustryGuidanceData,
    guidances: getGuidanceData({ searchResultData, field: "related_guidance" }),
    searchResultData,
    language,
    labelGuidance: guidancePdfLabel,
    labelChecklist: checklistPdfLabel,
    label: relatedGuidanceLabel,
    additionalGuidanceLabel,
  });

  return `<div class="state-guidance-content">
    <div class="primary-guidance">${primaryGuidance}</div>
    <div class="secondary-guidance">${secondaryGuidance}</div>
    <div class="related-guidance">${relatedGuidance}</div>
  </div>`;
};

const getGuidanceData = ({ searchResultData, field }) => {
  try {
    let guidances = searchResultData[field].split(",");

    guidances = guidances.map((item) => item.trim());
    let currentGuidanceInList = false;
    if (guidances.includes(searchResultData.activity_reference_key)) {
      currentGuidanceInList = true;
    }
    if (currentGuidanceInList === true && guidances.length > 1) {
      // Move current guidance to the top of the list of sets of guidances if it matches the currently selected key.
      let firstGuidance = searchResultData.activity_reference_key;
      guidances = guidances.sort(function (x, y) {
        return x == firstGuidance ? -1 : y == firstGuidance ? 1 : 0;
      });
      return guidances;
    } else {
      return guidances;
    }
  } catch (error) {
    console.error(`Could not build guidance data for ${field}`, error);
  }
  return null;
};

/**
 * Build list of applicable guidances as string.
 *
 * @param {object} param.data
 * @param {object} param.guidance
 * @param {object} param.language
 * @param {object} param.label
 * @param {object} param.template
 */
const getListGuidances = ({
  data = null,
  guidance = null,
  searchResultData = null,
  language = "en",
  label = null,
  template = `<span><span data-attribute="guidances"></span></span>`,
}) => {
  try {
    if (
      data !== undefined &&
      data !== null &&
      searchResultData !== undefined &&
      searchResultData !== null &&
      guidance !== null
    ) {
      let results = [];

      let guidances = guidance.split(",");
      guidances.map((guidance_key) => {
        let lookupGuidance = data[guidance_key.trim()]; // Remove extra space added by comma separated split function
        if (lookupGuidance !== undefined && lookupGuidance !== null) {
          results.push(
            `<span class="guidance">${lookupGuidance.industry_category_label}</span>`
          );
        }
      });
      let concatenatedString = results.join(", "); // @TODO adjustments for language display.
      let markup = replaceMarkupAttributeContent({
        markup: template,
        selector: "[data-attribute=guidances]",
        content: concatenatedString,
      });

      return markup;
    }
  } catch (error) {
    console.error("Error in get list of guidance as string", error);
  }
  return "";
};

/**
 *
 * @param {object} param.data - Set of PDF Links
 */
const getPrimaryGuidance = ({
  data = null,
  searchResultData = null,
  language = "en",
  guidances = null,
  labelGuidance = null,
  labelChecklist = null,
  label = null,
  activityLabel = null,
  additionalGuidanceLabel
}) => {

  try {
    if (
      data !== undefined &&
      data !== null &&
      searchResultData !== undefined &&
      searchResultData !== null &&
      guidances !== undefined &&
      guidances !== null
    ) {
      let results = [];

      guidances.map((guidance_key, index) => {
        let currentGuidance = data[guidance_key.trim()];

        if (currentGuidance !== undefined && currentGuidance !== null) {
          // Generate messaging strings.
          let optionalMessage = getOptionalPrimaryGuidanceMessage({
            currentGuidance,
          });

          // Create a list of applicable guidance categories.
          let defaultGuidancesToFollow = getListGuidances({
            guidance: searchResultData.primary_guidance,
            data,
            searchResultData,
            language: "en",
            template: `<span><span data-attribute="guidances"></span></span>`,
          });

          // Perform replacements to selector data.
          let guidanceMessage = "";
          guidanceMessage = replaceMarkupAttributeContent({
            markup: label,
            selector: "[data-attribute=activityLabel]",
            content: activityLabel,
          });
          //  Perform replacement again with additional attribute.
          guidanceMessage = replaceMarkupAttributeContent({
            markup: guidanceMessage,
            selector: "[data-attribute=guidances]",
            content: defaultGuidancesToFollow.toLowerCase(),
          });

          let currentGuidanceLabel =
            searchResultData.activity_search_autocomplete;

          if (index > 0) {
            currentGuidanceLabel = currentGuidance.industry_category_label;
          }

          /**
          Decide what kind of message to display about this guidance.
          * If primary guidance has an overridden message, display that message for the first item if that guidance matches the current guidance.
          * IF no optional message found, AND the search result has more than one different guidance, display a special message listing out the relevant guidances, using a label template.
          * NOTE: the activity_reference_key should be automatically placed first in the list, even if it's not entered that way in Airtable. For other ordered results, it will defer to the order listed in Airtable results.
          * */
          let currentMessage = "";

          if (
            currentGuidance.industry_category_label ===
            searchResultData.activity_search_autocomplete
          ) {
            if (index === 0) {
              if (optionalMessage) {
                currentMessage = optionalMessage;
              }
            }
          }

          if (index === 0 && optionalMessage) {
            // Always display the optional message for the first result if it is available.
            currentMessage = optionalMessage;
          } else if (
            index === 0 &&
            !optionalMessage &&
            (currentGuidance.industry_category_label !==
              searchResultData.activity_search_autocomplete ||
              guidances.length > 1)
          ) {
            currentMessage = guidanceMessage;
          }

          // Create specially labelled links for main guidance types (guidance and checklist), featuring the currently selected guidance file.
          let guidanceListLink = getGuidanceLink({
            currentGuidance,
            label: labelGuidance,
            type: "Guidance",
            language,
          });

          let checklistListLink = getGuidanceLink({
            currentGuidance,
            label: labelChecklist,
            type: "Checklist",
            language,
          });

          // Get additional guidance
          let additionalGuidance = getAdditionalGuidance({
            data,
            searchResultData,
            guidance: currentGuidance,
            language,
            label: additionalGuidanceLabel,
          });

          // Build html markup for the primary guidance section of the guidance results.
          results.push(`
            <h3>${currentGuidanceLabel}</h3>
            ${currentMessage}
            ${guidanceListLink}
            ${checklistListLink}
            ${additionalGuidance}
          `);
        }
        return false;
      });
      // console.log("results", results);
      return results.join("");
    }
  } catch (error) {
    console.error("Error in getPrimaryGuidance", error);
  }
  return "";
};

/**
 *
 * @param {object} param.data - Set of PDF Links
 */
const getSecondaryGuidance = ({
  data = null,
  searchResultData = null,
  language = "en",
  guidances = null,
  labelGuidance = null,
  labelChecklist = null,
  label = null,
  additionalGuidanceLabel
}) => {
  try {
    if (
      data !== undefined &&
      data !== null &&
      searchResultData !== undefined &&
      searchResultData !== null &&
      guidances !== undefined &&
      guidances !== null
    ) {
      let results = [];
      guidances.map((guidance_key, index) => {
        let currentGuidance = data[guidance_key.trim()];

        if (currentGuidance !== undefined && currentGuidance !== null) {
          let guidanceListLink = getGuidanceLink({
            currentGuidance,
            label: labelGuidance,
            type: "Guidance",
            language,
          });

          let checklistListLink = getGuidanceLink({
            currentGuidance,
            label: labelChecklist,
            type: "Checklist",
            language,
          });

          // Get additional guidance
          let additionalGuidance = '';
          if (currentGuidance.industry_category_label !== searchResultData.activity_search_autocomplete) {
            additionalGuidance = getAdditionalGuidance({
              data,
              searchResultData,
              guidance: currentGuidance,
              language,
              label: additionalGuidanceLabel,
            });
          }

          // if (guidanceListLink !== "" && checklistListLink !== "") {
          results.push(`
            ${index === 0 ? `<h4>${label}</h4>` : ""}
            <strong>${currentGuidance.industry_category_label}</strong>
            ${guidanceListLink}<br />
            ${checklistListLink}<br />
            ${additionalGuidance}
          `);
          // }
        }
        return false;
      });
      // console.log("results", results);
      return results.join("");
    }
  } catch (error) {
    console.error("Error in getPrimaryGuidance", error);
  }
  return "";
};

/**
 *
 * @param {object} param.data - Set of PDF Links
 */
const getRelatedGuidance = ({
  data = null,
  searchResultData = null,
  language = "en",
  guidances = null,
  labelGuidance = null,
  labelChecklist = null,
  label = null,
  additionalGuidanceLabel
}) => {
  try {
    if (
      data !== undefined &&
      data !== null &&
      searchResultData !== undefined &&
      searchResultData !== null &&
      guidances !== undefined &&
      guidances !== null
    ) {
      let results = [];

      guidances.map((guidance_key, index) => {
        let currentGuidance = data[guidance_key.trim()];

        if (currentGuidance !== undefined && currentGuidance !== null) {
          let optionalMessage = getOptionalPrimaryGuidanceMessage({
            currentGuidance,
          });

          let guidanceListLink = getGuidanceLink({
            currentGuidance,
            label: labelGuidance,
            type: "Guidance",
            language: "en",
          });

          let checklistListLink = getGuidanceLink({
            currentGuidance,
            label: labelChecklist,
            type: "Checklist",
            language: "en",
          });

          // Get additional guidance
          let additionalGuidance = '';
          if (currentGuidance.industry_category_label !== searchResultData.activity_search_autocomplete) {
          additionalGuidance = getAdditionalGuidance({
            data,
            searchResultData,
            guidance: currentGuidance,
            language,
            label: additionalGuidanceLabel,
          });
        }

          results.push(`
          ${index === 0 ? `<h4>${label}</h4>` : ""}
          <strong>${currentGuidance.industry_category_label}</strong>
          ${guidanceListLink}<br />
          ${checklistListLink}<br />
          ${additionalGuidance}
          `);
        }
        return false;
      });
      // console.log("results", results);
      return results.join("");
    }
  } catch (error) {
    console.error("Error in getPrimaryGuidance", error);
  }
  return "";
};

/**
 *
 * @param {object} param.data - Set of PDF Links
 */
const getAdditionalGuidance = ({
  data = null,
  searchResultData = null,
  language = "en",
  label = null,
  guidance = null
}) => {
  try {
    if (
      guidance !== undefined &&
      guidance !== null
    ) {
      let results = [];
        let currentGuidance = guidance;
        if (
          currentGuidance !== undefined &&
          currentGuidance !== null &&
          currentGuidance.additional_resources !== undefined &&
          currentGuidance.additional_resources !== null &&
          currentGuidance.additional_resources.length > 0
        ) {

          let sortedLinks = currentGuidance.additional_resources.sort((a, b) =>
            Number(a.order) > Number(b.order) ? 1 : -1
          );

          sortedLinks.map((resource) => {
            if (resource.message !== null && resource.message !== "") {
              results.push(`<div class="guidance-link guidance-link-additional" data-updated="${
                resource.date_last_modified
              }">${marked(resource.message)}
            </div>`);
            } else if (resource.url) {
              results.push(`<div class="guidance-link guidance-link-additional" data-updated="${resource.date_last_modified}">
              <a href="${resource.url}">${resource.file_title}</a>
            </div>`);
            }
          });
        }
 
      return `
        ${results.length > 0 ? label : ""}
        ${results.join("")}
      `;
    }
  
  } catch (error) {
    console.error("Error in getAdditionalGuidance", error);
  }
  return "";
};

/**
 * Get optional message from metadata for currently selected guidance.
 * @param {*} param.currentGuidance - Data object for currently selected guidance.
 */
const getOptionalPrimaryGuidanceMessage = ({ currentGuidance }) => {
  if (
    currentGuidance.metadata !== undefined &&
    currentGuidance.metadata !== null &&
    currentGuidance.metadata[0] !== undefined &&
    currentGuidance.metadata[0] !== null
  ) {
    if (currentGuidance.metadata[0].optional_message !== undefined) {
      return marked(currentGuidance.metadata[0].optional_message);
    }
  }
  return "";
};

const getGuidanceLink = ({
  currentGuidance,
  label,
  type = null,
  language = "en",
}) => {
  let resourceLink = currentGuidance.pdf.filter((resource) => {
    if (
      resource.language_code === language &&
      resource.git_pdf_template_type === type
    ) {
      return true;
    }
    return false;
  });

  let link = "";
  if (resourceLink !== undefined && resourceLink.length > 0) {
    let linkLabel = replaceMarkupAttributeContent({
      markup: label,
      selector: "[data-attribute=activityLabel]",
      content: resourceLink[0].industry_category_label,
    });

    let moreLanguages = getMoreLanguages({
      links: currentGuidance.pdf,
      language: language,
      type: type,
    });
    if (resourceLink[0].permalink) {
      link = `<div class="guidance-link" data-updated="${resourceLink[0].git_date_updated}">
      <a href="${resourceLink[0].permalink}">${linkLabel}</a> ${moreLanguages}
      </div>`;
    } else {
      link = `<div class="guidance-link">Not found</div>`;
    }
  }
  return link;
};

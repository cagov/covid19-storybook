/**
 * Generate tier status display component.
 *
 * @param {object} param - Data object passed to build tier display card.
 * @param {array} param.tierStatusDescriptors - Status descriptions and labels. 
    "County tier": "Minimal",
    "colorLabel": "Yellow",
    "_Color label": "Yellow",
    "New cases": "Less than 1.0",
    "Positive tests": "Less than 2.0%",
    "description": "Most indoor business operations are open with modifications",
    "Positive-heq": "Less than 2.2%"
 * 
 * @param {object} param.selectedCounty - Data about currently selected county (@TODO look up props) - comes from countyRegions (or status?) table data - we need a pattern to reference table data in WP from here e.g.  ?? no "Contra Costa": "Bay Area",
 * @param {array} param.countyRegions - Dataset (@TODO of what)
 * @param {array} param.regionLabel - Text label (@TODO for what?)
 * @param {array} param.regionsclosed - Data set of closed RSHO* (@TODO Confirm) regions
 * @param {string} param.countyRestrictionsCountyWebsiteLabel - Text label
 * @param {string} param.stayAtHomeOrder - Text label
 * @param {string} param.understandTheData - Text label
 * @param {string} param.understandTheDataLink - Url
 * @param {string} param.countyRestrictionsAdvice - Text label
 * @param {array} param.countyWebpages - Dataset of COVID-19 county webpages
 * // @TODO show example of nested expected value for input (or move up a level & document it another way)
 * @param {string} param.county - Definition
 * @return {string} HTML markup rendering What's Open tier status card.
 *
 * https://jsdoc.app/tags-param.html#parameters-with-properties
 */
export const buildTierCard = ({
  tierStatusDescriptors = null,
  selectedCounty = null,
  countyRegions = null,
  regionLabel = null,
  regionsclosed = null,
  stayAtHomeOrder = null,
  understandTheData = null,
  understandTheDataLink = "#county-status",
  countyRestrictionsAdvice = null,
  county = null,
  countyWebsiteLink = null,
  hasActivityInput = false,
  hasCountyInput = false,
  policies = null,
}) => {
  let countyTierData = null;
  let countyTierDescription = null;
  let tierStatus = null;
  let isUnderRSHO = false;
  // console.log("tier card selectedCounty", selectedCounty.county, selectedCounty);

  try {
    if (policies !== null) {
      if (policies.isUnderRSHO !== undefined) {
        isUnderRSHO == policies.isUnderRSHO;
      }
    }

    // @TODO the colors are flipped, we will try to flip them back this time to match what's in Snowflake
    if (hasCountyInput === true) {
      // @TODO the status descriptors are probably flipped
      tierStatus = selectedCounty["Overall Status"];
      countyTierData = getCountyTier({
        tierStatusDescriptors,
        tierStatus,
        selectedCounty
      });

      return `<div class="card-county">
          ${hasCountyInput === true ? `<h2>${selectedCounty.county}</h2>` : ""}
        
          ${
            countyRegions
              ? `<h3>${regionLabel} ${
                  countyRegions[selectedCounty.county]
                }</h3>`
              : ""
          }
    
          ${isUnderRSHO === true ? stayAtHomeOrder : ""}

          ${
            tierStatus !== null
              ? `<div class="county-color-${tierStatus}">
                  ${
                    countyTierData.countyTier !== null
                      ? `<div class="pill">${countyTierData.countyTier}</div>`
                      : ""
                  }
                  ${
                    countyTierData.countyTierDescription !== null
                      ? `<p>
                      ${countyTierData.countyTierDescription}. <a href="${understandTheDataLink}">${understandTheData}</a></p>`
                      : ""
                  }
                </div>`
              : null
          }
          
          <p>
              ${countyRestrictionsAdvice} ${countyWebsiteLink}
          </p>
      </div>`;
    } else {
      // No Tier Status
      return `<div class="card-county">
      </div>`;
    }
  } catch (error) {
    console.error("Error rendering tier card", error);
  }
  return ``;
};

const getCountyTier = ({ tierStatusDescriptors = null, tierStatus = null, selectedCounty = null }) => {
  try {
    let countyTier = "";
    let countyTierDescription = "";

    if (tierStatusDescriptors !== null && tierStatus !== null) {
      let currentStatus = parseInt(selectedCounty["Overall Status"]) - 1;
      if (tierStatusDescriptors[currentStatus] !== undefined) {
        countyTier = tierStatusDescriptors[currentStatus]["County tier"];
        countyTierDescription =
          tierStatusDescriptors[currentStatus].description;
        return {
          countyTier,
          countyTierDescription,
        };
      }
    }
  } catch (error) {
    console.error("Error getCountyTier", error);
    return null;
  }
};

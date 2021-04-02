const fetch = require("node-fetch");
const fs = require("fs");

// Location of docs templates.

const docsPath = "./js/roadmap/scripts/auto-generated-data/api-templates/";


// Write folder for JSON output
const dataPath =
  "./js/roadmap/scripts/auto-generated-data";


/**
 * Build `covid19-state-industry-guidance.json` using source data from Airtable bases.
 * Airtable base names and other environment variables are set in .env file.
 * @param {string} language - Pass in language key object to generate a subset of data by language value.
 */
const buildStateGuidanceJSON = ({language = null}) => {
  try {
    // Load api template
    
    // Up to date metadata comes from our covid19.ca.gov data documentation content.  
    // console.log(docsPath);
    // console.log(dataPath);

    let apiDoc = JSON.parse(
      fs.readFileSync(`${docsPath}/covid19-state-industry-guidance.api.json`)
    );
    // Load industry category data pulled from Airtable.
    let categories = JSON.parse(
      fs.readFileSync(
        `${dataPath}/json/data-covid19-industry-guidance-categories.json`,
        "utf8"
      )
    );
    // Load metadata about related state industry guidance.
    let metadata = JSON.parse(
      fs.readFileSync(
        `${dataPath}/json/data-covid19-related-guidance-metadata.json`,
        "utf8"
      )
    );
    // Load all published pdf links to related state industry guidance.
    let pdfLinks = JSON.parse(
      fs.readFileSync(
        `${dataPath}/json/data-covid19-industry-guidance-pdf-links.json`,
        "utf8"
      )
    );
    // Load additional links and messaging about related state industry guidance.
    let additionalResources = JSON.parse(
      fs.readFileSync(
        `${dataPath}/json/data-covid19-industry-guidance-additional-resources.json`,
        "utf8"
      )
    );
    // Get current language keys
    let languageKeys = JSON.parse(
      fs.readFileSync(
        `${dataPath}/json/data-covid19-language-keys.json`,
        "utf8"
      )
    );

    // Create output data object.
    let data = {};

    // Get the date to display in the "date_updated" field. Used to visually check last update for files loaded from covid-static github static file server.
    const utcDate = getDate();

    // Get the language item, if language key was set.
    let languageItem = language !== null ? languageKeys.data.filter((languageKeysItem) => languageKeysItem.language === language) : null;

    // Get the key code for the language.
    let languageKey = languageItem !== null && languageItem[0] !== undefined ? languageItem[0] : null;

    // For each industry guidance category build sets of related links.
    categories.data.map((item) => {
      if (language === null) {
        // Look up category data
        let category = item["industry_category_key"];
        // Get metadata for category
        let categoryMetadata = metadata.data.filter(
          (dataItem) => dataItem["industry_category_key"] === category
        );
        // Get pdf links associated with this category
        let categoryPdfLinks = pdfLinks.data.filter(
          (dataItem) => dataItem["industry_category_key"] === category
        );
        // Get additional resources associated with this category
        let categoryAdditionalResources = additionalResources.data.filter(
          (dataItem) => dataItem["industry_category_key"] === category
        ); // @TODO sort 1 is at the top, 10 below.

        // Build data object for this category.
        data[category] = {
          industry_category_label: item.industry_category_label,
          language: item.language,
          metadata:
            categoryMetadata !== null && categoryMetadata[0] !== undefined
              ? categoryMetadata
              : "",
          pdf: categoryPdfLinks,
          additional_resources: categoryAdditionalResources,
        };
      } else if (language !== null) {
        // Filter for language
        // Look up category data
        let category = item["industry_category_key"];
        // Get metadata for category
        let categoryMetadata = metadata.data.filter(
          (dataItem) => dataItem["industry_category_key"] === category && dataItem["language"] === language
        );
        // Get pdf links associated with this category
        let categoryPdfLinks = pdfLinks.data.filter(
          (dataItem) => dataItem["industry_category_key"] === category && dataItem["language"] === language
        );
        // Get additional resources associated with this category
        let categoryAdditionalResources = additionalResources.data.filter(
          (dataItem) => dataItem["industry_category_key"] === category && dataItem["language"] === language
        ); // @TODO sort 1 is at the top, 10 below.

        // Build data object for this category.
        data[category] = {
          industry_category_label: item.industry_category_label,
          language: item.language,
          metadata:
            categoryMetadata !== null && categoryMetadata[0] !== undefined
              ? categoryMetadata
              : "",
          pdf: categoryPdfLinks,
          additional_resources: categoryAdditionalResources,
        };
      }
    });

    // Construct api data object.
    let apiData = {
      docs: apiDoc,
      total: Object.keys(data).length,
      date_updated: utcDate,
      data: data,
    };
    
    // If language key is set, write a file based on language settings.
    if (language !== null && languageKey !== null) {
      // Update the docs language value
      apiData.docs["Language"] = language;
      fs.writeFile(
        `${dataPath}/json/data-covid19-state-industry-guidance.${languageKey.code}.json`,
        JSON.stringify(apiData),
        function (err) {
          if (err) return console.log(err);
          console.log(`Updated: data-covid19-state-industry-guidance.${languageKey.code}.json`);
        }
      );
    } else {
      apiData.docs["Language"] = "Multiple Languages";
      fs.writeFile(
        `${dataPath}/json/data-covid19-state-industry-guidance.json`,
        JSON.stringify(apiData),
        function (err) {
          if (err) return console.log(err);
          console.log(`Updated: data-covid19-state-industry-guidance.json`);
        }
      );
    }
  } catch (error) {
    console.error("Error building State Industry Guidance data.", error);
  }
};

const getDate = () => {
  // Get date updated.
  var date = new Date();
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return new Date(now_utc);
};

/**
 * Run the script
 */
buildStateGuidanceJSON({language: null});

buildStateGuidanceJSON({language: "English"});
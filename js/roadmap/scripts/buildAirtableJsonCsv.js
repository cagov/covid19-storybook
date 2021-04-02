const fetch = require("node-fetch");
const fs = require("fs");
const { Parser } = require("json2csv");
const Airtable = require("airtable");

let KEYCHAIN = process.env || secret;

// Local Script for Node.JS
// To run: `npm run update:data`

/** Set up Airtable 
 * .env/.env.local or .env/.env.production
 * e.g.
AIRTABLE_API_KEY=the_api_key_from_your_airtable_account
AIRTABLE_BASE_ID=the_app_id_for_base
 * 
 * 
**/
Airtable.configure({
  apiKey: KEYCHAIN["AIRTABLE_API_KEY"],
});
const base = Airtable.base(KEYCHAIN["AIRTABLE_BASE_ID"]); // Check Airtable API documention when logged into Airtable under "Account" and go to "Airtable API" & look up more information about your base.
const VIEW_NAME = KEYCHAIN["AIRTABLE_VIEW_NAME"]; // Manually set in the base to match this config. The default is

const docsPath = "./js/roadmap/scripts/auto-generated-data/api-templates/";


// Write folder for JSON output
const dataPath =
  "./js/roadmap/scripts/auto-generated-data";



// Developer NOTES:
// Estimated total size: 500KB (JSON from Airtable)
// https://flaviocopes.com/airtable/
// https://nocodeapi.com/airtable-api
// @TODO take JSON data for records & store as a CSV file too for backup and storing on Wordpress
// @TODO add prettier formatter to API data
// Endpoints. Keys are the table names.
// NOTE: Airtable configured to have machine readable table names. If names are user-friendly, you will need the string with escaped spaces as the keys.
// We created several Airtable bases & exported read-only API views to a separate "api-only" Airtable account.
// We re-wrote the field names in the API to be machine-friendly.
// Airtable API does not return values if fields are empty (to save space), but we want null values for all fields for consistency. The map & docs will need to be updated if fields or api version are changed.
// Airtable's npm package contains an .all() response which seems to not trigger rate limit issues & returns all data responses.
// Airtable does not provide an API function to get CSV data, so we generate a CSV here to store in our public github. A similar script could be run in a non-public backup environment for other data backups.

// In this configuration, all of our fields have a "language" field & this will be used to generate multilingual API data.
// Translations get written to a special endpoint & will be migrated into Airtable itself as new translation data records when available.

// Settings for exported JSON & CSV data.
let endpoints = {
  "covid19-activity-business-search-data": {
    docs: `${docsPath}covid19-activity-business-search-data.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-activity-business-search-data",
    fields: {
      activity_reference_key: "",
      activity_search_autocomplete: "",
      override_industry_guidance_label: "",
      activity_key: "",
      "4 - WIDESPREAD": "",
      "3 - SUBSTANTIAL": "",
      "2 - MODERATE": "",
      "1 - MINIMAL": "",
      RSHO: "",
      last_modified: "",
      primary_guidance: "",
      secondary_guidance: "",
      related_guidance: "",
    },
    viewName: "API", // Not currently used in this script, but this script could be altered to use specific viewNames for further selecting or filtering data.
  },
  "covid19-activity-business-search-data-language": {
    docs: `${docsPath}covid19-activity-business-search-data-language.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/Lang%20test%3A%20API-Active%20Activity%20%26%20Business%20Search%20Data?viewName=en",
    fields: {
      activity_reference_key: "",
      activity_search_autocomplete: "",
      override_industry_guidance_label: "",
      activity_key: "",
      "4 - WIDESPREAD": "",
      "3 - SUBSTANTIAL": "",
      "2 - MODERATE": "",
      "1 - MINIMAL": "",
      RSHO: "",
      last_modified: "",
      primary_guidance: "",
      secondary_guidance: "",
      related_guidance: "",
      language_code: "",
      language: "",
    },
    views: ["en", "es", "ko", "tl", "vi", "ar", "zh-hant", "zh-hans"], // Not currently used in this script, but this script could be altered to use specific viewNames for further selecting or filtering data.
  },
  "covid19-industry-guidance-pdf-links": {
    docs: `${docsPath}covid19-industry-guidance-pdf-links.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-industry-guidance-pdf-links",
    fields: {
      id: "",
      filename: "",
      git_pdf_template_type: "",
      industry_category_key: "",
      language: "",
      summary_of_changes: "",
      pdf_publication_date: "",
      accessibility_links: "",
      permalink: "",
      git_date_updated: "",
      language_code: "",
      industry_category_label: "",
    },
    viewName: "API",
  },
  "covid19-related-guidance-metadata": {
    docs: `${docsPath}covid19-related-guidance-metadata.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-related-guidance-metadata",
    fields: {
      industry_category_key: "",
      date_last_modified: "",
      language: "",
      language_code: "",
      optional_message: "",
      safer_economy_label: "",
      
    },
    viewName: "API",
  },
  "covid19-industry-guidance-categories": {
    docs: `${docsPath}covid19-industry-guidance-categories.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-industry-guidance-categories",
    fields: {
      industry_category_key: "",
      industry_category_label: "",
      date_last_modified: "",
      language: "",
      language_code: "",
    },
    viewName: "API",
  },
  "covid19-industry-guidance-additional-resources": {
    docs: `${docsPath}covid19-industry-guidance-additional-resources.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-industry-guidance-additional-resources",
    fields: {
      id: "",
      industry_category_key: "",
      url: "",
      message: "",
      type: "",
      file_title: "",
      order: "",
      date_last_modified: "",
      language: "",
      language_code: "",
    },
    viewName: "API",
  },
  "covid19-county-webpages": {
    docs: `${docsPath}covid19-county-webpages.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-county-webpages",
    fields: {
      key: "",
      label: "",
      url_county_covid19: "",
      county_department: "",
      last_modified_time: "",
      language_code: "",
    },
    viewName: "API",
  },
  "covid19-language-keys": {
    docs: `${docsPath}covid19-language-keys.api.json`,
    endpoint:
      "https://api.airtable.com/v0/appwpIGqyvG6bl73j/covid19-language-keys",
    fields: {
      id: "",
      language: "",
      code: "",
      key: "",
      alternative_codes: "",
    },
    viewName: "API",
  },
};

/**
 * Read data for each Airtable table endpoint & build JSON & CSV data.
 */
const buildData = async () => {
  await Object.keys(endpoints).map((endpoint) => {
    // Endpoint is table, but not called table here so as to not conflict with Airtable's API interface namespace.
    // Set table
    const table = base(endpoint);


    // Get all records.
    const records = table
      .select({
        view: VIEW_NAME,
      })
      .all();

    // Format the response.
    records.then((response) => {
      let fieldsData = formatResponse({
        data: response,
        endpoint: endpoint,
        saveCSV: true,
      });

      // Aggregate response with docs & data to be a simple static "API" file for utility datasets & aggregates of multiple data sources.
      let formattedApiResponse = formatApi({
        docs: endpoints[endpoint].docs, // We have docs templates that need to be kept up to date. Templates can be edited in github in `docsPath` folder.
        data: fieldsData,
      });

      // Write file as JSON
      if (formattedApiResponse !== null) {
        fs.writeFile(
          `${dataPath}/json/data-${endpoint}.json`,
          formattedApiResponse,
          function (err) {
            if (err) return console.log(err);
            console.log(`saved: ${endpoint}.json`);
          }
        );
      }
    });
    // }
  });
};

/**
 * Return only the field data from Airtable
 * If record ids are desired for tracing data back, that the data formatter can be updated.
 * This api has docs from a docs template & updated data sources.
 */
const formatResponse = ({ data = null, endpoint = null, saveCSV = true }) => {
  if (data !== undefined && data !== null && endpoint !== null) {
    let formattedData = data.map((item) => {
      // Get the map of fields that we want to return.
      let returnedFields = endpoints[endpoint].fields;

      // Build new fields data object.
      let fields = {};
      Object.keys(returnedFields).map((fieldName) => {
        fields[fieldName] =
          item.fields[fieldName] !== undefined ? item.fields[fieldName] : "";
      });
      return fields;
    });

    // Save this raw data as CSV.
    if (saveCSV === true) {
      saveAsCsv(formattedData, endpoint);
    }
    return formattedData;
  }
  return null;
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
 * Format simple API from each Airtable dataset, only retrieving the fields.
 */
const formatApi = ({ data, docs }) => {
  try {
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
    const utcDate = getDate();

    // Load docs template.
    let docsData = fs.readFileSync(docs, "utf8");
    return JSON.stringify({
      docs: JSON.parse(docsData),
      data: data,
      total: data.length,
      date_updated: utcDate,
    });
  } catch (error) {
    console.error(error);
  }
};
/**
 * Write parsed CSV data (from fields value returned from Airtable) to CSV file.
 * @param {*} fieldData
 * @param {*} endpoint
 */
const saveAsCsv = (fieldData, endpoint) => {
  try {
    let opts = Object.keys(endpoints[endpoint].fields);
    const parser = new Parser(opts);
    const csv = parser.parse(fieldData);
    fs.writeFile(`${dataPath}/csv/data-${endpoint}.csv`, csv, function (err) {
      if (err) return console.log(err);
      console.log(`Saved CSV file: ${endpoint}.csv`);
    });
  } catch (err) {
    console.error("ERROR writing CSV file", err);
  }
};

// How to use:
// For each activity-business-search-data record
// For each primary_guidance and secondary_guidance
//  Use key value
// For each primary guidance & secondary guidance, get state-industry-guidance key (comma separated) & build results.
// state-industry-guidance
// For each industry-category  covid19-industry-guidance-categories
// key: industry_category_key // @TODO could this be industry_category_key?
// language
// label
// guidance_metadata  covid19-related-guidance-metadata
// get industry_category_key
// language
// guidance_pdf_links covid19-industry-guidance-pdf-links
// industry_category_key
// language
// guidance_additional_resources // covid19-industry-guidance-additional-resources
// industry_category_key // @TODO could this be industry_category_key?
// sort by order, 1 is first, 5 is lower down.
// language
// const buildStateGuidanceJSON = () => {
//   try {
//     let apiDoc = JSON.parse(
//       fs.readFileSync(`${docsPath}/covid19-state-industry-guidance.api.json`)
//     );
//     let categories = JSON.parse(
//       fs.readFileSync(
//         `${dataPath}/json/data-covid19-industry-guidance-categories.json`,
//         "utf8"
//       )
//     );
//     let metadata = JSON.parse(
//       fs.readFileSync(
//         `${dataPath}/json/data-covid19-related-guidance-metadata.json`,
//         "utf8"
//       )
//     );
//     let pdfLinks = JSON.parse(
//       fs.readFileSync(
//         `${dataPath}/json/data-covid19-industry-guidance-pdf-links.json`,
//         "utf8"
//       )
//     );
//     let additionalResources = JSON.parse(
//       fs.readFileSync(
//         `${dataPath}/json/data-covid19-industry-guidance-additional-resources.json`,
//         "utf8"
//       )
//     );
//     let data = {};
//     categories.data.map((item) => {
//       let category = item["industry_category_key"];
//       // console.log("category", category);
//       let categoryMetadata = metadata.data.filter(
//         (dataItem) => dataItem["industry_category_key"] === category
//       );
//       let categoryPdfLinks = pdfLinks.data.filter(
//         (dataItem) => dataItem["industry_category_key"] === category
//       );
//       let categoryAdditionalResources = additionalResources.data.filter(
//         (dataItem) => dataItem["industry_category_key"] === category
//       ); // @TODO sort this one

//       data[category] = {
//         metadata:
//           categoryMetadata !== null && categoryMetadata[0] !== undefined
//             ? categoryMetadata
//             : "",
//         pdf: categoryPdfLinks,
//         additional_resources: categoryAdditionalResources,
//       };
//     });

//     const utcDate = getDate();

//     let apiData = {
//       docs: apiDoc,
//       data: data,
//       date_updated: utcDate,
//       total: Object.keys(data).length,
//     };

//     fs.writeFile(
//       `${dataPath}/json/data-covid19-state-industry-guidance.json`,
//       JSON.stringify(apiData),
//       function (err) {
//         if (err) return console.log(err);
//         console.log(`Updated: data-covid19-state-industry-guidance.json`);
//       }
//     );
//   } catch (error) {
//     console.error("Error building State Industry Guidance data.", error);
//   }
// };

/**
 * Run the script
 */
buildData();

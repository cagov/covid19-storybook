const fs = require("fs");

const componentPath =
  "./js/roadmap/scripts/auto-generated-data";


// Write folder for JSON output
const dataPath =
  "./js/roadmap/scripts/auto-generated-data";


// Get static API files
const activityBusinessDataPath =
  `${componentPath}/json/data-covid19-activity-business-search-data.json`;
const guidanceFilePath =
`${componentPath}/json/data-covid19-state-industry-guidance.json`;

console.log(activityBusinessDataPath);

const outputDataPath = `${componentPath}/data`;
const storyPathsGuidance = {
  ar: `${outputDataPath}/ar/records/data-covid19-state-industry-guidance.json`,
  en: `${outputDataPath}/en/records/data-covid19-state-industry-guidance.json`,
  es: `${outputDataPath}/es/records/data-covid19-state-industry-guidance.json`,
  ko: `${outputDataPath}/ko/records/data-covid19-state-industry-guidance.json`,
  tl: `${outputDataPath}/tl/records/data-covid19-state-industry-guidance.json`,
  vi: `${outputDataPath}/vi/records/data-covid19-state-industry-guidance.json`,
  "zh-hans": `${outputDataPath}/zh-hans/records/data-covid19-state-industry-guidance.json`,
  "zh-hant": `${outputDataPath}/zh-hant/records/data-covid19-state-industry-guidance.json`,
};

let activityBusinessData = fs.readFileSync(activityBusinessDataPath);
let guidanceData = fs.readFileSync(guidanceFilePath);

const storyPathsSearch = {
    ar: `${outputDataPath}/ar/records/data-covid19-activity-business-search-data.json`,
    en: `${outputDataPath}/en/records/data-covid19-activity-business-search-data.json`,
    es: `${outputDataPath}/es/records/data-covid19-activity-business-search-data.json`,
    ko: `${outputDataPath}/ko/records/data-covid19-activity-business-search-data.json`,
    tl: `${outputDataPath}/tl/records/data-covid19-activity-business-search-data.json`,
    vi: `${outputDataPath}/vi/records/data-covid19-activity-business-search-data.json`,
    "zh-hans": `${outputDataPath}/zh-hans/records/data-covid19-activity-business-search-data.json`,
    "zh-hant": `${outputDataPath}/zh-hant/records/data-covid19-activity-business-search-data.json`,
  };
  


// Update all the state guidance data
Object.keys(storyPathsGuidance).map((language_code) => {
  fs.writeFile(
    `${storyPathsGuidance[language_code]}`,
    guidanceData,
    function (err) {
      if (err) return console.log(err);
      console.log(
        `Update mock data: data-covid19-state-industry-guidance.json`
      );
    }
  );
});

// Update all the activity data
Object.keys(storyPathsSearch).map((language_code) => {
    fs.writeFile(
      `${storyPathsSearch[language_code]}`,
      activityBusinessData,
      function (err) {
        if (err) return console.log(err);
        console.log(
          `Update mock data: search data`
        );
      }
    );
  });
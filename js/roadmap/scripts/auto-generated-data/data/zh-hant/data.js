import countyCovid19Webpages from "./records/covid19-county-webpages.json";
import countyCovid19WebpagesApi from "./api_templates/covid19-county-webpages.api.json";

import countyStatus from "./records/countystatus.json";
import countyStatusApi from "./api_templates/countystatus.api.json";

// import reopeningMatrixData from "./records/reopening-matrix-data.json";
// import reopeningMatrixDataApi from "./api_templates/reopening-matrix-data.api.json";

// import reopeningRoadmapActivityDataPage1 from "./records/reopening-roadmap-activity-data-page-1.json";
// import reopeningRoadmapActivityDataPage2 from "./records/reopening-roadmap-activity-data-page-2.json";
// import reopeningRoadmapActivityDataApi from "./api_templates/reopening-roadmap-activity-data.api.json";

import rshoData from "./records/rsho.json";
import rshoApi from "./api_templates/rsho.api.json";

// import pubData from "./records/pubData.json";
// import pubDataApi from "./api_templates/pubData.api.json";

import countyRegionsData from "./records/countyregions.json";
import countyRegionsApi from "./api_templates/countyregions.api.json";

// import reopeningMatrixData from "./records/matrix.html";
// import reopeningMatrixApi from "./api_templates/matrix.html";

import regionsClosedData from "./records/regionsclosed.json";
import regionsClosedApi from "./api_templates/regionsclosed.api.json";

// import reopeningActivitiesData from "./records/reopening-activities.json";
// import reopeningActivitiesApi from "./api_templates/reopening-activities.api.json";

import schoolsMayReopenData from "./records/schools-may-reopen.json";
import schoolsMayReopenApi from "./api_templates/schools-may-reopen.api.json";

import tierStatusDescriptorsData from "./records/tier-status-descriptors.json";
import tierStatusDescriptorsApi from "./api_templates/tier-status-descriptors.api.json";

import stateIndustryGuidance from "./records/data-covid19-state-industry-guidance.json";

import activitySearchBusiness from "./records/data-covid19-activity-business-search-data.json";

import commonPageLabels from "./records/common-page-labels.json";
import commonPageLabelsApi from "./api_templates/common-page-labels.api.json";

import { buildMultilingualDataObject } from "../buildMultilingualDataObject";

export const data = buildMultilingualDataObject({
    countyRegionsData,
    countyRegionsApi,
    regionsClosedData,
    regionsClosedApi,
    // reopeningActivitiesData,
    // reopeningActivitiesApi,
    schoolsMayReopenData,
    schoolsMayReopenApi,
    tierStatusDescriptorsData,
    tierStatusDescriptorsApi,
    countyCovid19WebpagesApi,
    countyCovid19Webpages,
    countyStatusApi,
    countyStatus,
    // reopeningMatrixDataApi,
    // reopeningMatrixData,
    // reopeningRoadmapActivityDataApi,
    // reopeningRoadmapActivityDataPage1,
    // reopeningRoadmapActivityDataPage2,
    rshoApi,
    rshoData,
    // pubData,
    // pubDataApi,
    stateIndustryGuidance,
    activitySearchBusiness,
    commonPageLabels,
    commonPageLabelsApi,
});
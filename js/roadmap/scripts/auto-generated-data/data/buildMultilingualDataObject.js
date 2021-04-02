// A mock data sample pulling in all the data used in the what's open search interface.
// Used also to help us map & document the display data

export const buildMultilingualDataObject = ({
    countyRegionsData,
    countyRegionsApi,
    regionsClosedData,
    regionsClosedApi,
    schoolsMayReopenData,
    schoolsMayReopenApi,
    tierStatusDescriptorsData,
    tierStatusDescriptorsApi,
    countyCovid19WebpagesApi,
    countyCovid19Webpages,
    countyStatusApi,
    countyStatus,
    rshoApi,
    rshoData,
    stateIndustryGuidance,
    activitySearchBusiness,
    commonPageLabels,
    commonPageLabelsApi,
}) => {
    return  {
        content: "text",

        // Recent County Tier Status
        "countystatus": {
            docs: countyStatusApi,
            data: countyStatus
        },
        // Not needed in search, used for reopening-matrix.njk
        // Leaving here in case design changes
        // "reopening-matrix-data": {
        //     docs: reopeningMatrixDataApi,
        //     data: reopeningMatrixData
        // },
        // Which regions counties belong to
        "countyregions": {
            docs: countyRegionsApi,
            data: countyRegionsData
        },
        // Which regions have school closings
        "regionsclosed": {
            docs: regionsClosedApi,
            data: regionsClosedData
        },
        // Which counties are currently under RSHO, if any
        "rsho": {
            docs: rshoApi,
            data: rshoData
        },
        // Schools can reopen in which counties
        // Pulls from table data, schools-may-reopen-in-these-counties.json
        // Which 11ty rewrites and returns as a simple array.
        "schools-may-reopen": {
            docs: schoolsMayReopenApi,
            data: schoolsMayReopenData
        },
        // What's open search data (data managed in Airtable)
        "activity-business-search-data": activitySearchBusiness,
        // PDF files and links for State Guidance (data managed in Airtable)
        "state-industry-guidance": stateIndustryGuidance,
        // Subset of Wordpress table data that includes schools may reopen labelling
        "common-page-labels": {
            docs: commonPageLabelsApi,
            data: commonPageLabels
        },
        // Data from Wordpress Data Table 1 is used to build tier status cards.
        "tier-status-descriptors": {
            docs: tierStatusDescriptorsApi,
            data: tierStatusDescriptorsData
        },
        // County Health Department web pages
        // Data managed in Airtable
        "covid19-county-webpages": {
            docs: countyCovid19WebpagesApi,
            data: countyCovid19Webpages.records
        },
    };
}
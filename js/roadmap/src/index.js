import Awesomplete from "awesomplete-es6";
import getTranslations from "./../../common/get-strings-list.js";
import getScreenResize from "./../../common/get-window-size.js";
import template from "./template.js";
import {
  inputValueCounty,
  inputValueActivity,
} from "./behaviorAutocompleteButton";
import { getCountyMap } from "./getCountyMap";
import { schoolReopeningStatuses } from "./search-results-cards/schoolsStatuses";
import { cardTemplate } from "./search-results-cards/cardTemplateSaferEconomy";


/**
 * This component provides a county and activity/business search interface
 * and displays combined datasets for different reopening statuses.
 */
export class CaGovReopening extends window.HTMLElement {
  constructor() {
    console.log("CaGov Reopening loaded");
    
    super();

    this.initialLoad = 0;
    // Optional state object to use for persisting data across interactions.
    this.state = {
      county:
        document.querySelector("#location-query") !== null
          ? document.querySelector("#location-query").value
          : null,
      activity:
        document.querySelector("#activity-query") !== null
          ? document.querySelector("#activity-query").value
          : null,
    };

    // Establish chart variables and settings.
    this.displayOptions = {
      screens: {
        desktop: {
          width: 600,
          height: 400,
        },
        tablet: {
          width: 600,
          height: 1200,
        },
        mobile: {
          width: 400,
          height: 800,
        },
        retina: {
          width: 600,
          height: 400,
        },
      },
    };

    this.getCountyMap = getCountyMap;
  }

  connectedCallback() {
    window.addEventListener("resize", (e) => {
      // console.log("resize");
      this.handleResize(e);
    });

    // Get translations from web component markup.
    this.translationsStrings = getTranslations(this);
    // Render the chart for the first time.

    this.state = {
      county:
        document.querySelector("#location-query") !== null
          ? document.querySelector("#location-query").value
          : null,
      activity:
        document.querySelector("#activity-query") !== null
          ? document.querySelector("#activity-query").value
          : null,
    };

    // Read content of stringified data-json that is inserted into the enclosing tag of the web-component.
    this.getLocalData();

    // Replace the enclosing tag element with contents of template.
    this.innerHTML = template({
      translations: this.translationsStrings,
      localData: this.localData,
    });

    this.render();
    this.setupInputButtons();
  }

  getLocalData() {
    this.localData = {};

    let theMatrix = document.querySelector(".the-matrix");
    if (theMatrix) {
      document.querySelector(".matrix-holder").innerHTML = theMatrix.innerHTML;
    }

    window.fetch('/countystatus.json')
    .then(response => response.json())
    .then(function(data) {
      console.log("countystatus2", data);
      this.localData["countystatus"] = data;
      // Set up autocomplete data for county search (list of counties)
      this.countyStatuses = this.localData["countystatus"];

      this.countyAutocompleteList = [];
      this.countyStatuses.forEach((c) => {
        this.countyAutocompleteList.push(c.county);
      });
    }.bind(this));

    window.fetch('/countyregions.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData.countyregions = data;
      this.countyRegions = this.localData.countyregions;
    }.bind(this));

    window.fetch('/regionsclosed.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData.regionsclosed = data;
      this.regionsclosed = this.localData.regionsclosed.Table1; // array
    }.bind(this));

    window.fetch('/statusdescriptors.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData["tier-status-descriptors"] = data;
      this.tierStatusDescriptors = this.localData[
        "tier-status-descriptors"
      ].Table1;
    }.bind(this));

    window.fetch('/schools-may-reopen.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData["schools-may-reopen"] = data;
      this.schoolsCanReopenList = this.localData["schools-may-reopen"];
    }.bind(this));

    // @TODO move to snippet if needed again
    this.schoolsText = {
      "schools_may_reopen": "Schools may reopen fully for in-person instruction. Local school officials will decide whether and when that will occur.",
      "schools_may_not_reopen": "Schools may not reopen fully for in-person instruction until the county has been in the Substantial (red) tier for 5 days. School officials <a href=\"https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/COVID-19/Schools-FAQ.aspx\">may decide to conduct in-person instruction</a> for a limited set of students in small cohorts.<br><br>Note on exception: Schools that have already re-opened if the county was in a less restrictive tier do not have to close. However, if a school had not already reopened for in-person instruction, it may not reopen until the county moves back to the Substantial (red) tier for 5 consecutive days.",
      "schools_info": "See <a href=\"https://schools.covid19.ca.gov/\">CA Safe Schools for All hub</a>, <a href=\"https://www.cdph.ca.gov/Programs/CID/DCDC/CDPH%20Document%20Library/COVID-19/Consolidated_Schools_Guidance.pdf\">schools guidance</a>, and <a href=\"https://files.covid19.ca.gov/pdf/guidance-schools-cohort-FAQ.pdf\">cohorting FAQs</a>."
    }

    window.fetch('/state-industry-guidance.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData["state-industry-guidance"] = data;
    }.bind(this));

    window.fetch('/county-webpages.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData["covid19-county-webpages"] = data;
      this.countyWebpages = this.localData["covid19-county-webpages"].data;
    }.bind(this));
    
    window.fetch('/activity-business-search-data.json')
    .then(response => response.json())
    .then(function(data) {
      this.localData["activity-business-search-data"] = data;
      // Set up autocomplete data for activity search
      this.allActivities = this.localData["activity-business-search-data"].data; // Version 2

      this.activityAutocompleteList = [];
      this.allActivities.forEach((item) => {
        this.activityAutocompleteList.push(item.activity_search_autocomplete);
      });
      // Connect autocomplete searches to page elements.
      this.setupAutoComplete("#location-query", "county", this.countyAutocompleteList);
      this.setupAutoCompleteActivity(
        "#activity-query",
        "activity",
        this.activityAutocompleteList
      );
    }.bind(this));    
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize(e) {
    // console.log("resize");
    getScreenResize(this);
    this.updateScreenOptions(e);
  }

  updateScreenOptions(e) {
    this.screenDisplayType = window.componentDisplay
      ? window.componentDisplay.displayType
      : "desktop";
    this.chartBreakpointValues = this.displayOptions.screens[
      this.screenDisplayType ? this.screenDisplayType : "desktop"
    ];
    // console.log(this.screenDisplayType);
  }

  getData() {
    // Reset interface label strings
    this.innerHTML = template({
      translations: this.translationsStrings,
      localData: this.localData,
    });
  }

  render() {
    this.getData();
    this.getCountyMap();
    this.activateForms();
  }

  setupInputButtons() {
    // Get the input element.
    var countyInput = document.getElementById("location-query");
    var activityInput = document.getElementById("activity-query");

    let hasCountyInput = this.hasCountyInput();
    let hasActivityInput = this.hasActivityInput();
    // @TODO Add enter form submission for accessibility for all interactions

    if (countyInput) {
      // Show clear button only on input or blur (County)
      countyInput.addEventListener("input", function (e) {
        // console.log("input county input", e);
        inputValueCounty(e, hasCountyInput);
        // this.changeLocationInput(countyInput.value);
      });

      countyInput.addEventListener("blur", function (e) {
        // console.log("blurred county input", e);
        inputValueCounty(e, hasCountyInput);
        // this.changeLocationInput(countyInput.value);
      });
    }

    if (activityInput) {
      // Show clear button only on input or blur (Activity)
      activityInput.addEventListener("input", function (e) {
        // console.log("input activity input", e);
        inputValueActivity(e, hasActivityInput);
        // this.changeActivityInput(activityInput.value);
      });

      activityInput.addEventListener("blur", function (e) {
        // console.log("input activity blur", e);
        inputValueActivity(e, hasActivityInput);
        // this.changeActivityInput(activityInput.value);
      });
    }

    // console.log("hasCountyInput", hasCountyInput, "hasActivityInput", hasActivityInput, this.initialLoad);

    // If values preset, run the search.
    if (
      this.initialLoad === 0 &&
      hasCountyInput === true &&
      hasActivityInput === false
    ) {
      // console.log("Initial load: has county data");
      this.changeLocationInput(countyInput.value);
      this.initialLoad = 1;
      this.layoutCards();
      document.getElementById("location-query").blur();
    } else if (
      this.initialLoad === 0 &&
      hasCountyInput === false &&
      hasActivityInput === true
    ) {
      // console.log("Initial load: has activity data");
      this.changeActivityInput(activityInput.value);
      this.initialLoad = 1;
      this.layoutCards();
      document.getElementById("activity-query").blur();
    } else if (
      this.initialLoad === 0 &&
      hasCountyInput === true &&
      hasActivityInput === true
    ) {
      // console.log("Initial load: has county and activity data");
      this.changeLocationInput(countyInput.value);
      this.changeActivityInput(activityInput.value);
      this.initialLoad = 1;
      this.layoutCards();
      document.getElementById("location-query").blur();
      document.getElementById("activity-query").blur();
    }

    if (hasActivityInput || hasCountyInput) {
      // Clear button input on click events
      document
        .getElementById("clearLocation")
        .addEventListener("click", function (e) {
          countyInput.value = "";
          inputValueCounty(e);
        });

      document
        .getElementById("clearActivity")
        .addEventListener("click", function (e) {
          activityInput.value = "";
          inputValueActivity(e);
        });
    }
  }

  changeLocationInput(value) {
    // console.log("changing location input");
    const $locationQuery = document.getElementById("location-query");
    $locationQuery.value = value;
    $locationQuery.setAttribute("aria-invalid", false);
    this.state["county"] = value;
    if (value) {
      document.getElementById("clearLocation").classList.remove("d-none");
    } else {
      document.getElementById("clearLocation").classList.add("d-none");
    }
    document.getElementById("location-error").style.visibility = "hidden";
    document.getElementById("reopening-error").style.visibility = "hidden";

    if (this.hasActivityInput() === false && this.hasCountyInput() === false) {
      this.querySelector(".card-holder").innerHTML = "";
    } else {
      this.layoutCards();
    }
  }

  changeActivityInput(value) {
    // console.log("changing activity input");
    const $activityQuery = document.getElementById("activity-query");
    $activityQuery.value = value;
    $activityQuery.setAttribute("aria-invalid", false);
    this.state["activity"] = value;
    if (value) {
      document.getElementById("clearActivity").classList.remove("d-none");
    } else {
      document.getElementById("clearActivity").classList.add("d-none");
    }
    document.getElementById("activity-error").style.visibility = "hidden";
    document.getElementById("reopening-error").style.visibility = "hidden";

    if (this.hasActivityInput() === false && this.hasCountyInput() === false) {
      this.querySelector(".card-holder").innerHTML = "";
    } else {
      this.layoutCards();
    }
  }

  activateForms() {
    // console.log("Activate Forms");
    document.getElementById("location-query").addEventListener(
      "input",
      function (event) {
        this.changeLocationInput(event.target.value);
      }.bind(this)
    );

    document.getElementById("clearLocation").addEventListener(
      "click",
      function () {
        this.changeLocationInput("");
      }.bind(this)
    );

    document.getElementById("activity-query").addEventListener(
      "input",
      function (event) {
        this.changeActivityInput(event.target.value);
      }.bind(this)
    );

    document.getElementById("clearActivity").addEventListener(
      "click",
      function () {
        this.changeActivityInput("");
      }.bind(this)
    );

    // Form submit behavior for reopening-activities form.
    document.querySelector(".reopening-activities").addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        // Validation:
        // If inputs are empty, Reset county value to null, it's not an error.
        if (document.querySelector("#location-query").value == "") {
          this.state["county"] = null;
        }
        // If inputs are empty, Reset activity value to null, it's not an error.
        if (document.querySelector("#activity-query").value == "") {
          this.state["activity"] = null;
        }
        // ?? Not sure what this was supposed to do
        // Best guess: Show errors
        // @TODO This looks buggy
        // If activity and county are not set (undefined), clear the card holder (what's the card holder?)
        // And make reopening error visible

        if (
          this.hasActivityInput() === false &&
          this.hasCountyInput() === false
        ) {
          this.querySelector(".card-holder").innerHTML = "";
          document.getElementById("reopening-error").style.visibility =
            "visible";
        } else {
          // Render the card layouts

          this.layoutCards();
        }
      }.bind(this)
    );
  }

  // County Autocomplete
  setupAutoComplete(fieldSelector, fieldName, countyAutocompleteList) {
    let component = this;
    const awesompleteSettings = {
      autoFirst: true,
      minChars: 0,
      maxItems: 99,
      filter: function (text, input) {
        return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
      },
      item: function (text, input) {
        return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
      },
      replace: function (text) {
        let before = this.input.value.match(/^.+,\s*|/)[0];
        // @TODO clean up abbreviations
        let autocompleteValue = before + text;
        this.input.value = autocompleteValue;
        component.state[fieldName] = autocompleteValue;
        component.layoutCards();
        document.querySelector(fieldSelector).blur();
      },
      sort: (a, b) => {
        return countyAutocompleteList.indexOf(a.label) <
          countyAutocompleteList.indexOf(b.label)
          ? -1
          : 1;
      },
      list: countyAutocompleteList,
    };

    window.makeAutocomplete = new Awesomplete(
      fieldSelector,
      awesompleteSettings
    );
  }

  // Activity Autocomplete
  setupAutoCompleteActivity(
    fieldSelector,
    fieldName,
    activityAutocompleteList
  ) {
    let component = this;
    const awesompleteSettings = {
      autoFirst: true,
      minChars: 0,
      maxItems: 99,
      sort: function (a, b) {
        if (
          a["activity_search_autocomplete"] < b["activity_search_autocomplete"]
        ) {
          return -1;
        }
        if (
          a["activity_search_autocomplete"] > b["activity_search_autocomplete"]
        ) {
          return 1;
        }
        return 0;
      },
      replace: function (text) {
        let before = this.input.value.match(/^.+,\s*|/)[0];
        // @TODO clean up abbreviations
        let autocompleteValue = before + text;
        this.input.value = autocompleteValue;
        component.state[fieldName] = autocompleteValue;
        component.layoutCards();
        document.querySelector(fieldSelector).blur();
      },
      list: activityAutocompleteList,
    };

    window.makeAutocomplete2 = new Awesomplete(
      fieldSelector,
      awesompleteSettings
    );

    document
      .querySelector(fieldSelector)
      .addEventListener("focus", function () {
        this.value = "";
        window.makeAutocomplete2.evaluate();
      });
  }

  hasCountyInput() {
    if (
      this.state["county"] === null ||
      this.state["county"] === "" ||
      this.state["county"] === "null"
    ) {
      // Check input content:
      var countyInput = document.getElementById("location-query");
      if (
        countyInput !== undefined &&
        countyInput !== null &&
        countyInput.value !== "" &&
        countyInput.value !== null &&
        countyInput.value.length !== undefined &&
        countyInput.value.length > 0
      ) {
        return true;
      }

      return false;
    }
    return true;
  }

  hasActivityInput() {
    if (
      this.state["activity"] === null ||
      this.state["activity"] === "" ||
      this.state["activity"] === "null"
    ) {
      // Check input content:
      var activityInput = document.getElementById("activity-query");
      if (
        activityInput !== undefined &&
        activityInput !== null &&
        activityInput.value !== "" &&
        activityInput.value !== null &&
        activityInput.value.length !== undefined &&
        activityInput.value.length > 0
      ) {
        return true;
      }

      return false;
    }
    return true;
  }

  cardDisplayLogic() {
    // Build data for cards.
    let selectedCounties = [];

    let selectedActivities = [];

    let viewAllCounties = false;
    let viewAllActivities = false;

    if (this.hasCountyInput() && !this.hasActivityInput()) {
      viewAllCounties = false;
      viewAllActivities = true;
    } else if (!this.hasCountyInput() && !this.hasActivityInput()) {
      viewAllCounties = true;
      viewAllActivities = true;
    } else if (!this.hasCountyInput() && this.hasActivityInput()) {
      viewAllCounties = true;
      viewAllActivities = false;
    } else if (this.hasCountyInput() && this.hasActivityInput()) {
      viewAllCounties = false;
      viewAllActivities = false;
    }

    // console.log("activity", this.state["activity"], "county", this.state["county"]);
    // console.log("viewAllActivities", viewAllActivities, "viewAllCounties", viewAllCounties);

    // Q: How many statuses are supported? Had there been a plan to show multiple counties?
    if (this.hasCountyInput()) {
      selectedCounties = [];
      this.countyStatuses.forEach((item) => {
        if (item.county == this.state["county"] || viewAllCounties === true) {
          selectedCounties.push(item);
        }
      });
    }

    if (this.hasActivityInput()) {
      // Build list of selected activities
      this.allActivities.forEach((searchResultData) => {
        if (
          searchResultData["activity_search_autocomplete"] ===
            this.state["activity"] ||
          viewAllActivities === true
        ) {
          selectedActivities.push(searchResultData);
        }
      });
    }

    // Update local variables
    this.selectedActivities = selectedActivities;
    this.selectedCounties = selectedCounties;
    this.viewAllActivities = viewAllActivities;
    this.viewAllCounties = viewAllCounties;
  }

  layoutCards() {
    // console.log("laying out cards", this.localData);
    // console.log("state", this.state);

    this.cardHTML = "";
    // Set up the display logic for the card.
    this.cardDisplayLogic();

    // Get any policy logic and put it in a variable to pass to child elements.
    // Policies update with each user interaction.
    let policies = {
      // If county is under regional stay at home order
      isUnderRSHO: this.selectedCountyInRegionalStayAtHomeOrder({
        regionsclosed: this.regionsclosed,
        countyRegions: this.countyRegions,
        selectedCounty: this.state["county"],
      }),
    };

    // console.log("Policies", policies);

    // Map data sources and labels to card responses.
    this.cardHTML = cardTemplate({
      // Interactive states
      county: this.state["county"],
      selectedActivity: this.state["activity"],
      selectedCounties: this.selectedCounties,
      hasCountyInput: this.hasCountyInput(),
      hasActivityInput: this.hasActivityInput(),
      // Data sets
      selectedActivities: this.selectedActivities,
      schoolsCanReopenList: this.schoolsCanReopenList,
      countyWebpages: this.countyWebpages,
      stateIndustryGuidanceData: this.localData["state-industry-guidance"].data,
      regionsclosed: this.regionsclosed,
      allActivities: this.allActivities,
      schoolReopeningStatuses,
      countyRegions: this.countyRegions,
      policies,

      // Labels
      schoolLabels: this.schoolsText,
      tierStatusDescriptors: this.tierStatusDescriptors,
      regionLabel: this.translationsStrings.regionLabel,
      understandTheData: this.translationsStrings.understandTheData,
      understandTheDataLink: this.translationsStrings.understandTheDataLink,
      countyRestrictionsAdvice: this.translationsStrings
        .countyRestrictionsAdvice,
      countyRestrictionsCountyWebsiteLabel: this.translationsStrings
        .countyRestrictionsCountyWebsiteLabel,
      seeGuidanceText: this.translationsStrings.seeGuidanceText,

      // @TODO need to simplify this while also being really specific - there are too many actual props to set up & it's easy to not connect them all
      seeStateIndustryGuidanceLabel: this.translationsStrings
        .seeStateIndustryGuidanceLabel,
      primaryGuidanceLabel: this.translationsStrings.primaryGuidanceLabel,
      secondaryGuidanceLabel: this.translationsStrings.secondaryGuidanceLabel,
      additionalGuidanceLabel: this.translationsStrings.additionalGuidanceLabel,
      relatedGuidanceLabel: this.translationsStrings.relatedGuidanceLabel,
      guidancePdfLabel: this.translationsStrings.guidancePdfLabel,
      checklistPdfLabel: this.translationsStrings.checklistPdfLabel,
    });

    // These classes are used but created with variables so the purge cannot find them, they are carefully placed here where they will be noticed:

    // Add card markup to card holder.
    this.querySelector(
      ".card-holder"
    ).innerHTML = `<div class="card-content">${this.cardHTML}</div>`;

    this.querySelector(".card-holder").classList.remove("inactive");

    // For Analytics: Dispatch custom event so we can pick up and track this usage elsewhere.
    const event = new window.CustomEvent("safer-economy-page-submission", {
      detail: {
        county: this.state.county,
        activity: this.state.activity,
      },
    });
    window.dispatchEvent(event);
  }

  /**
   * Check if the current selected county is in one of the RSHO closed regions.
   *
   * @param {array} param.regionsclosed - Which regions are closed
   * @param {array} param.countyRegions - Which county belongs in which region
   * @param {string} param.selectedCounty - Currently selected county
   * @return {bool} If the selected county is under regional stay at home order
   */
  selectedCountyInRegionalStayAtHomeOrder({
    regionsclosed = null,
    countyRegions = null,
    selectedCounty = null,
  }) {
    try {
      // console.log("regions closed", regionsclosed, countyRegions, selectedCounty);

      if (regionsclosed && countyRegions && selectedCounty) {
        return (
          regionsclosed.filter(
            (r) => r.region === countyRegions[selectedCounty]
          ).length > 0
        );
      }
    } catch (error) {
      console.error("Error settings regional stay at home order", error);
    }
    return false;
  }
}

window.customElements.define('cagov-covid19-reopening', CaGovReopening);

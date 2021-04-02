import { html } from 'lit-html';
import './../src';
import './../dropdown/src';

/**
 * Primary UI component for user interaction
 */
export const WebComponent = (args) => {
  return html`
    <cagov-covid19-reopening>
      <ul>
        <li data-label="presetValueCounty">${args.countyValue}</li>
        <li data-label="presetValueActivity">${args.activityValue}</li>
        <li data-label="title">Find the status for activities in your county</li>
        <li data-label="activityLabel">Activity</li>
        <li data-label="activityPlaceholder">Enter a business or activity</li>
        <li data-label="countyLabel">County</li>
        <li data-label="countyPlaceholder">Enter county</li>
        <li data-label="buttonText">Get latest risk levels</li>
        <li data-label="clearText">Clear</li>
        <li data-label="seeGuidanceText">See guidance for</li>
        <li data-label="countyRestrictionsAdvice">Counties can restrict further.</li>
        <li data-label="countyRestrictionsCountyWebsiteLabel">Check <span data-attribute="county"></span>’s COVID-19 website</li>
        <li data-label="understandTheData">Understand the data.</li>
        <li data-label="understandTheDataLink">#county-status</li>
        <li data-label="regionLabel">Region:</li>
        <li data-label="countyNotFound">County not found</li>
        <li data-label="activityNotFound">Activity not found</li>
        <li data-label="emptySearchError">No County or Activity Selected</li>
        <li data-label="enterMoreCharacters">Type 2 or more characters for results.</li>
        <li data-label="seeStateIndustryGuidanceLabel">Get state industry guidance</li>
        <li data-label="primaryGuidanceLabel"><span data-attribute="activityLabel"></span> must follow guidance for <span data-attribute="guidances"></span>.</li>
        <li data-label="secondaryGuidanceLabel">Depending on your business operations, other guidance may apply</li>
        <li data-label="guidancePdfLabel">Guidance for <span data-attribute="activityLabel"></span></li>
        <li data-label="checklistPdfLabel">Checklist for <span data-attribute="activityLabel"></span></li>
        <li data-label="additionalGuidanceLabel">Depending on your business operations, other guidance may apply</span></li>
        <li data-label="relatedGuidanceLabel"></li>
      </ul>
    </cagov-covid19-reopening>
  `;
};


export const WebComponentSpanish = (args) => {
  // console.log("web component data", args);
  return html`
    <cagov-covid19-reopening>
      <ul>
        <li data-label="presetValueCounty">${args.countyValue}</li>
        <li data-label="presetValueActivity">${args.activityValue}</li>
        <li data-label="title">Encuentre el estado para las actividades en su condado</li>
        <li data-label="activityLabel">Actividad</li>
        <li data-label="activityPlaceholder">Introduzca un negocio o actividad</li>
        <li data-label="countyLabel">Condado</li>
        <li data-label="countyPlaceholder">Introduzca un condado</li>
        <li data-label="buttonText">Obtenga los niveles de riesgo más recientes</li>
        <li data-label="clearText">Borrar</li>
        <li data-label="seeGuidanceText">Consulte la guía para</li>
        <li data-label="countyRestrictionsAdvice">Los condados pueden tener más restricciones. </li>
        <li data-label="countyRestrictionsCountyWebsiteLabel">Check <span data-attribute="county"></span>’s COVID-19 website</li>
        <li data-label="understandTheData">Entienda los datos.</li>
        <li data-label="understandTheDataLink">#county-status</li>
        <li data-label="regionLabel">Región:</li>
        <li data-label="countyNotFound">Condado no encontrado</li>
        <li data-label="activityNotFound">Actividad o negocio no encontrado</li>
        <li data-label="emptySearchError">Escriba un condado o una actividad</li>
        <li data-label="enterMoreCharacters">Type 2 or more characters for results.</li>
        <li data-label="seeStateIndustryGuidanceLabel">Get state industry guidance</li>
        <li data-label="primaryGuidanceLabel"><span data-attribute="activityLabel"></span> must follow guidance for <span data-attribute="guidances"></span>.</li>
        <li data-label="primaryGuidanceLabel">Secondary guidance label</li>
        <li data-label="guidancePdfLabel">Guidance for <span data-attribute="activityLabel"></span></li>
        <li data-label="checklistPdfLabel">Checklist for <span data-attribute="activityLabel"></span></li>
        <li data-label="additionalGuidanceLabel">Depending on your business operations, other guidance may apply</span></li>
      </ul>
    </cagov-covid19-reopening>
  `;
};
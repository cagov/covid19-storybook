/**
 * A template that is used to generate the HTML markup
 * @param {*} // @TODO JSDocs & hash signatures don't play nice, look up best way to document the variables here.
 */
export default function template({
  localData = null, // Data sets passed into the web-component.
  translations = null, // Translation strings read from HTML markup, data-label and data-group attributes.
}) {
  return /*html*/ `
<div class="reopening-fields">
  <h2 class="subtitle-color mt-3">${translations.title || null}</h2>
  <form action="#" class="reopening-activities">
    <div class="form-row">
      <div class="form-group col-md-6 reopening-form-group">
        <label for="location-query">${translations.countyLabel || null}</label>
        <div class="awesomplete">
          <input
            aria-expanded="false"
            aria-owns="awesomplete_list_1"
            aria-controls="awesomplete_list_1"
            autocomplete="off"
            class="form-control"
            data-list=""
            data-multiple=""
            id="location-query"
            role="combobox"
            type="text"
            placeholder="${translations.countyPlaceholder}"
            value="${translations.presetValueCounty ? translations.presetValueCounty : ""}"
          />
          <button type="button" class="clear d-none" id="clearLocation"><span class="ca-gov-icon-close-line" aria-hidden="true"></span> <span class="underline">${
            translations.clearText
          }</span></button>

          <ul hidden="" role="listbox" id="awesomplete_list_1"></ul>

          <span
          class="visually-hidden"
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          >${translations.enterMoreCharacters}</span>
          <div id="location-error" style="visibility: hidden" class="reopening-field-error text-danger text-small text-left">${
            translations.countyNotFound
          }</div>
        </div>
        <ul hidden="" id="awesomplete-list-1" role="listbox"></ul>
      </div>
      <div class="form-group col-md-6 reopening-form-group">
      <label for="activity-query">${translations.activityLabel}</label>
      <div class="awesomplete">
        <input
          aria-expanded="false"
          aria-owns="awesomplete_list_2"
          aria-controls="awesomplete_list_2"
          autocomplete="off"
          class="form-control"
          data-list=""
          data-multiple=""
          id="activity-query"
          role="combobox"
          type="text"
          placeholder="${translations.activityPlaceholder}"
          value="${translations.presetValueActivity ? translations.presetValueActivity : ""}"
        />
        <button type="button" class="clear d-none" id="clearActivity"><span class="ca-gov-icon-close-line" aria-hidden="true"></span> <span class="underline">${
          translations.clearText
        }</span></button>
        <ul hidden="" role="listbox" id="awesomplete_list_2"></ul>
        <div id="activity-error" style="visibility: hidden" class="reopening-field-error text-danger text-small text-left">${
          translations.activityNotFound
        }</div>
      </div>
      <ul hidden="" id="awesomplete-list-2" role="listbox"></ul>
    </div>
  </div>
  <div id="reopening-error" style="visibility: hidden" class="reopening-form-error mb-1 text-danger text-small text-center">${
    translations.emptySearchError
  }</div>
  <button type="submit" id="reopening-submit" class="btn btn-primary">${
    translations.buttonText
  }</button>
</form>
  <div class="card-holder"></div>
</div>`;
}

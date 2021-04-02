export default function getTranslations(container) {
  let translationsObj = {};
  let translateEls = container.querySelectorAll('[data-label]');
  translateEls.forEach(item => {
    translationsObj[item.dataset.label] = item.innerHTML;

    // Clean up weird bug where comment strings are wrapped around code inserted (<!---->) by Storybook interface
    // @TODO track down why/how this happens. Might be something with lit-html, Storybook controls, or loading html template. It happens somewhere before this step.
    if (typeof translationsObj[item.dataset.label] === "string") {
      translationsObj[item.dataset.label] = translationsObj[item.dataset.label].replace(/<!---->/gi, "");
    }
  })
  let translateElArrays = container.querySelectorAll('[data-group]');
  translateElArrays.forEach(group => {
    let groupKey = group.getAttribute('data-group');
    let arrayItems = group.querySelectorAll('[data-item]');
    if (groupKey !== null && arrayItems !== null) {
      let groupItems = {};
      arrayItems.forEach(item => {
        let key = item.getAttribute('data-item');
        groupItems[key] = item.innerHTML;
      });
      translationsObj[groupKey] = groupItems;
    }

  })
  return translationsObj;
}

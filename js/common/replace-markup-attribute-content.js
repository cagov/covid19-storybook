/**
 * For markup content with a child element, use selector to find element and replace content of child element with content.
 * @param {string} param.markup - Markup content to look for child element.
 * @param {string} param.selector - Child element query selector value to look up.
 * @param {string} param.content - Replacement content to insert into the child element.
 * @return {string} - Markup content with string replaced
 */
export const replaceMarkupAttributeContent = ({
  markup = null,
  selector = null,
  content = "",
}) => {
  // Convert markup to queryable element.
  let response = markup;
  try {
    if (domParserSupported && 
      markup !== undefined &&
      markup !== null && 
      selector !== undefined &&
      selector !== null &&
      content !== undefined
      ) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(markup, "text/html");
      let body = doc.body;
      let childElement = body.querySelector(selector);
      childElement.innerHTML = content !== null ? content : "";
      response = body.outerHTML;
    } else {
      var body = document.createElement(markup);
      let childElement = body.querySelector(selector);
      childElement.innerHTML = content !== null ? content : "";
      response = body.outerHTML;
    }
    // console.log("response", response);
  } catch (error) {
    console.error("Could not replace-markup-attribute-content", error);
  }

  // Replace content with selector.
  // Convert back to string
  // Return markup string
  return response;
};

var domParserSupported = (function () {
	if (!window.DOMParser) return false;
	var parser = new DOMParser();
	try {
		parser.parseFromString('x', 'text/html');
	} catch(err) {
		return false;
	}
	return true;
})();

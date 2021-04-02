
import { html } from "lit-html";
import {repeat} from 'lit-html/directives/repeat.js';
import './../../dropdown/src';

/**
 *
 * @param {array} param.links - Array of links to filter and sort
 * @param {array} param.language - Language code
 * @param {array} param.type - Filter variable
 * @return {string} - Markup with dropdown box.
 */
export const getMoreLanguages = ({
  links = null,
  language = "en",
  label = "More languages",
  type = null,
}) => {
  if (links !== undefined && links !== null && links.length > 0) {
    let linksSortedByLanguage = Object.keys(links).sort((a, b) => {
      return links[a].language > links[b].language ? 1 : -1;
    });

    let listLinks = [];
    linksSortedByLanguage.map((link) => {
      if (
        links[link].language_code !== language &&
        links[link].git_pdf_template_type === type
      ) {
        listLinks.push(links[link]);
      }
    });

    let linkItems = listLinks.map((item) => `<li>
    <a class="dropdown-item" href="${item.permalink}">${item.language}</a>
  </li>`);

    if (listLinks.length > 1) {
      let componentDropdown = `
      <cagov-dropdown>
        <div class="dropdown">
        <a
          class="btn btn-secondary dropdown-toggle"
          id="dropdownMenuLink"
          aria-expanded="false"
        >
          ${label}
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        ${linkItems.join("")}
        </ul>
      </div>
    </cagov-dropdown>
      `;
      return componentDropdown;
    }
  }
  return "";
};

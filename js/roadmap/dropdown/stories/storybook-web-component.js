import { html } from "lit-html";
import {repeat} from 'lit-html/directives/repeat.js';
import "./../src/index.scss";
import "./../src";

/**
 * Primary UI component for user interaction
 */
export const WebComponent = ({ data = null, label = "More languages" }) => {
  return html`
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
          ${repeat(data, (item) => item, (item, index) => { 
            return html`
            <li><a class="dropdown-item" href="${item.link}">${item.label}</a></li>
          `})
        }
        </ul>
      </div>
    </cagov-dropdown>
  `;
};

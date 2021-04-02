import { html, nothing } from "lit-html";
import "./../src";

/**
 * Primary UI component for user interaction
 */
export const WebComponent = ({
  expanded = false,
  drawerLabel = "Drawer label",
  drawerContent = "Drawer content",
}) => {
  return html`
    <cagov-drawer>
      <div class="card">
        <button
          class="card-header drawer-alpha"
          type="button"
          aria-expanded="${expanded}"
        >
          <div class="drawer-title">
            <h4>${drawerLabel}</h4>
          </div>
          <div class="plus-munus">
            <cagov-plus></cagov-plus><cagov-minus></cagov-minus>
          </div>
        </button>
        <div
          class="card-container"
          aria-hidden="${!expanded}"
          style="height: 0px;"
        >
          <div class="card-body">${drawerContent}</div>
        </div>
      </div>
    </cagov-drawer>
  `;
};

export const MultipleWebComponent = ({
  drawers = [
    {
      drawerLabel: "Drawer1 label",
      drawerContent: "Drawer1 content",
      expanded: false,
    },
    {
      drawerLabel: "Drawer2 label",
      drawerContent: "Drawer2 content",
      expanded: true,
    },
    {
      drawerLabel: "Drawer3 label",
      drawerContent: "Drawer3 content",
      expanded: false,
    },
  ],
}) => {
  return html`${drawers.map((item, i) => [
    html`<div>
      <cagov-drawer>
        <div class="card">
          <button
            class="card-header drawer-alpha"
            type="button"
            aria-expanded="${item.expanded}"
          >
            <div class="drawer-title">
              <h4>${item.drawerLabel}</h4>
            </div>
            <div class="plus-munus">
              <cagov-plus></cagov-plus><cagov-minus></cagov-minus>
            </div>
          </button>
          <div
            class="card-container"
            aria-hidden="${!item.expanded}"
            style="height: 0px;"
          >
            <div class="card-body">${item.drawerContent}</div>
          </div>
        </div>
      </cagov-drawer>
    </div>`,
    i < item.length - 1 ? "," : nothing,
  ])}`;
};

export const MultipleWebComponentLongPage = ({
  drawers = [
    {
      drawerLabel: "Drawer1 label",
      drawerContent: "Drawer1 content",
      expanded: false,
    },
    {
      drawerLabel: "Drawer2 label",
      drawerContent: "Drawer2 content",
      expanded: true,
    },
    {
      drawerLabel: "Drawer3 label",
      drawerContent: "Drawer3 content",
      expanded: false,
    },
  ],
}) => {
  return html`<main style="background:black;height:6000px">
  <div class="drawer-container" style="background:light-gray;height:3000px">${drawers.map((item, i) => [
    html`<div>
      <cagov-drawer>
        <div class="card">
          <button
            class="card-header drawer-alpha"
            type="button"
            aria-expanded="${item.expanded}"
          >
            <div class="drawer-title">
              <h4>${item.drawerLabel}</h4>
            </div>
            <div class="plus-munus">
              <cagov-plus></cagov-plus><cagov-minus></cagov-minus>
            </div>
          </button>
          <div
            class="card-container"
            aria-hidden="${!item.expanded}"
            style="height: 0px;"
          >
            <div class="card-body">${item.drawerContent}</div>
          </div>
        </div>
      </cagov-drawer>
    </div>`,
    i < item.length - 1 ? "," : nothing,
  ])}</div></main>`;
};

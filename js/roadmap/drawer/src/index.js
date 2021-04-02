export class CaGovDrawer extends window.HTMLElement {
  connectedCallback () {
    this.classList.add('prog-enhanced');
    this.expandTarget = this.querySelector('.card-container');
    this.expandButton = this.querySelector('.card-header');
    this.expandButton.addEventListener('click', this.listen.bind(this));
    this.activateButton = this.querySelector('.card-header');
    this.eventType = this.dataset.eventType ? this.dataset.eventType : 'click';
    // Detect if drawer should open by default.
    let expanded = this.activateButton.getAttribute('aria-expanded');
    if (expanded === "true") {
      this.triggerDrawerClick(); // Open the drawer.
    } else {
      this.closeDrawer(); // Update tabindex for automatically unopened drawers.
    }
  }

  listen () {
    if (!this.cardBodyHeight) {
      this.cardBodyHeight = this.querySelector('.card-body').clientHeight;
    }
    if (this.expandTarget.clientHeight > 0) {
      this.expandDrawer();
    } else {
      this.closeDrawer();
    }
  }

  triggerDrawerClick() {
    const event = new MouseEvent(this.eventType, {
      view: window,
      bubbles: true,
      cancelable: true
    });
    this.expandButton.dispatchEvent(event);
  }

  expandDrawer() {
    // console.log("expanding drawer");
    this.expandTarget.setAttribute('tabindex', '-1');
    this.expandTarget.style.height = '0px';
    this.expandTarget.setAttribute('aria-hidden', 'true');
    this.querySelector('.card-header').classList.remove('drawer-alpha-open');
    const expando = this.expandTarget;
    this.activateButton.setAttribute('aria-expanded', 'false');
    setTimeout(function () {
      expando.style.display = 'none';
    }, 10);
  }
  
  closeDrawer() {
    // console.log("close drawer");
    this.expandTarget.removeAttribute("tabindex");
    this.expandTarget.style.display = 'block';
    this.expandTarget.style.height = this.cardBodyHeight + 'px';
    this.expandTarget.setAttribute('aria-hidden', 'false');
    this.querySelector('.card-header').classList.add('drawer-alpha-open');
    this.querySelector('.card-container').classList.remove('collapsed');
    this.activateButton.setAttribute('aria-expanded', 'true');
  }
}
window.customElements.define('cagov-drawer', CaGovDrawer);

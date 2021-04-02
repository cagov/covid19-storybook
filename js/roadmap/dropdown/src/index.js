export class CaGovDropdown extends window.HTMLElement {
    connectedCallback () {
      this.classList.add('prog-enhanced');
      this.activateTarget = this.querySelector('.dropdown-menu');
      this.activateButton = this.querySelector('.dropdown-toggle');
      this.activateButton.addEventListener('click', this.listen.bind(this));
    }
  
    listen () {
      if (this.activateTarget.style.display === "none") {
        this.activateTarget.style.display = 'block';
      } else {
        this.activateTarget.style.display = 'none';
      }
    }
  }

  window.customElements.define('cagov-dropdown', CaGovDropdown);

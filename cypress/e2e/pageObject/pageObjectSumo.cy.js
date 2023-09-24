class pageObjectSumo {
  password(password) {
    return cy.get(`input[placeholder="Password"]`).type(String(password));
  }
  userName(userName) {
    return cy.get(`input[placeholder="Username"]`).type(String(userName));
  }
  loginButton() {
    return cy.get("#login-button").click();
  }
  menuButton() {
    return cy.get("#react-burger-menu-btn").click();
  }
  logoutButton() {
    return cy.get("#logout_sidebar_link").click();
  }

  product() {
    return cy.get(".inventory_item_name");
  }
  addRemoveButton() {
    return cy.get(".btn_inventory");
  }
}

export default pageObjectSumo;

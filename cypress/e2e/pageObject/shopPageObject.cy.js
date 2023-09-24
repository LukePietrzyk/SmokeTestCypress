class shopPageObject {
  nameLogin() {
    return cy.get('.form-group input[name="name"]');
  }
  emailLogin() {
    return cy.get('.form-group input[name="email"]');
  }
  passwordLogin() {
    return cy.get('.form-group input[type="password"]');
  }
  checkBoxIceCream() {
    return cy.get("div .form-check #exampleCheck1");
  }
  twoWayForm() {
    return cy.get(":nth-child(4) > .ng-untouched");
  }
  genderDdMenu() {
    return cy.get("#exampleFormControlSelect1");
  }
  studentRadio() {
    return cy.get("#inlineRadio1");
  }
  employedRadio() {
    return cy.get("#inlineRadio2");
  }
  entrepreneurRadio() {
    return cy.get("#inlineRadio3");
  }
  dateOfBirth() {
    return cy.get('div .form-group input[name="bday"]');
  }
  submitBtn() {
    return cy.get(".btn");
  }
  alertMessage() {
    return cy.get(".alert");
  }
}

export default shopPageObject;

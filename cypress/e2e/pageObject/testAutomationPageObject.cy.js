class testAutomationPageObject {
  nameForm() {
    return cy.get("#name");
  }
  emailForm() {
    return cy.get("#email");
  }
  phoneForm() {
    return cy.get("#phone");
  }
  addressForm() {
    return cy.get("#textarea");
  }
  maleRadio() {
    return cy.get("#male");
  }
  femaleRadio() {
    return cy.get("#female");
  }
  allCountryDropDownMenu() {
    return cy.get("#country option");
  }
  colorOption() {
    return cy.get("#colors");
  }
  subjectTableColumn() {
    return cy.get('[name*="BookTable"] tr td:nth-child(3)');
  }
  alertButton() {
    return cy.get('[onclick="myFunctionAlert()"]');
  }
  confirmBoxButton() {
    return cy.get('[onclick="myFunctionConfirm()"]');
  }
  promptButton() {
    return cy.get('[onclick="myFunctionPrompt()"]');
  }
}

export default testAutomationPageObject;

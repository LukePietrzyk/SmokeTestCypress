class practicePageObject {
  radioBox() {
    return cy.get('#radio-btn-example input[name="radioButton"] ');
  }
  checkboxAll() {
    return cy.get("input[type=checkbox]");
  }
  dropDownStatic() {
    return cy.get("#dropdown-class-example");
  }
  inputDynamicDropDown() {
    return cy.get(".ui-autocomplete-input");
  }
  elementDynamicDropDown() {
    return cy.get(".ui-menu-item div");
  }
  openTabButton() {
    return cy.get("#opentab");
  }
  inputName() {
    return cy.get("input[placeholder='Enter Your Name'");
  }
  confirmBtn() {
    return cy.get('[value="Confirm"]');
  }
  alertBtn() {
    return cy.get("#alertbtn");
  }
  secoundTableColumn() {
    return cy.get(".table-display tr td:nth-child(2)");
  }
}

export default practicePageObject;

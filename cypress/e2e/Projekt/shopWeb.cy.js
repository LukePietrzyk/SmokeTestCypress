/// <reference types="cypress" />
import shopPageObject from "../pageObject/shopPageObject.cy.js";
const shopPO = new shopPageObject();
let dane;
describe("Page for practice automation testing", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.fixture("testData.json").then((data) => {
      console.log(data);
      dane = data;
    });
  });

  it("Fill form", () => {
    shopPO.nameLogin().type(dane.name).should("have.value", dane.name);
    shopPO.emailLogin().type(dane.email).should("have.value", dane.email);
    shopPO
      .passwordLogin()
      .type(dane.password)
      .should("have.value", dane.password);
    shopPO.twoWayForm().should("have.value", dane.name);
    shopPO.checkBoxIceCream().check().should("be.checked").and("be.visible");
    shopPO.genderDdMenu().select(dane.gender).should("have.value", dane.gender);
    shopPO.studentRadio().check().should("be.checked");
    shopPO.employedRadio().check().should("be.checked");
    shopPO.entrepreneurRadio().should("be.disabled");
    shopPO
      .entrepreneurRadio()
      .invoke("removeAttr", "disabled")
      .should("not.be.disabled")
      .check()
      .should("be.checked");
    shopPO.dateOfBirth().type("1997-01-22");
    shopPO.submitBtn().click();
    shopPO.alertMessage().should("include.text", "Success!");
  });
});

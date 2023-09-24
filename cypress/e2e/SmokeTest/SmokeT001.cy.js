/// <reference types="cypress" />
import pageObjectSumo from "../pageObject/pageObjectSumo.cy";
const pageObject = new pageObjectSumo();
let dane;

describe("Page for practice automation testing", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    cy.fixture("sumoTestData.json").then((data) => {
      console.log(data);
      dane = data;
    });
  });

  it("Able to login on website saucedemo.com", () => {
    pageObject.userName(dane.UserName);
    pageObject.password(dane.password);
    pageObject.loginButton();
    cy.url().should("include", "/inventory.html");
  });
});

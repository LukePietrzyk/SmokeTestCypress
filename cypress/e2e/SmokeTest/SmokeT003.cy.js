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
  it("Able to add product to cart", () => {
    pageObject.userName(dane.UserName);
    pageObject.password(dane.password);
    pageObject.loginButton();
    pageObject.product().each((el, index) => {
      let text = el.text();
      if (text.includes(dane.product)) pageObject.product().eq(index).click();
    });
    pageObject.addRemoveButton().click();
    pageObject.addRemoveButton().then((el) => {
      const txt = el.text();
      expect(txt).to.include(dane.buttonAddRem[1]);
    });
  });
});

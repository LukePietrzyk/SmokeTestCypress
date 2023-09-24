/// <reference types="cypress" />
import testAutomationPageObject from "../pageObject/testAutomationPageObject.cy.js";
const automationPO = new testAutomationPageObject();
let dane;
describe("Page for practice automation testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("testDataAutomation.json").then((data) => {
      console.log(data);
      dane = data;
    });
  });

  it("Fill contact form", () => {
    cy.url().should("include", dane.baseUrl);
    automationPO.nameForm().type(dane.name).should("have.value", dane.name);
    automationPO.emailForm().type(dane.email).should("have.value", dane.email);
    automationPO.phoneForm().type(dane.phone).should("have.value", dane.phone);
    automationPO
      .addressForm()
      .type(dane.address)
      .should("have.value", dane.address);
  });
  it("Check gender radio button", () => {
    automationPO
      .maleRadio()
      .check()
      .should("be.checked")
      .and("not.be.disabled");
    automationPO.femaleRadio().should("not.be.disabled");
  });
  it("Check list of country in static drop down menu", () => {
    automationPO.allCountryDropDownMenu().then(($el) => {
      const actual = [...$el].map((o) => o.value);
      expect(actual).to.deep.eql(dane.country);
    });
  });
  it("Check menu of color options with testData", () => {
    automationPO
      .colorOption()
      .children("option")
      .then((color) => {
        const actualValue = [...color].map((o) => o.value);
        expect(actualValue).to.deep.eq(dane.colorData);
      });
    automationPO
      .colorOption()
      .select(dane.colorData[4])
      .invoke("val")
      .then((value) => {
        cy.wrap(value).should(
          "match",
          new RegExp(`^${dane.colorData[4]}$`, "i")
        );
      });
  });
  it("Check price in table", () => {
    automationPO.subjectTableColumn().each((el, index) => {
      const text = el.text();
      expect(text).to.eq(dane.nameBookInTable[index]);
      automationPO
        .subjectTableColumn()
        .eq(index)
        .next()
        .then((price) => {
          const priceText = price.text();
          expect(priceText).to.eq(dane.priceBookInTable[index]);
        });
    });
  });
  it("Check alerts from JS", () => {
    automationPO.alertButton().click();
    cy.on("window:alert", (str) => {
      expect(str).to.contains(`I am an alert box!`);
    });
    automationPO.confirmBoxButton().click();
    cy.on("window:confirm", (str) => {
      expect(str).to.contains(`Press a button!`);
    });
    cy.get("#demo").then((el) => {
      const text = el.text();
      expect(text).to.includes("OK!");
    });
  });
});

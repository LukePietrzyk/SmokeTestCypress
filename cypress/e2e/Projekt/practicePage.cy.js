/// <reference types="cypress" />
import practicePageObjects from "../pageObject/practicePageObjects.cy.js";
const pageObject = new practicePageObjects();
let dane;
let sum = 0;
describe("Page for practice automation testing", () => {
  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.fixture("testData.json").then((data) => {
      console.log(data);
      dane = data;
    });
  });

  it("Check radioButton", () => {
    pageObject.radioBox().check("radio2").should("be.checked", "radio2");
  });
  it("Select option from dynamic menu", () => {
    pageObject.inputDynamicDropDown().should("be.visible").type("Pol");
    pageObject
      .elementDynamicDropDown()
      .should("be.visible")
      .each((el) => {
        const nameCountry = el.text();
        if (nameCountry === dane.country) {
          el.trigger("click");
        }
      });
  });
  it("Select from static menu", () => {
    pageObject
      .dropDownStatic()
      .select("Option1")
      .should("have.value", "option1");
  });
  it("Check and uncheck Checkbox with 3 options", () => {
    pageObject
      .checkboxAll()
      .check("option1", "option2")
      .should("be.checked")
      .and("be.visible");
    pageObject.checkboxAll().uncheck("option2").should("not.be.checked");
  });
  it("Test to check message from alerts", () => {
    pageObject.inputName().type(dane.name);
    pageObject.alertBtn().click();
    cy.on("window:alert", (str) => {
      expect(str).to.contain(
        `Hello ${dane.name}, share this practice page and share your knowledge`
      );
    });
    pageObject.inputName().type(dane.name);
    pageObject.confirmBtn().click();
    cy.on("window:confirm", (str) => {
      expect(str).to.contain(
        `Hello ${dane.name}, Are you sure you want to confirm?`
      );
    });
  });
  it("Remove atrr from element", () => {
    pageObject.openTabButton().invoke("removeAttr", dane.removeAtrr[0]);
    pageObject.openTabButton().should("not.have.attr", "target");
    pageObject.openTabButton().click();
  });
  it("Check price in table", () => {
    pageObject.secoundTableColumn().each((el, index) => {
      const txt = el.text();
      if (txt.includes("JMETER")) {
        pageObject
          .secoundTableColumn()
          .eq(index)
          .next()
          .then((price) => {
            let priceTxt = price.text();
            expect(priceTxt).to.eq("25");
          });
      }
    });
  });
  it("Check amount value with sum of amount in table ", () => {
    cy.get(".tableFixHead #product tr td:nth-child(4)")
      .each((el) => {
        let amount = el.text();
        let result1 = Number(amount);
        sum = Number(result1) + sum;
      })
      .then(() => cy.log(sum));
    cy.get(".totalAmount").then((el) => {
      let amount1 = el.text();
      let total = Number(amount1.replace(/\D/g, ""));
      cy.log(total, sum);
      expect(total).eq(sum);
    });
  });
});

/// <reference types="cypress" />
import pageObjectSumo from "../pageObject/pageObjectSumo.cy";
const pageObject = new pageObjectSumo();
let dane, sortedProperty;

function sortAndAssert(selector, sortingOption, propertyToSort) {
  cy.get(".product_sort_container").select(sortingOption);

  cy.get(selector).then(($elements) => {
    const propertyList = $elements.toArray().map((el) => {
      if (propertyToSort === "name") {
        return el.innerText;
      } else if (propertyToSort === "price") {
        return parseInt(el.innerText.replace("$", ""));
      }
    });
    if (sortingOption === "za") {
      return (sortedProperty = [...propertyList].sort().reverse());
    } else if (sortingOption === "az") {
      return (sortedProperty = [...propertyList].sort());
    }

    expect(propertyList).to.deep.equal(sortedProperty);
  });
}

describe("Page for practice automation testing", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    cy.fixture("sumoTestData.json").then((data) => {
      console.log(data);
      dane = data;
    });
  });
  it("Able to use different filters to sort products", () => {
    pageObject.userName(dane.UserName);
    pageObject.password(dane.password);
    pageObject.loginButton();

    //Sorting product from Z-A
    cy.get(".product_sort_container").select("za");
    cy.get(".inventory_item_name").then(($names) => {
      const productList = $names.toArray().map((el) => el.innerText);
      const sortedName = [...productList].sort().reverse();
      expect(productList).to.deep.equal(sortedName);
    });
    //Sorting product from A-Z
    cy.get(".product_sort_container").select("az");
    cy.get(".inventory_item_name").then(($names) => {
      const productList = $names.toArray().map((el) => el.innerText);
      const sortedProducts = [...productList].sort();
      expect(productList).to.deep.equal(sortedProducts);
    });
    //Sorting product depend on price - ASC
    cy.get(".product_sort_container").select("lohi");
    cy.get(".inventory_item_price").then(($prices) => {
      const priceList = $prices
        .toArray()
        .map((el) => parseInt(el.innerText.replace("$", "")));
      const sortedPrices = [...priceList].sort((a, b) => a - b);
      expect(priceList).to.deep.equal(sortedPrices);
    });
    //Sorting product depend on price - DESC
    cy.get(".product_sort_container").select("hilo");
    cy.get(".inventory_item_price").then(($prices) => {
      const priceList = $prices
        .toArray()
        .map((el) => parseInt(el.innerText.replace("$", "")));
      const sortedPrices = [...priceList].sort((a, b) => b - a);
      expect(priceList).to.deep.equal(sortedPrices);
    });
  });
});

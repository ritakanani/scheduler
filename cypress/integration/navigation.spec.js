describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");   // Visit the page at "/" (baseurl)
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/")      
      .contains("[data-testid=day]", "Tuesday")  // Find the element containing the text "Tuesday"
      .click()  // Click it
      .should("have.class", "day-list__item--selected");   // have particular class "day-list__item--selected"
  });
});
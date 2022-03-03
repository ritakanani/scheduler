describe("Appointements", () => {
  
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  
  it("should book an interview", () => {
      cy.get("[alt=Add]")
        .first()  // We need to use first because there are two Add buttons, we hide the second one because it is part of the last appointment, which we only want to display the header with the time.
        .click();

      cy.get("[data-testid=student-name-input]") // Find the input field
        .type("Lydia Miller-Jones");  // type the text "Lydia Miller-Jones"

      cy.get("[alt='Sylvia Palmer']")   // choose one of the interviewers
        .click(); // click on the interviewer with the name "Sylvia Palmer"

      cy.contains("Save")  // There is no testid or alt attribute on the save button. We will use the text content
        .click();

      // Save operation complete after 
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({force: true});

    cy.contains("Confirm")
      .click();

    cy.contains("Deleting")
      .should("exist");

    cy.contains("Deleting")
      .should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  
  });

});
describe("Login Page", () => {
  it("should load the login page and submit the form", () => {
    cy.visit("http://localhost:3000/login"); // Open the page
    cy.get('input[name="email"]').type("test@example.com"); // Type in input
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click(); // Click the submit button
    cy.url().should("include", "/dashboard"); // Check if redirected
  });
});

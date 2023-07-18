Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test-id=${selector}]`, ...args);
  });
Cypress.Commands.add('gui_login', () => {
    cy.viewport(1280, 1000)
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').should('be.visible').type(Cypress.env('username'))
    cy.get('[data-test="password"]').should('be.visible').type(Cypress.env('password'))
    cy.get('[data-test="login-button"]').should('be.visible').click()
})
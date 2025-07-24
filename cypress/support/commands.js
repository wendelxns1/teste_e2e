const username = Cypress.env('username_api');
const password = Cypress.env('password_api');

Cypress.Commands.add('api_login', () => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: {
            "email": username,
            "password": password
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('gui_login', () => {
    cy.viewport(1280, 1000)
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').should('be.visible').type(Cypress.env('username_gui'))
    cy.get('[data-test="password"]').should('be.visible').type(Cypress.env('password_gui'))
    cy.get('[data-test="login-button"]').should('be.visible').click()
})


Cypress.Commands.add('generateHeader',  (token) => {
    return {
        "Authorization": `${token}`,
      } 
})

Cypress.Commands.add('generateHeaderNoToken',  () => {
    return {
        "Authorization": '',
      } 
})

Cypress.Commands.add('generateHeaderInvalidToken',  () => {
    return {
        "Authorization": Cypress.env('tokenInvalido'),
      } 
})

Cypress.Commands.add('generateHeaderExpiredToken',  () => {
    return {
        "Authorization": Cypress.env('tokenExpirado'),
      } 
})
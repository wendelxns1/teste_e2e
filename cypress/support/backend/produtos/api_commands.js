// import { faker } from '@faker-js/faker';

Cypress.Commands.add('createProduct', (body, token) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
        body: body,
        headers: {
            "authorization": `${token}`
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getProducts', (token) => {
    cy.api({
        method: 'GET',
        url: 'http://localhost:3000/produtos',
        headers: {
            "Authorization": `${token}`
        }
    })
})

import { faker } from '@faker-js/faker';

Cypress.Commands.add('cadastroProduto', (header) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
       body: {
            "nome": faker.commerce.productName(),
            "preco": faker.number.int(),
            "descricao": faker.company.name(),
            "quantidade": faker.number.int()
        },
        headers: header,
        failOnStatusCode: false
    })
});

Cypress.Commands.add('cadastroProdutoDuplicado', (header) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
       body: {
            "nome": 'Logitech MX Vertical',
            "preco": faker.number.int(),
            "descricao": faker.company.name(),
            "quantidade": faker.number.int()
        },
        headers: header,
        failOnStatusCode: false
    })
});
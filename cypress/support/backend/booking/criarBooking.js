import { faker } from '@faker-js/faker';

Cypress.Commands.add('criarBooking', (header, today, tomorrow) => {
  cy.api({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    body: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.commerce.price(),
      depositpaid: true,
      bookingdates: {
        checkin: today,
        checkout: tomorrow
      },
      additionalneeds: 'Teste'
    },
    headers: header,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('validarBooking', (header,firstName) => {
  cy.api({
    method: 'GET',
    url: `https://restful-booker.herokuapp.com/booking/?firstname=${firstName}`,
    headers: header,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('criarBookingBodyVazio', (header) => {
  cy.api({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    body:{},
    headers: header,
    failOnStatusCode: false
  });
})

Cypress.Commands.add('criarBookingBodyInvalido', (header, today, tomorrow) => {
  cy.api({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    body: {
      primeirNomeTeste: faker.person.firstName(),
      segundoNomeTeste: faker.person.lastName(),
      totalprice: faker.commerce.price(),
      depositpaid: true,
      bookingdates: {
        checkin: today,
        checkout: tomorrow
      },
      additionalneeds: 'Teste'
    },
    headers: header,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('validarBookingInexistente', (header) => {
  cy.api({
    method: 'GET',
    url: 'https://restful-booker.herokuapp.com/booking/?firstname=wendinhodoteste',
    headers: header,
    failOnStatusCode: false
  });
});
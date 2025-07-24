///<reference types = "cypress" />
describe('Teste E2E - Realização de um pedido com sucesso', () => {
    before(() => {
        cy.gui_login()
    });
    describe('Dado que o usuário acessa a área de produtos', () => {
        context('Quando o usuário adiciona produtos ao carrinho', () => {
            it('Então a compra deve ser finalizada com sucesso', () => {
                cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
                cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
                cy.get('[data-test="shopping-cart-link"]').should('be.visible').click()
                cy.url('https://www.saucedemo.com/cart.html').should('eq', 'https://www.saucedemo.com/cart.html')
                cy.contains('Sauce Labs Backpack').should('be.visible')
                cy.get('[data-test="checkout"]').should('be.visible').click()
                cy.url('https://www.saucedemo.com/checkout-step-one.html').should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
                cy.get('[data-test="firstName"]').should('be.visible').type('Wendel')
                cy.get('[data-test="lastName"]').should('be.visible').type('Silva')
                cy.get('[data-test="postalCode"]').should('be.visible').type('00000001')
                cy.get('[data-test="continue"]').should('be.visible').click()
                cy.url('https://www.saucedemo.com/checkout-step-two.html').should('eq', 'https://www.saucedemo.com/checkout-step-two.html')
                cy.get('[data-test="payment-info-value"]').should('be.visible')
                cy.get('[data-test="shipping-info-value"]').should('be.visible')
                cy.get('[data-test="subtotal-label"]').should('be.visible')
                cy.get('[data-test="tax-label"]').should('be.visible')
                cy.get('[data-test="total-label"]').should('be.visible')
                cy.get('[data-test="finish"]').should('be.visible').click()
                cy.get('[data-test="complete-header"]').should('be.visible')
                cy.contains('Thank you for your order!').should('be.visible')
                cy.get('[data-test="back-to-products"]').should('be.visible').click()
            });
        });
    });
});
import { faker } from '@faker-js/faker';
let token

let body = {
    nome: faker.commerce.productName() + Math.floor(Math.random() * 10000000),
    email: faker.internet.email(),
    password: "teste",
    administrador: "true",
}
describe('Validar criação de Usuário', () => {
    before(() => {
        cy.api_login().then((res) => {
            token = res.body.authorization
        })
    })
    describe('Dado que usuário deseja realizar o cadastro de Users', () => {
        context('Quando dados de Users são preenchidos corretamente', () => {
            it('Então o usuário deve ser criado com sucesso', () => {
                cy.createUsers(body, token).then((res) => {
                    expect(res.status).to.eq(201);
                    expect(res.body._id).to.not.be.null;
                    expect(res.body.message).eq("Cadastro realizado com sucesso")
                });
            });
        });
    });
});
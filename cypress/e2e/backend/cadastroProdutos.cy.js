let token
describe('Teste API - Validar a criação de um produto', () => {
    before(() => {
        cy.api_login().then((response) => {
            token = response.body.authorization
        });
    });
    describe('Dado que o usuário está autenticado e deseja cadastrar um novo produto via API', () => {
        context('Quando envia uma requisição com todos os campos obrigatórios preenchidos corretamente', () => {
            it('Então o produto deve ser cadastrado com sucesso e retornar status 201', () => {
                cy.generateHeader(token).then(header => {
                    cy.cadastroProduto(header).then((response) => {
                        expect(response.status).to.eq(201);
                        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                        expect(response.body._id).to.eq(response.body._id);
                    });
                });
            });
        });
    });
    describe('Dado que o usuário não possui acesso a área de cadastro de produtos', () => {
        context('Quando envio requisição com token inválido', () => {
            it('Então erro 401 deve ser apresentado no console', () => {
                cy.generateHeaderInvalidToken().then(header => {
                    cy.cadastroProduto(header).then((response) => {
                        expect(response.status).to.eq(401);
                        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
                    });
                });
            });
        });
        context('Quando envio requisição com token vazio', () => {
            it('Então erro 401 deve ser apresentado no console', () => {
                cy.generateHeaderNoToken().then(header => {
                    cy.cadastroProduto(header).then((response) => {
                        expect(response.status).to.eq(401);
                        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
                    });
                });
            });
        });
        context('Quando envio requisição com token expirado', () => {
            it('Então erro 401 deve ser apresentado no console', () => {
                cy.generateHeaderExpiredToken().then(header => {
                    cy.cadastroProduto(header).then((response) => {
                        expect(response.status).to.eq(401);
                        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
                    });
                });
            });
        });
    });
});
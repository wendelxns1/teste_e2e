import { faker } from '@faker-js/faker';
let token

let body = {
    nome: faker.commerce.productName() + Math.floor(Math.random() * 10000000),
    preco: faker.number.int({ min: 1, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 100 }),
}

describe('Validação de criação de Produtos', () => {
    before(() => {
        cy.api_login().then((res) => {
            token = res.body.authorization
        })
    })

    describe('Dado que usuário deseja realizar a criação de um produto', () => {
        context('Quando dados do produto são adicionados corretamente', () => {
            it('Então produto é cadastrado com sucesso', () => {
                cy.createProduct(body, token).then((res) => {
                    expect(res.status).to.eq(201)
                    expect(res.body.message).to.eq('Cadastro realizado com sucesso')
                    expect(res.body._id).is.not.null
                })
            })
        })
        context('Quando preço do produto é adicionado incorretamente', () => {
            it('Então erro 400 deve ser apresentado no response', () => {
                cy.createProduct({ ...body, preco: -1 }, token).then((res) => {
                    expect(res.status).to.eq(400)
                    expect(res.body.preco).to.eq('preco deve ser um número positivo')
                })
            })
        })
        context('Quando produto é criado com nome duplicado', () => {
            it('Então erro 400 deve ser apresentado no response', () => {
                cy.getProducts(token).then((res) => {
                    return {
                        nomeDuplicado: res.body.produtos[0].nome
                    }
                }).then(({ nomeDuplicado }) => {
                    cy.createProduct({ ...body, nome: nomeDuplicado}, token).then((res) => {
                        expect(res.status).to.eq(400)
                        expect(res.body.message).to.eq('Já existe produto com esse nome')
                    })
                })
            });
        });
        context('Quando quantidade é adicionada incorretamente', () => {
            it('Então erro 400 deve ser apresentado no response', () => {
                cy.createProduct({ ...body, quantidade: -1 }, token).then((res) => {
                    expect(res.status).to.eq(400)
                    expect(res.body.quantidade).to.eq('quantidade deve ser maior ou igual a 0')
                })
            });
        });
    })
})
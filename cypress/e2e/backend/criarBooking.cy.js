let token
import dayjs from 'dayjs';
const today = dayjs().format('YYYY-MM-DD');
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

describe('Teste API - Validar a criação de um produto', () => {
    before(() => {
        cy.api_login().then((response) => {
            token = response.body.token;
        });
    });
    describe('Dado que usuário deseja efetuar a criação de um booking', () => {
        context('Quando usuário pesquisa por booking criado', () => {
            it('Então booking cadastrado é apresentado na listagem corretamente', () => {
                cy.generateHeader(token).then((header) => {
                    cy.criarBooking(header, today, tomorrow).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.bookingid).to.exist;
                        expect(response.body.booking.firstname).to.exist;
                        expect(response.body.booking.lastname).to.exist;
                        expect(response.body.booking.totalprice).to.exist;
                        expect(response.body.booking.depositpaid).to.be.true;
                        expect(response.body.booking.bookingdates.checkin).to.eq(today);
                        expect(response.body.booking.bookingdates.checkout).to.eq(tomorrow);
                        return {
                            header,
                            idBooking: response.body.bookingid,
                            firstName: response.body.booking.firstname
                        };
                    }).then(({ header, idBooking, firstName }) => {
                        cy.validarBooking(header, firstName).then((response) => {
                            expect(response.body[0].bookingid).to.eq(idBooking);
                        });
                    });
                });
            });
        });
        context('Quando usuário envia requisição com body vazio', () => {
            it('Então erro 500 é apresentado corretamente', () => {
                cy.generateHeader(token).then((header) => {
                    cy.criarBookingBodyVazio(header).then((response) => {
                        expect(response.status).to.eq(500);
                        expect(response.body).to.eq('Internal Server Error');
                    });
                });
            });
        });
        context('Quando usuário envia requisição com body inválido', () => {
            it('Então erro 500 é apresentado corretamente', () => {
                cy.generateHeader(token).then((header) => {
                    cy.criarBookingBodyInvalido(header, today, tomorrow).then((response) => {
                        expect(response.status).to.eq(500);
                        expect(response.body).to.eq('Internal Server Error');
                    });
                });
            });
        });
    });
    describe('Dado que usuário deseja efetuar uma busca por um booking', () => {
        context('Quando usuário adiciona um nome inexistente na busca', () => {
            it('Então lista é retornada vazia corretamente', () => {
                cy.generateHeader(token).then((header) => {
                    cy.validarBookingInexistente(header).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.be.an('array').that.is.empty;
                    });
                });
            });
        });
    });
});
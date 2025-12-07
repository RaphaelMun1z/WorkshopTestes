/// <reference types="cypress" />

describe('Teste Fixture', () => {
    it('Deve carregar um usuário de um arquivo JSON', () => {
        cy.fixture('userData').as('usuario').then(function() {
            // Acessa a página de login
            cy.visit('login.html');
            // Preenche o campo de email com o valor do fixture
            cy.get('#email').type(this.usuario.email);
            // Preenche o campo de senha com o valor do fixture
            cy.get('#password').type(this.usuario.password);
            // Clica no botão de login
            cy.get('.btn-submit').click();
        });
    });
});
/// <reference types="cypress" />

describe('Teste Cypress Basic', () => {
    it('Visita a página e captura o título', () => {
        cy.visit('http://127.0.0.1:5500/');
        
        // cy.title().should('be.equal', 'Portal de Extensão - Catálogo de Cursos');
        // cy.title().should('contain', 'Extensão');
        
        cy.title()
        .should('be.equal', 'Portal de Extensão - Catálogo de Cursos')
        .and('contain', 'Extensão').debug();
    });
    
    it.only('Busca por um botão e clica', () => {
        cy.visit('http://127.0.0.1:5500/');
        
        // Pega o primeiro botão com o id 'btn-more-info' e clica
        cy.pause();
        cy.get('#btn-more-info').first().click();
        cy.get('#details-modal').should('not.have.class', 'hidden');
    });
});
/// <reference types="cypress" />

describe('Cadastro de Eventos', () => {
  it.only('Deve acessar a página inicial e cadastrar um novo evento com sucesso', () => {
    // Primeira parte
    cy.visit('login.html');
    cy.get('#email').type('admin@ufu.br').should('have.value', 'admin@ufu.br');
    cy.get('#password')
      .type('tms-melhor-disciplina')
      .should('have.value', 'tms-melhor-disciplina');

    // Interação/Clique no botão de mostrar/ocultar senha
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('.eye-toggle[data-toggle-target="password"]')
      .should('have.attr', 'type', 'button')
      .click();
    cy.wait(2000);
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.eye-toggle[data-toggle-target="password"]').click();
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('.btn-submit').should('be.visible').click();

    // Segunda parte (Desafio)
    cy.contains('button', 'Novo Evento', { timeout: 5000 }).click();

    cy.get('#admin-title')
      .type('Curso de Cypress')
      .should('have.value', 'Curso de Cypress');
    cy.get('#admin-category')
      .select('tecnologia')
      .should('have.value', 'tecnologia');

    cy.get('#admin-type').select('Híbrido').should('have.value', 'Híbrido');
    cy.get('input[name="admin-audience"][value="estudantes"]')
      .check()
      .should('be.checked');
    cy.get('#admin-description')
      .type('Curso introdutório de testes e2e utilizando a ferramenta Cypress.')
      .should(
        'have.value',
        'Curso introdutório de testes e2e utilizando a ferramenta Cypress.',
      );
    cy.get('#admin-date').type('2025-12-10').should('have.value', '2025-12-10');
    cy.get('#admin-time').type('14:00').should('have.value', '14:00');
    cy.get('#admin-location')
      .type('Lab 02 - UFU - MC')
      .should('have.value', 'Lab 02 - UFU - MC');
    cy.get('#admin-hours').type('50 min').should('have.value', '50 min');
    cy.get('#admin-prereq-select')
      .select('Mínimo 2º período')
      .should('contain.text', 'Mínimo 2º período');

    cy.contains('.admin-submit', 'Cadastrar Evento').click();
  });
});

/// <reference types="cypress" />

describe('Cadastro de Eventos', () => {
  it.only('Deve acessar a página inicial e cadastrar um novo evento com sucesso', () => {
    // Primeira parte
    cy.visit('login.html');
    cy.get('#email').type('admin@ufu.br').should('have.value', 'admin@ufu.br');
    cy.get('#password')
      .type('tms-melhor-disciplina')
      .should('have.value', 'tms-melhor-disciplina');
    cy.get('.btn-submit').should('be.visible').click();

    // Segunda parte
    cy.contains('button', 'Novo Evento', { timeout: 5000 }).click();

    cy.get('#admin-title').type('Curso de Cypress');
    cy.get('#admin-category').select('tecnologia');

    cy.get('#admin-type').select('Híbrido');
    cy.get('input[name="admin-audience"][value="estudantes"]').check();
    cy.get('#admin-description').type(
      'Curso introdutório de testes e2e utilizando a ferramenta Cypress.',
    );
    cy.get('#admin-date').type('2025-12-10');
    cy.get('#admin-time').type('14:00');
    cy.get('#admin-location').type('Lab 02 - UFU - MC');
    cy.get('#admin-hours').type('50 min');
    cy.get('#admin-prereq-select').select('Mínimo 2º período');

    // Valida preenchimento
    cy.get('#admin-title').should('have.value', 'Curso de Cypress');
    cy.get('#admin-category').should('have.value', 'tecnologia');
    cy.get('#admin-type').should('have.value', 'Híbrido');
    cy.get('input[name="admin-audience"][value="estudantes"]').should(
      'be.checked',
    );
    cy.get('#admin-description').should(
      'have.value',
      'Curso introdutório de testes e2e utilizando a ferramenta Cypress.',
    );
    cy.get('#admin-date').should('have.value', '2025-12-10');
    cy.get('#admin-time').should('have.value', '14:00');
    cy.get('#admin-location').should('have.value', 'Lab 02 - UFU - MC');
    cy.get('#admin-hours').should('have.value', '50 min');

    cy.contains('.admin-submit', 'Cadastrar Evento').click();
  });
});

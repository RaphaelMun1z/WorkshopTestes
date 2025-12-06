/// <reference types="cypress" />

describe('Helper Functions', () => {
    it('Wrap', () => {
        const obj = { nome: 'Neymar', idade: 32 };
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property', 'nome');
        
        cy.visit('login.html');
        cy.get('#email').then($el => {
            cy.wrap($el).type('Funcionou');
        });
        
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10);
            }, 500);
        });
        
        cy.get('.btn-submit').then(() => console.log('Encontrou o primeiro botão'));
        // promise.then(num => { console.log(num); });
        cy.wrap(promise).then(num => { console.log(num); });
        cy.get('.recover-link').then(() => console.log('Encontrou o segundo botão'));
        
        cy.wrap(1).then(() => { return 2; }).should('be.equal', 2);
    });
    
    it('Its', () => {
        const obj = { nome: 'Neymar', idade: 32 };
        cy.wrap(obj).its('nome').should('be.equal', 'Neymar');
        
        const obj2 = { nome: 'CR7', idade: 36, endereco: { rua: 'Rua dos Jogadores', numero: 0 } };
        cy.wrap(obj2).its('endereco').should('have.property', 'rua');
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'Jogadores');
        cy.wrap(obj2).its('endereco.rua').should('contain', 'Jogadores');
        
        cy.visit('index.html');
        cy.title().its('length').should('be.above', 20);
    });
    
    it.only('Invoke', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;
        
        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1);
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7);
        
        cy.visit('login.html');
        cy.get('#email').invoke('val', 'Teste invoke');

        cy.window().invoke('alert', 'Alert via invoke');
    });
});
/// <reference types="cypress" />

/**
* Suite de Testes: Elementos Básicos
*/
describe('Teste de Elementos Básicos', () => {
    before(() => {
        console.log("Before: Iniciando os testes de elementos básicos");       
    })
    
    /**
    * Contexto: Página Inicial (index.html)
    * O 'context' (alias para describe) ajuda a agrupar testes que rodam na mesma página.
    */
    context('Página Inicial', () => {
        beforeEach(() => {
            cy.visit('index.html');
            console.log("Visitei a página inicial");
        });
        
        it('Deve exibir o título correto da seção', () => {
            cy.get('.section-title')
            .should('have.text', 'Atividades Complementares')
            .and('contain', 'Complementares');
        });
        
        it('Deve confirmar pré-requisito no primeiro curso', () => {
            cy.get('.course-card').first()
            .find(".course-prereq")
            .should('contain', 'Pré-requisito');
        });
        
        it('Deve confirmar ausência de pré-requisito no segundo curso', () => {
            // eq(1) pega o segundo elemento (índice começa em 0)
            cy.get('.course-card').eq(1)
            .find(".course-prereq")
            .should('contain', 'Sem pré-requisitos');
        });
        
        it('Deve ter links apontando para o local correto', () => {
            cy.get('.brand-link').should('have.attr', 'href', 'index.html');
        });
        
        it('Deve verificar atributos do botão de inscrição', () => {
            cy.get('.course-card').first()
            .find('.btn-primary')
            .should('have.text', 'Inscrever-se'); 
            
            cy.get('.course-card').first()
            .find('.btn-primary')
            .should('have.attr', 'onclick', 'openEnrollment(1)');
        });
    });
    
    /**
    * Contexto: Página de Login (login.html)
    */
    context('Página de Login', () => {
        beforeEach(() => {
            cy.visit('login.html');
            console.log("Visitei a página de login");
        });
        
        // CORREÇÃO: Removido o .only para que os outros testes voltem a rodar
        it('Deve preencher os campos de email e senha corretamente', () => {
            
            // Valida estado inicial (vazio)
            cy.get('#email').should('have.value', '');
            cy.get('#password').should('have.value', '');
            
            // Interação com Email
            cy.get('#email')
            .should('have.attr', 'placeholder', 'nome.sobrenome@ufu.br')
            .and('have.attr', 'type', 'email')
            .type('meu.nome@ufu.br')
            .should('have.value', 'meu.nome@ufu.br'); // Valida se o texto foi digitado
            
            // Interação com Senha
            cy.get('#password')
            .should('have.attr', 'placeholder', '••••••••')
            .and('have.attr', 'type', 'password')
            .type('tms-melhor-disciplina') // Exemplo de preenchimento
            .should('have.value', 'tms-melhor-disciplina');
            
            cy.get('.eye-toggle').should('have.attr', 'type', 'button').click();
            cy.wait(2000);
            cy.get('.eye-toggle').should('have.attr', 'type', 'button').click();
        });
        
    });
    
    context.only('Deve realizar login como Administrador e criar um novo evento', () => {
        beforeEach(() => {
            cy.visit('login.html');
            console.log("Visitei a página de login");
        });
        
        it('Deve preencher os campos de login e submeter o formulário', () => {
            cy.get('#email')
            .type('admin@ufu.br');
            
            cy.get('#password')
            .type('admin123');
            
            cy.wait(1000);
            cy.get('.btn-submit').click();
            
            cy.wait(1000);
            cy.get('.admin-btn').click();
            
            cy.wait(1000);
            cy.get('#admin-category').select('Tecnologia')
            .should('have.value', 'Tecnologia');
            
            
            cy.wait(1000);
            cy.get('#admin-type').select('Online')
            .should('have.value', 'Remoto');
            
        });
    });
});
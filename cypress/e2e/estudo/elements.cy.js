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
    
    context('Deve realizar login como Administrador e criar um novo evento', () => {
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
            
            cy.get('#mult-select')
            .select(['Segundo período', 'Conhecimento em Java']);
        });
        
        it.only('Deve criar um novo evento', () => {
            cy.get('#email')
            .type('admin@ufu.br');
            
            cy.get('#password')
            .type('admin123');
            
            cy.wait(500);
            cy.get('.btn-submit').click();
            
            cy.wait(500);
            cy.get('.admin-btn').click();
            
            // Select simples
            cy.wait(500);
            cy.get('#admin-category')
            .select('Tecnologia')
            .should('have.value', 'tecnologia');
            
            cy.wait(500);
            cy.get('#admin-type')
            .select('Online')
            .should('have.value', 'Online');
            
            // Select múltiplo
            cy.get('#admin-prereq-select option').should('have.length', 8);
            
            cy.get('#admin-prereq-select option').then($arr => {
                const values = [];
                $arr.each(function(){
                    values.push(this.innerHTML);
                });
                expect(values).to.include.members(["Selecione ou adicione","Mínimo 2º período","Conhecimento em Java","Algoritmos e Estruturas de Dados","Banco de Dados básico","Inglês técnico","Experiência em pesquisa","Disponibilidade noturna"]);
            });
            
            cy.get('#admin-prereq-select').select('Mínimo 2º período');
            cy.get('#admin-prereq-select').select('Conhecimento em Java');
            
            cy.get('#admin-prereq-chips .admin-chip').should('have.length', 2);

            cy.get('#admin-prereq-chips .admin-chip').then($chips => {
                const chipTexts = $chips.map((index, htmlElement) => {
                    return Cypress.$(htmlElement).text().replace('×', '').trim();
                }).get();
                
                expect(chipTexts).to.have.members([
                    'Mínimo 2º período',
                    'Conhecimento em Java'
                ]);
            });
        });
        
        it('Deve aguardar o elemento estar disponível antes de interagir', () => {
            cy.get('#password').should('be.visible').click();
        });
        
        it('Deve fazer retrys até o elemento estar disponível', () => {
            cy.get('#password').should('exist').type('teste123'); 
        });
        
        it("Uso do timeout", () => {
            cy.get('#password', { timeout: 2000 }).should('exist').click();
        });
    });
    
    context('Should vs Then', () => {
        it('Deve demonstrar a diferença entre should e then', () => {
            cy.visit('index.html');
            
            // Uso do then (síncrono, encadeado)
            cy.get('.section-title').then(($el) => {
                expect($el).to.have.text('Atividades Complementares');
            });
            
            // Uso do should (assíncrono, reativo)
            cy.get('.section-title').should(($el) => {
                expect($el).to.have.text('Atividades Complementares');
            });
        });
    });
});
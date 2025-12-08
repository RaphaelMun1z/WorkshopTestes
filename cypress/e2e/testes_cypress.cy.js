/// <reference types="cypress" />

describe('Teste Cypress', () => {
    it('Deve acessar a página de login, preencher os campos de email e senha corretamente', () => {
        // Acessa a página de login
        cy.visit('login.html');
        
        // Exibir o título da página no console
        cy.title().then(title => {
            console.log('Título da página:', title);
        });
        
        // Valida o título da página
        cy.title()
        .should('be.equal', 'Portal Aluno - Login')
        .and('contain', 'Login');
        
        // o .get é para capturar o elemento na página
        // Valida estado inicial (vazio)
        cy.get('#email').should('have.value', ''); // deve('ter.valor', 'vazio')
        cy.get('#password').should('have.value', ''); // deve('ter.valor', 'vazio')
        
        // Interação com Email
        cy.get('#email') // Seleciona o input via ID
        // .deve('ter.atributo', 'nome-atributo', 'valor')
        .should('have.attr', 'placeholder', 'nome.sobrenome@ufu.br') 
        // e deve.('ter atributo', 'nome-atributo', 'valor')
        .and('have.attr', 'type', 'email')
        // type é a ação de digitar no campo selecionado
        .type('admin@ufu.br')
        // deve('ter.valor', 'valor')
        .should('have.value', 'admin@ufu.br'); // Valida se o texto foi digitado
        
        // Interação com Senha
        cy.get('#password')
        // .deve('ter.atributo', 'nome-atributo', 'valor')
        .should('have.attr', 'placeholder', '••••••••')
        // e deve.('ter atributo', 'nome-atributo', 'valor')
        .and('have.attr', 'type', 'password')
        // type é a ação de digitar no campo selecionado
        .type('tms-melhor-disciplina') // Exemplo de preenchimento
        .should('have.value', 'tms-melhor-disciplina'); // Valida se o texto foi digitado
        
        // Interação/Clique no botão de mostrar/ocultar senha
        // Nesse caso é botão é capturado pela classe
        // Verifica tem o atributo 'type' igual a 'button' e clica
        cy.get('.eye-toggle').should('have.attr', 'type', 'button').click(); 
        cy.wait(2000); // Espera 2 segundos para ver a senha
        // Clica novamente para ocultar a senha
        cy.get('.eye-toggle').should('have.attr', 'type', 'button').click();
        
        // Validação do botão de submit
        cy.get('.btn-submit').should('have.attr', 'type', 'submit').click();
        
        // Exibir o título da nova página no console
        cy.title().then(title => {
            console.log('Título da nova página:', title);
        });
        
        // Valida o título da página
        cy.title()
        .should('be.equal', 'Portal de Extensão - Catálogo de Cursos')
        .and('contain', 'Catálogo de Cursos');
    });
    
    it.only('Deve acessar a página inicial e cadastrar um novo evento com sucesso', () => {
        // 1. FAZER LOGIN COMO ADMINISTRADOR
        cy.visit('login.html');
        cy.get('#email')
        .type('admin@ufu.br')
        .should('have.value', 'admin@ufu.br'); // Valida email digitado
        cy.get('#password')
        .type('tms-melhor-disciplina');
        cy.get('.btn-submit')
        .should('be.visible') // Valida se o botão de login está visível
        .click(); 
        
        
        // 2. ACESSAR FORMULÁRIO DE CADASTRO
        
        // Validação:
        // - Verifique se a URL contém '/index.html' (cy.url().should('include', ...)).
        
        // Instrução:
        // - Clique no botão de criar novo evento (classe '.admin-btn').
        
        // Validação:
        // - Verifique se o modal de cadastro está visível e contém o título 'Cadastrar Novo Evento' (classe '.admin-modal-title').
        
        
        // 3. PREENCHER DADOS BÁSICOS
        
        // Instruções:
        // - Preencha o título (ID '#admin-title') com "Curso de Cypress".
        // - Selecione a categoria (ID '#admin-category') com o valor "Tecnologia".
        // - Selecione o formato (ID '#admin-type') com o valor "Híbrido".
        // - Marque o público alvo 'Estudantes' (input[name="admin-audience"][value="estudantes"]).
        // - Preencha a descrição (ID '#admin-description') com um texto introdutório.
        // - Preencha a data (ID '#admin-date') com "2025-12-10".
        // - Preencha o local (ID '#admin-location') com "Lab 02 - UFU - MC".
        // - Preencha a carga horária (ID '#admin-hours') com "50 min".
        // - Preencha o horário (ID '#admin-time') com "14:00".
        
        
        // 4. PRÉ-REQUISITOS (VALIDAÇÃO E SELEÇÃO MÚLTIPLA)
        
        // Validação de Conteúdo (CÓDIGO OBRIGATÓRIO):
        // Você deve garantir que o dropdown de pré-requisitos (ID '#admin-prereq-select') possui 8 opções
        
        cy.get('#admin-prereq-select option').then($arr => {
            const values = [];
            $arr.each(function(){ values.push(this.innerHTML); });
            expect(values).to.include.members(["Selecione ou adicione","Mínimo 2º período","Conhecimento em Java","Algoritmos e Estruturas de Dados","Banco de Dados básico","Inglês técnico","Experiência em pesquisa","Disponibilidade noturna"]);
        });
        
        
        // Instruções (Seleção Múltipla):
        // - Selecione o pré-requisito 'Mínimo 2º período'.
        // - Selecione o pré-requisito 'Conhecimento em Java'.
        
        // Validação:
        // - Verifique se foram adicionados **2 chips** de pré-requisitos (classe '.admin-chip').
        
        
        // 5. SUBMETER O FORMULÁRIO E VALIDAR SUCESSO
        
        // Instrução:
        // - Clique no botão de submissão (classes ".admin-actions-row .admin-submit").
        
        // Validação Final:
        // - Intercepte o evento `window:alert` para validar se a mensagem de sucesso "Evento criado e publicado." foi exibida.
        // - Verifique se o evento recém-criado ("Curso de Cypress") está visível na listagem de cards (classe '.course-card').
    });
});
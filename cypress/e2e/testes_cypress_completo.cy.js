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
        // Faz o login como Administrador
        cy.visit('login.html');
        cy.get('#email')
        .type('admin@ufu.br')
        .should('have.value', 'admin@ufu.br'); // Valida email digitado
        cy.get('#password')
        .type('tms-melhor-disciplina');
        cy.get('.btn-submit')
        .should('be.visible') // Valida se o botão de login está visível
        .click(); 
        
        // Validação da navegação para 'index'
        cy.url().should('include', '/index.html');

        cy.wait(1000);
        
        // VALIDAÇÃO: Verifica se o botão "Novo Evento" está visível (apenas Admin)
        cy.get('.admin-btn').should('be.visible').click();
        
        // VALIDAÇÃO: Verifica se o modal de criação de evento apareceu
        cy.get('.admin-modal-card').should('be.visible');
        
        // Preenche o formulário de criação de evento
        
        // Preenche o campo de título do evento
        const eventTitle = "Curso de Cypress";
        cy.get('#admin-title').type(eventTitle).should('have.value', eventTitle); // Valida texto do título
        
        // Preenche o campo de categoria do evento
        cy.get("#admin-category").select("Tecnologia").should('have.value', 'tecnologia'); // Valida a seleção
        
        // Seleciona o formato do evento
        cy.get("#admin-type").select("Híbrido").should('have.value', 'Híbrido'); // Valida a seleção
        
        // Seleiona o público alvo
        cy.get('input[name="admin-audience"][value="estudantes"]').check().should('be.checked'); // Valida se o radio foi marcado
        
        // Preenche a descrição do evento
        const descriptionText = "Curso introdutório de testes e2e utilizando a ferramenta Cypress.";
        cy.get('#admin-description').type(descriptionText).should('have.value', descriptionText); // Valida a descrição
        
        // Preenche a data do evento
        cy.get("#admin-date").type("2025-12-10").should('have.value', '2025-12-10'); // Valida a data
        
        // Preenche o local do evento
        const eventLocation = "Lab 02 - UFU - MC";
        cy.get("#admin-location").type(eventLocation).should('have.value', eventLocation); // Valida o local
        
        // Carga horária do evento
        const eventHours = "50 min";
        cy.get("#admin-hours").type(eventHours).should('have.value', eventHours); // Valida a carga horária
        
        // Preenche o horário do evento
        cy.get("#admin-time").type("14:00").should('have.value', '14:00'); // Valida o horário
        
        // Pré-requisitos do evento
        // Valida a quantidade de opções disponíveis
        cy.get('#admin-prereq-select option').should('have.length', 8);
        
        // Valida os valores das opções disponíveis
        cy.get('#admin-prereq-select option').then($arr => {
            const values = [];
            $arr.each(function(){
                values.push(this.innerHTML);
            });
            expect(values).to.include.members(["Selecione ou adicione","Mínimo 2º período","Conhecimento em Java","Algoritmos e Estruturas de Dados","Banco de Dados básico","Inglês técnico","Experiência em pesquisa","Disponibilidade noturna"]);
        });
        
        // Seleciona múltiplos pré-requisitos
        cy.get('#admin-prereq-select').select('Mínimo 2º período');
        cy.get('#admin-prereq-select').select('Conhecimento em Java');
        
        // Valida se os pré-requisitos foram adicionados corretamente
        cy.get('#admin-prereq-chips .admin-chip').should('have.length', 2)
        .first().should('contain.text', 'Mínimo 2º período'); // Valida o texto do primeiro chip
        
        // Submete o formulário de criação de evento
        // Validação extra: verifica o texto do botão antes de clicar
        cy.get(".admin-actions-row .admin-submit")
        .should('contain.text', 'Cadastrar Evento') // Valida o texto do botão
        .should("have.attr", "type", "submit")
        .click();
        
        // VALIDAÇÃO FINAL: Verifica a mensagem de sucesso
        cy.on('window:alert', (text) => {
            expect(text).to.include('Evento criado e publicado.');
        });
        
        // Valide se o evento aparece na página inicial
        cy.contains('.course-card', eventTitle).should('be.visible');
    });
});
/// <reference types="cypress" />

/**
 * Suite de Testes: Portal de Extensão
 * O 'describe' agrupa testes relacionados a uma funcionalidade ou página específica.
 */
describe('Suite de Testes: Portal de Extensão', () => {

    /**
     * Teste 01: Validação de Título
     * Verifica se a página carrega e se o título da aba do navegador está correto.
     */
    it('Deve carregar a página principal e validar o título da aba', () => {
        // Visita a URL relativa (definida no cypress.config.js) ou absoluta
        cy.visit('index.html');
        
        // Validação encadeada (Chained Assertion):
        // 1. Pega o título da página.
        // 2. Verifica se é estritamente igual ao texto esperado.
        // 3. Verifica se contém a palavra 'Extensão'.
        cy.title()
            .should('be.equal', 'Portal de Extensão - Catálogo de Cursos')
            .and('contain', 'Extensão');
            
        // .debug() imprime informações no console do navegador para ajudar a encontrar erros.
        // Deve ser removido ou comentado antes de subir o código.
        // cy.title().debug(); 
    });
    
    /**
     * Teste 02: Interação com Elementos (Botão e Modal)
     * Verifica se ao clicar no botão, o modal deixa de estar oculto.
     * Use 'it.only' apenas para isolar um teste durante o desenvolvimento.
     */
    it('Deve abrir o modal de detalhes ao clicar no primeiro botão de "Mais Informações"', () => {
        cy.visit('index.html');
        
        // .pause() para a execução do teste permitindo navegar passo a passo na interface do Cypress.
        // Útil para ver o estado da aplicação antes da ação.
        // cy.pause();

        // 1. Busca pelo seletor CSS do botão (#btn-more-info).
        // 2. Como podem existir vários botões com classes/ids similares, pegamos o primeiro (.first()).
        // 3. Executa a ação de clique.
        cy.get('#btn-more-info').first().click();

        // Asserção de visibilidade:
        // Verifica se o modal (#details-modal) NÃO possui a classe 'hidden'.
        // Isso confirma que o modal está visível para o usuário.
        cy.get('#details-modal').should('not.have.class', 'hidden');
    });
});
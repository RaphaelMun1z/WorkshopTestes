describe('Testes com Arrow Functions', () => {
	
	/**
	* Teste: Sintaxe Básica
	* Demonstra que para testes simples (sem uso de 'this'), as Arrow Functions funcionam perfeitamente.
	*/
	it('Deve executar um comando simples (console.log) usando arrow function', () => {
		// O console.log imprime a mensagem no Console do Navegador (DevTools / F12).
		// Ele não aparece na lista de comandos visual do Cypress (lado esquerdo).
		console.log("Função Arrow executada!");
	});
});
describe('Teste de promises', () => {
	
	/**
	* Teste: Execução de Promise
	* Verifica a ordem dos logs no console do navegador (F12) para entender o Event Loop.
	* Ordem Esperada: 
	* 1. "init" (Síncrono)
	* 2. "end" (Síncrono)
	* 3. "Something is 13" (Assíncrono - após a promise resolver)
	*/
	it('Deve logar a execução síncrona e assíncrona corretamente', () => {
		system();
	});
});

/**
* Simula uma operação assíncrona (como uma requisição ao servidor).
* Retorna uma Promise que resolve com o valor 13 após 1 segundo (1000ms).
*/
const getSomething = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(13);
		}, 1000);
	});
};

/**
* Função do Sistema
* Demonstra o fluxo de execução do JavaScript:
* O código síncrono (console.log "init" e "end") roda primeiro.
* A promise (getSomething) é agendada e seu .then() só roda quando ela resolve.
*/
const system = () => {
	console.log("init");
	getSomething().then((some) => {
		console.log(`Something is ${some}`);
	});
	console.log("end");
};
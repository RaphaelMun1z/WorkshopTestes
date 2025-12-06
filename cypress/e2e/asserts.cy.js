/// <reference types="cypress" />

/**
* Suite de Testes: Asserções (Unitários)
*/
describe('Teste de Asserts', () => {
	
	it('Teste igualdade', () => {
		const a = 1;
		
		expect(a).equal(1); // Validação simples
		expect(a, "Deveria ser 1").equal(1); // Com mensagem de erro personalizada
		expect(a).to.be.equal(1); // Leitura fluida (mesmo efeito)
		expect('a').not.to.be.equal('b'); // Negação
	});
	
	it('Teste verdade', () => {
		const a = true;
		
		expect(a).to.be.true; // Valida se é o booleano true
		expect(true).to.be.true;
	});
	
	it('Teste igualdade obj', () => {
		const obj = {
			a: 1,
			b: 2
		};
		
		expect(obj).to.be.equal(obj); // Compara referência de memória (mesmo objeto)
		expect(obj).to.be.equals(obj); // Alias
		expect(obj).to.be.eq(obj); // Abreviação
		expect(obj).to.be.deep.equal({a: 1, b: 2}); // 'deep': compara as propriedades e valores
		expect(obj).to.be.eql({a: 1, b: 2}); // Alias para deep.equal
		expect(obj).include({a: 1}); // Verifica se possui o subconjunto de propriedades
		expect(obj).to.have.property('b', 2); // Verifica propriedade específica e valor
		expect(obj).to.not.be.empty; // Verifica se não está vazio
		expect({}).to.be.empty;
	});
	
	it('Teste arrays', () => {
		const arr = [1, 2, 3];
		
		expect(arr).to.have.members([1, 2, 3]); // Verifica se contém exatamente estes membros
		expect(arr).to.include.members([1, 3]); // Verifica se o array contém o subconjunto
		expect(arr).to.not.be.empty;
		expect([]).to.be.empty;
	});
	
	it('Teste tipos', () => {
		const num = 1;
		const str = 'String';
		
		expect(num).to.be.a('number'); // Valida tipo number
		expect(str).to.be.a('string'); // Valida tipo string
		expect({}).to.be.an('object'); // Valida tipo object
		expect([]).to.be.an('array'); // Valida tipo array
	});
	
	it('Teste strings', () => {
		const str = 'String de teste';
		
		expect(str).to.be.equal('String de teste');
		expect(str).to.have.length(15); // Valida tamanho
		expect(str).to.contains('de'); // Valida substring
		
		expect(str).to.match(/de/);      // Verifica se existe 'de' em qualquer parte
		expect(str).to.match(/^String/); // ^ (circunflexo) verifica se a string COMEÇA com 'String'
		expect(str).to.match(/teste$/);  // $ (cifrão) verifica se a string TERMINA com 'teste'
		expect(str).to.match(/.{15}/);   // . (ponto) é qualquer caractere, {15} é a quantidade exata
		expect(str).to.match(/\w+/);     // \w verifica se existem letras ou números (palavras)
		expect(str).to.match(/\D+/);     // \D (maiúsculo) verifica se NÃO contém dígitos (apenas letras/espaços)
	});
	
	it('Teste números', () => {
		const number = 4;
		const floatNumber = 5.1234;
		
		expect(number).to.be.equal(4);
		expect(number).to.be.above(3); // Maior que
		expect(number).to.be.below(5); // Menor que
		expect(number).to.be.at.least(3); // Maior ou igual a
		expect(number).to.be.at.most(5); // Menor ou igual a
		expect(floatNumber).to.be.equals(5.1234);
		expect(floatNumber).to.be.closeTo(5.1, 0.1); // Proximidade (delta 0.1)
	});
	
});
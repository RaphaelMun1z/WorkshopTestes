describe('Teste de Asserts', () => {
	it('Teste igualdade', () => {
		const a = 1;
		
		expect(a).equal(1);
		expect(a, "Deveria ser 1").equal(1);
		expect(a).to.be.equal(1);
		expect('a').not.to.be.equal('b');
	})
	
	it('Teste verdade', () => {
		const a = true;
		
		expect(a).to.be.true;
		expect(true).to.be.true;
	})

	it('Teste igualdade obj', () => {
		const obj = {
			a: 1,
			b: 2
		};
		
		expect(obj).to.be.equal(obj);
		expect(obj).to.be.equals(obj);
		expect(obj).to.be.eq(obj);
		expect(obj).to.be.deep.equal({a: 1, b: 2});
		expect(obj).to.be.eql({a: 1, b: 2});
		expect(obj).include({a: 1}); 
		expect(obj).to.have.property('b', 2);
		expect(obj).to.not.be.empty;
		expect({}).to.be.empty;
	})

	it('Teste arrays', () => {
		const arr = [1, 2, 3];
		
		expect(arr).to.have.members([1, 2, 3]);
		expect(arr).to.include.members([1, 3]);
		expect(arr).to.not.be.empty;
		expect([]).to.be.empty;
	});

	it('Teste tipos', () => {
		const num = 1;
		const str = 'String';

		expect(num).to.be.a('number');
		expect(str).to.be.a('string');
		expect({}).to.be.an('object');
		expect([]).to.be.an('array');
	});

	it('Teste strings', () => {
		const str = 'String de teste';

		expect(str).to.be.equal('String de teste');
		expect(str).to.have.length(15);
		expect(str).to.contains('de');
		expect(str).to.match(/de/);
		expect(str).to.match(/^String/);
		expect(str).to.match(/teste$/);
		expect(str).to.match(/.{15}/);
		expect(str).to.match(/\w+/);
		expect(str).to.match(/\D+/);
	});

	it('Teste números', () => {
		const number = 4;
		const floatNumber = 5.1234;

		expect(number).to.be.equal(4);
		expect(number).to.be.above(3);
		expect(number).to.be.below(5);
		expect(number).to.be.at.least(3);
		expect(number).to.be.at.most(5);
		expect(floatNumber).to.be.equals(5.1234);
		expect(floatNumber).to.be.closeTo(5.1, 0.1);
	});

})
class Figura {
	constructor(nome, p1, p2, aceitos) {
		this.nome = nome;
		this.p1 = p1;
		this.p2 = p2;
		this.aceitos = aceitos;
	}

	getPremissas() {
		return [this.p1, this.p2];
	}

	buscaSilogismo(p1, p2){
		var concs = [];
		for (var i = 0; i < 6; i++){
			var silogismo = this.aceitos[i];
			var prems = silogismo.getPremissas();
			
			if (p1 == prems[0] && p2 == prems[1]){
				concs.push(silogismo);
			}
		}
		return concs;
	}
}

class Silogismo {
	constructor(p1, p2, conclusao, flags){
		this.p1 = p1;
		this.p2 = p2;
		this.conclusao = conclusao;
		this.flags = flags || ""
	}

	hasFlag(){
		if (this.flags.length != 0) {
			return true;
		} else {
			return false;
		}
	}

	getPremissas() {
		return [this.p1, this.p2];
	}

	getConclusao() {
		return this.conclusao;
	}
}
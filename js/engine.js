var f1 = new Figura("1", "MP", "SM", [
		new Silogismo("A", "A", "A"),
		new Silogismo("E", "A", "E"),
		new Silogismo("A", "I", "I"),
		new Silogismo("E", "I", "O"),
		new Silogismo("A", "A", "I", "S"),
		new Silogismo("E", "A", "O", "S"),
	]
);

var f2 = new Figura("2", "PM", "SM", [
		new Silogismo("E", "A", "E"),
		new Silogismo("A", "E", "E"),
		new Silogismo("E", "I", "O"),
		new Silogismo("A", "O", "O"),
		new Silogismo("E", "A", "O", "S"),
		new Silogismo("A", "E", "O", "S"),
	]
);

var f3 = new Figura("3", "MP", "MS", [
		new Silogismo("A", "A", "I", "EM"),
		new Silogismo("E", "A", "O", "EM"),
		new Silogismo("I", "A", "I"),
		new Silogismo("O", "A", "O"),
		new Silogismo("A", "I", "I"),
		new Silogismo("E", "I", "O"),
	]
);

var f4 = new Figura("4", "PM", "MS", [
		new Silogismo("A", "A", "I", "EP"),
		new Silogismo("A", "E", "E"),
		new Silogismo("I", "A", "I"),
		new Silogismo("E", "A", "O", "EM"),
		new Silogismo("E", "I", "O"),
		new Silogismo("A", "E", "O", "S"),
	]
);

var figuras = [f1, f2, f3, f4];

var quantificadores = {
	"A": "Todo",
	"E": "Nenhum",
	"I": "Algum",
	"O": "Algum não",
}

var flags = {
	ES: "Depende da existência do sujeito",
	EP: "Depende da existência do predicado",
	EM: "Depende da existencia do termo médio",
	S: "Conclusão enfraquecida",
}

$(function(){
	$("select").formSelect();
});

$("#figure").change(function(event){
	var figura = $("#figure").val();

	$("label[for='figure']").text("Figura: " + figura);
	var p1 = figuras[figura - 1].getPremissas()[0];
	var p2 = figuras[figura - 1].getPremissas()[1];

	$(".first.arg").text(p1);
	$(".second.arg").text(p2);

	atualizaPremissa(1);
	atualizaPremissa(2);
});

$("select").change(function(event) {
	var numeroPremissa = event.target.id.substr(1, 1);
	atualizaPremissa(numeroPremissa);
});

function atualizaPremissa(numeroPremissa) {
	var figura = figuras[$("#figure").val() - 1];
	var elementosPremissa = figura.getPremissas()[numeroPremissa - 1];
	var premissa = montaPremissa($("#q" + numeroPremissa).val(), elementosPremissa[0], elementosPremissa[1]);
	$("#p" + numeroPremissa).text(premissa);
}

$("button[type='submit']").click(function(event){
	event.preventDefault();

	var f = $("#figure").val();
	var q1 = $("#q1").val();
	var q2 = $("#q2").val();

	var errsPrems = validaPremissas(f, q1, q2);
	if (errsPrems) {
		alert(errsPrems);
	} else {
		verificaSilogismo(f, q1, q2);
	}
});

function validaPremissas(f, q1, q2){
	var erros = "";
	erros = validaParticulares(q1, q2) || validaNegacao(q1, q2);
	return erros;
}

function validaParticulares(q1, q2) {
	if ((q1 == "I" || q1 == "O") && (q2 == "I" || q2 == "O")){
		return "Duas premissas particulares não geram conclusão";
	}
	return "";
}

function validaNegacao(q1, q2) {
	if ((q1 == "E" || q1 == "O") && (q2 == "E" || q2 == "O")){
		return "Duas premissas negativas não geram conclusão";
	}
	return "";
}

function verificaSilogismo(f, q1, q2) {
	var figura = figuras[f - 1];
	var silogismos = figura.buscaSilogismo(q1, q2);
	var msg;

	if (silogismos.length > 0){
		msg = (silogismos.length == 1) ? "Essas premissas geram a seguinte conclusão:\n" : "Essas premissas geram as seguintes conclusões:\n";
		for (var i = 0; i < silogismos.length; i++){
			var silogismo = silogismos[i];
			if (silogismo.hasFlag()){
				msg += montaPremissa(silogismo.getConclusao(), "S", "P") + "(" + flags[silogismo.flags] + ")\n";
			} else {
				msg += montaPremissa(silogismo.getConclusao(), "S", "P") + "\n"
			}
		}
	} else {
		msg = "Esse silogismo não é válido!";
	}
	alert(msg);
}

function montaPremissa(quantificador, s, p) {
	if (quantificador == "O"){
		return "Algum " + s + " não é " + p;
	} else {
		return quantificadores[quantificador] + " " + s + " é " + p;
	}
}

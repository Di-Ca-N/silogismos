var enumQuantificadores = Object.keys(quantificadores)
var total = 0;
var corretas = 0;

for (var f = 0; f < 4; f++) {
	for (var q1 = 0; q1 < 4; q1++) {
		for (var q2 = 0;  q2 < 4; q2++) {
			total += 1;
			var qa = enumQuantificadores[q1];
			var qb = enumQuantificadores[q2];
			var errsPrems = validaPremissas(f, qa, qb);
			if (!errsPrems) {
				var figura = figuras[f];
				var silogismos = figura.buscaSilogismo(qa, qb);
				corretas += silogismos.length;
			}
		}
	}
}

console.log(corretas);
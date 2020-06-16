// Variáveis globais

// Armazena Unidades ex. gold,iron 
var Units = {};

// Armazena diferentes tipos de moedas e a conversão de cada um
var Moeda = {};

// Todos os numeros romanos válidos
var numeraisRomanos = [ 'i', 'v', 'x', 'l', 'c', 'd', 'm' ];

// Expressões regulares para verificar se o input é valido
var isValue = new RegExp(/^[a-z]+\s+e\s+[i|v|x|l|c|d|m]$/i);
var isCredit = new RegExp(/^([a-z\s]+)e\s+(\d+.?\d*)\s+creditos$/i);
var HowMuch = new RegExp(/^quanto\s+custa\s+([a-z\s]+)[?]$/i);
var HowMany = new RegExp(/^quantos\s+creditos\s+sao\s+([a-z\s]+)[?]$/i);

// Expressões regulares para verificar se os numeros romanos sao validos
var isValidRoman = new RegExp(
		/^m{0,3}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/);

// Numeros romanos e seus respectivos números arábicos 
var numeraisRomanosVal = {
	i : 1,
	v : 5,
	x : 10,
	l : 50,
	c : 100,
	d : 500,
	m : 1000
};
 // Use esta função para converter a moeda inter-galactica para seu valor.

function MoedaParaValor(MoedaArr) {
	var StringRomano = "";
	var resposta = 0;
	for (var ite = 0; ite < MoedaArr.length; ite++) {
		if (Moeda[MoedaArr[ite].toLowerCase()]) {
			StringRomano += Moeda[MoedaArr[ite].toLowerCase()];
		} else if (Units[MoedaArr[ite].toLowerCase()]) {
			console.log(MoedaArr[ite] + " não é uma moeda, é uma unidade");
			return -1;
		} else {
			console.log("Moeda desconhecida " + MoedaArr[ite]);
			return -1;
		}
	}
	if (!isValidRoman.test(StringRomano)) {
		console.log("Invalid amount " + MoedaArr.join(" "));
		return -1;
	}
	var DigitosRomanos = [];
	StringRomano.split("").forEach(function(e, i, arr) {
		DigitosRomanos.push(numeraisRomanosVal[e]);
		if (numeraisRomanosVal[e] < numeraisRomanosVal[arr[i + 1]]) {
			DigitosRomanos[i] *= -1;
		}
	});
	resposta = DigitosRomanos.reduce(function(sum, elt) {
		return sum + elt;
	});
	return resposta;
}

/**
 * Função publica que processa os inputs e faz a conversão da moeda inter-galactica
 * O Input e valido com as expressões regulares e se corretos seguem para a conclusão.
 */

exports.Comerciante = function(input) {
	var RegAns = null;
	RegAns = isValue.exec(input);
	if (RegAns !== null) {
		var partials = RegAns[0].split(/\s+/);
		if (!Moeda[partials[0].toLowerCase()]) {
			var index = numeraisRomanos.indexOf(partials[2].toLowerCase());
			if (index > -1) {
				Moeda[partials[0].toLowerCase()] = partials[2].toLowerCase();
				numeraisRomanos.splice(index, 1);
			} else {
				console.log(partials[2] + " já está atribuido");
			}
		} else if (Moeda[partials[0].toLowerCase()] !== numeraisRomanosVal[partials[2]
				.toLowerCase()]) {
			console.log(partials[0] + " já tem uma unidade de conversão");
		}
		return;
	}
	RegAns = isCredit.exec(input);
	if (RegAns !== null) {
		var CreditoVal = parseFloat(RegAns[2]);
		var partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Por favor, insira uma moeda");
		}
		partials = partials.split(/\s+/);
		var unit = partials.pop();
		if (Moeda[unit.toLowerCase()]) {
			return console.log(unit + " é uma moeda, insira uma unidade");
		}
		if (partials.length < 1) {
			return console.log("Nenhuma moeda providenciada");
		}
		var value = MoedaParaValor(partials);
		if ((CreditoVal / value) < 0.00001) {
			return console.log("Credito é muito baixo");
		}
		if (value !== -1) {
			value = CreditoVal / value;
			Units[unit.toLowerCase()] = value;
		} else {
			return console.log("Moeda inválida");
		}
		return;
	}
	RegAns = HowMuch.exec(input);
	if (RegAns !== null) {
		var partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Por favor, insira alguma moeda para conversão");
		}
		partials = partials.split(/\s+/);
		var value = MoedaParaValor(partials);
		if (value !== -1) {
			return console.log(partials.join(" ") + " é " + value);
		} else {
			return console.log("Moeda inválida");
		}
	}
	RegAns = HowMany.exec(input);
	if (RegAns !== null) {
		var partials = RegAns[1].trim();
		if (partials === "") {
			return console.log("Por favor, envie uma moeda");
		}
		partials = partials.split(/\s+/);
		var unit = partials.pop();
		if (!Units[unit.toLowerCase()]) {
			return console.log("Nenhuma unidade providenciada");
		}
		if (partials.length < 1) {
			return console.log("Nenhuma moeda providenciada");
		}
		var value = MoedaParaValor(partials);
		if (value !== -1) {
			value *= Units[unit.toLowerCase()];
			return console.log(RegAns[1].trim() + " é " + value.toFixed(5)
					+ " Créditos");
		} else {
			return console.log("Moeda Inválida");
		}
	}
	return console.log("Eu não faço ideia do que está falando");
};
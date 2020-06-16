// Importa os módulos necessários e o arquivo helper.js
var fs = require('fs');
var readLine = require('readline');
var Helper = require('./helper.js');

// Interface ReadStream para pegar novos eventos "linha" 
var Reader = readLine.createInterface({
	input : fs.createReadStream('./input.txt'),
	terminal : false
});

// Processa cada nova linha pela função do helper.js 
Reader.on('line', function(line) {
	Helper.Comerciante(line.trim());
});

// Log de Exceptions  
process.on('uncaughtException', function(err) {
	console.log(err);
});
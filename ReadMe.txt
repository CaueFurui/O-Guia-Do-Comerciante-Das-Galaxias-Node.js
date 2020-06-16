**Conteúdo**

I)Premissas
II)Fluxo do código
II)Procedimentos

I.Premissas

	1)Todos os inputs são case-sensitive, ou seja,
	não importa se são maiusculas ou minusculas, o
	programa irá interpretar da melhor forma.
		(Ex.: GOLD, Gold, gold)

	2)Como a moeda representa números romanos, os valores de 
	crédito podem ser números de ponto flutuante. É aceitável inserir
	valores de crédito em número de ponto flutuante.

	3)Deve haver qualquer limite mínimo aceitável 
	para o valor do crédito; nesse caso, é a 
	razão de crédito / valor que deve ser maior que 
	(ou igual) 0,00001 (ou seja, razão menor que isso, não é aceitável)

II.Fluxo de código

	1)A interface ReadStream é criada e o evento 'linha' ligado para escutar.
	2)A cada linha nova o conteúdo é "trimmado" e enviado para a função Merchant 
		para processamento futuro.
	3)Na função Merchant, cada linha coincide com 4 diferentes expressões regulares que
	detectam o tipo de linha. Cada linha que não coincide com nenhuma das expressões
	é declarada como um tipo não detectado.
	4)A função é utilizada para converter a moeda inter-galactica para um valor.
	A função funciona conforme abaixo,
		a)Converte o array da moeda inter-galactica para o respectivo número romano,
		enquanto converte, salva a moeda inter-galactica para conversão.
		b)Checa se o numero romano é valido.
		c)Converte o número romano em número real.

III.Procedimentos para "rodar" o projeto

	1)Descompacte o projeto;
	2)Caso não possua, instalar o node.js, pois é necessário para o projeto rodar;
	3)Abrir o terminal e navegar até a pasta src;
	4)Executar o comando:
		node index.js

Obs.: Tomei a liberdade de traduzir a questão e a resolução, então, usei de 
liberdade poética para a tradução do mesmo. Espero que gostem =D
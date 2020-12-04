/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
const formatarRelatorio = (dados) => {
	const relatorio = [];

	// eslint-disable-next-line no-restricted-syntax
	// eslint-disable-next-line no-restricted-syntax
	let estaInadimplente = false;
	for( dado of dados ) {
	 
		 if (dado.status === 'overdue') {
			estaInadimplente = true;
		 }
		 
		if (dado.status === 'waiting_payment' || dado.status === 'paid') {
			estaInadimplente = false;
		 }
	 
		relatorio.push({
			usuarioId: dado.usuario_id,
			clienteId: dado.cliente_id,
			valorCobranca: dado.valor_cobranca,
			vencimento: dado.vencimento,
			status: dado.status,
			estaInadimplente,
	 })
	 }



	/// //////////////////////////////////////

	const relatorioFormatado = [];

	let cobrancasAguardado = 0;
	for(let i = 0; i < relatorio.length; ++i){
		if(relatorio[i].status === 'waiting_payment')
			cobrancasAguardado++;
	}
	


	let cobrancasVencidas = 0;
	for(let i = 0; i < relatorio.length; ++i){
		if(relatorio[i].status === 'overdue')
			cobrancasVencidas++;
	}

	

	let cobrancasPagas = 0;
	for(let i = 0; i < relatorio.length; ++i){
		if(relatorio[i].status === 'paid')
			cobrancasPagas++;
	}
	// clientes
	let clientesInadimplentes = 0;
	for(let i = 0; i < relatorio.length; ++i){
		if(relatorio[i].estaInadimplente === true )
			clientesInadimplentes++;
	}

	let clientesAdimplentes = 0;
	for(let i = 0; i < relatorio.length; ++i){
		if(relatorio[i].estaInadimplente === false )
			clientesAdimplentes++;
	}
	
	let saldoEmConta = 0;
	for (let i = 0; i < relatorio.length; i++){
		if(relatorio[i].status === 'paid'){
			saldoEmConta += relatorio[i].valorCobranca
		}
	}
	

	relatorioFormatado.push({
		qtdClientesAdimplentes: clientesAdimplentes,
		qtdClientesInadimplentes: clientesInadimplentes,
		qtdCobrancasPrevistas: cobrancasAguardado,
		qtdCobrancasPagas: cobrancasPagas,
		qtdCobrancasVencidas: cobrancasVencidas,
		// eslint-disable-next-line object-shorthand
		saldoEmConta: saldoEmConta,
	})

	return relatorioFormatado;
};

module.exports = { formatarRelatorio };
const responseCobrancaDeletada = (ctx, code, menssagem) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		menssagem,
	};
};

const responseBuscandoCobrancas = (ctx, code, dados) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		cobrancas: dados,
	};
};

const responseCriandoCobrancas = (ctx, code, dados) => {
	const status = 201;
	ctx.status = code;
	ctx.body = {
		status,
		cobranca: {
			idDoCliente: dados.cliente_id,
			descricao: dados.descricao,
			valor: dados.valor_cobranca,
			vencimento: dados.vencimento,
			linkDoBoleto: dados.link_boleto,
			status: dados.status,
		},
	};
};

const responseListandoCobrancas = (ctx, code, result, totalPaginas, offset) => {
	const status = 200;
	ctx.status = code;
	if (result.length === 0) {
		ctx.body = {
			status,
			menssagem: 'Não existem resultados para esta pesquisa',
		};
	} else {
		ctx.body = {
			status,
			dados: {
				paginaAtual: parseFloat(offset),
				totalDePaginas: totalPaginas,
				cobrancas: result,
			},
		};
	}
};

const responseCamposNulos = (ctx, code, menssagem) => {
	const status = 400;
	ctx.status = code;
	ctx.body = {
		status,
		menssagem,
	};
};

module.exports = {
	responseCobrancaDeletada,
	responseBuscandoCobrancas,
	responseCriandoCobrancas,
	responseListandoCobrancas,
	responseCamposNulos,
};

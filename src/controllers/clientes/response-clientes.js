const responseCriandoCliente = (ctx, code, dados) => {
	const status = 201;
	ctx.status = code;
	ctx.body = {
		status,
		dados: {
			id: dados,
		},
	};
};

const responseEditandoCliente = (ctx, code, dados) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		dados: {
			id: dados.cliente_id,
			nome: dados.cliente_nome,
			cpf: dados.cliente_cpf,
			email: dados.cliente_email,
		},
	};
};

const responseBuscandoCliente = (ctx, code, result, offset, totalPaginas) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		dados: {
			paginaAtual: parseFloat(offset),
			totalDePaginas: totalPaginas,
			clientes: result,
		},
	};
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
	responseCriandoCliente,
	responseEditandoCliente,
	responseBuscandoCliente,
	responseCamposNulos,
};

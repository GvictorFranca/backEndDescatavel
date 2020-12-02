const responseLogin = (ctx, code, dados) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		dados,
	};
};

const responseCriandoUsuario = (ctx, code, dados) => {
	const status = 201;
	ctx.status = code;
	ctx.body = {
		status,
		dados: {
			id: dados,
		},
	};
};

const responseAutenticacao = (ctx, code, dados) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		dados: {
			id: dados,
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
	responseLogin,
	responseCriandoUsuario,
	responseAutenticacao,
	responseCamposNulos,
};

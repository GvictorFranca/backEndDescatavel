const responsePagandoCobranca = (ctx, code, menssagem) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		menssagem,
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
module.exports = { responsePagandoCobranca, responseCamposNulos };

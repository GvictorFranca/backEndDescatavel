const responseRelatorio = (ctx, code, dados) => {
	const status = code;
	ctx.status = code;
	ctx.body = {
		status,
		relatorio: dados,
	};
};

module.exports = { responseRelatorio };

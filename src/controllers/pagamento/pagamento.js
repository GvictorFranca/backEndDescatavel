const Cobrancas = require('../../repositories/pagamento');
const Response = require('./response-pagamento');

const pagamento = async (ctx) => {
	const { idDaCobranca = null } = ctx.request.body;

	if (idDaCobranca === null) {
		return Response.responseCamposNulos(ctx, 400, 'O Id nao foi passado');
	}

	await Cobrancas.pagarCobrancas(idDaCobranca);

	return Response.responsePagandoCobranca(
		ctx,
		200,
		'Cobrança paga com sucesso!'
	);
};

module.exports = { pagamento };

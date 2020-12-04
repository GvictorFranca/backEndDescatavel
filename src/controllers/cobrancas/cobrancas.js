const ResponseCobrancas = require('./response-cobranca');
const Cobrancas = require('../../repositories/cobrancas');
const Pagarme = require('../../helpers/pagarme/pagarme');
const Clientes = require('../../repositories/clientes');
const Formatar = require('./formatar-listagem-cobrancas');

const criarCobranca = async (ctx) => {
	// verificar como nulo
	const {
		clienteId = null,
		descricao = null,
		valorCobranca = null,
		vencimento = null,
	} = ctx.request.body;

	if (clienteId === null || valorCobranca === null || vencimento === null) {
		return 'Algum campo nao foi passado';
	}

	const usuarioId = ctx.state.id;
	const clienteIdInfo = await Clientes.clienteIdInfo(usuarioId, clienteId);
	const boleto = await Pagarme.gerarBoleto(
		clienteIdInfo,
		valorCobranca,
		vencimento
	);
	const dados = await Cobrancas.criarCobranca(boleto, descricao, clienteId);
	return ResponseCobrancas.responseCriandoCobrancas(ctx, 200, dados);
};

const listarCobrancas = async (ctx) => {
	const { cobrancasPorPagina = null, offset = null } = ctx.query;
	const usuarioId = ctx.state.id;
	if (cobrancasPorPagina === null || offset === null) {
		return ResponseCobrancas.responseCamposNulos(
			ctx,
			400,
			'Algum campo nao foi passado'
		);
	}
	const dados = await Cobrancas.listarCobrancas(
		cobrancasPorPagina,
		offset,
		usuarioId
	);
	const result = await Formatar.formatarListagemDeCobrancas(dados);
	const totalDeResultados = result.length;

	const totalPaginas = Math.ceil(totalDeResultados / cobrancasPorPagina);
	return ResponseCobrancas.responseListandoCobrancas(
		ctx,
		200,
		result,
		totalPaginas,
		offset
	);
};

module.exports = { criarCobranca, listarCobrancas };

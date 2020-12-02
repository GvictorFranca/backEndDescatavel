const Relatorios = require('../../repositories/relatorio');
const RelatorioResponse = require('./relatorios-response');
const Formatar = require('./formatar-relatorio');
const Checar = require('./checagem-status');

const obterRelatorios = async (ctx) => {
	const usuarioId = ctx.state.id;
	const dados = await Relatorios.obterRelatorio(usuarioId);
	Checar.checagemStatus(dados);
	const dadosChecados = await Relatorios.obterRelatorio(usuarioId);
	const relatorio = await Formatar.formatarRelatorio(dadosChecados);

	RelatorioResponse.responseRelatorio(ctx, 200, relatorio);
};

module.exports = { obterRelatorios };

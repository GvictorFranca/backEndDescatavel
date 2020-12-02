const Status = require('../../repositories/status');

const checagemStatus = async (dados) => {
	dados.forEach((element) => {
		const dateNow = Date.now();
		if (element.vencimento < dateNow) {
			// eslint-disable-next-line no-const-assign
			const clienteId = element.cliente_id;
			const cobrancaId = element.cobranca_id;
			const statusAtual = 'overdue';
			Status.atualizarStatus(statusAtual, clienteId, cobrancaId);
		}
	});
};

module.exports = { checagemStatus };

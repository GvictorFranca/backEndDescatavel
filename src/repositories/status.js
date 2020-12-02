const database = require('../helpers/database');

const atualizarStatus = async (statusAtual, clienteId, cobrancaId) => {
	const query = {
		text: `UPDATE cobrancas SET status = $1 where cliente_id = $2 and cobranca_id = $3`,
		values: [statusAtual, clienteId, cobrancaId],
	};

	await database.query(query);
};

module.exports = { atualizarStatus };

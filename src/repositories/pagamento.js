const database = require('../helpers/database');

const pagarCobrancas = async (cobrancaId) => {
	const query = {
		text: `UPDATE cobrancas SET status = 'paid'
						WHERE cobranca_id = $1 RETURNING *`,
		values: [cobrancaId],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

module.exports = { pagarCobrancas };

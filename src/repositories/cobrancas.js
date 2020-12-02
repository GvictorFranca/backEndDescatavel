const database = require('../helpers/database');

const criarCobranca = async (boleto, descricao, clienteId) => {
	const { valor, vencimento, status, url, referenceKey } = boleto[0];

	const deletado = false;
	const query = {
		text: `INSERT INTO cobrancas (isdeleted, cliente_id, descricao, valor_cobranca, vencimento, status, link_boleto, reference_key)
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
		values: [
			deletado,
			clienteId,
			descricao,
			valor,
			vencimento,
			status,
			url,
			referenceKey,
		],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const listarCobrancas = async (cobrancasPorPagina, offset) => {
	const query = {
		text: `SELECT * FROM cobrancas limit $1 offset $2`,
		values: [cobrancasPorPagina, offset],
	};

	const result = await database.query(query);

	return result.rows;
};

module.exports = { criarCobranca, listarCobrancas };

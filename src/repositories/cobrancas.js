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

const listarCobrancas = async (cobrancasPorPagina, offset, usuarioId) => {
	const query = {
		text: `select * from cobrancas join clientes on cobrancas.cliente_id = clientes.cliente_id join usuarios on usuarios.usuario_id = clientes.usuario_id 
	where usuarios.usuario_id = $3 limit $1 offset $2`,
		values: [cobrancasPorPagina, offset, usuarioId],
	};

	const result = await database.query(query);

	return result.rows;
};

module.exports = { criarCobranca, listarCobrancas };

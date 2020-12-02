const database = require('../helpers/database');

const checarStatusCobranca = async (usuarioId) => {
	const query = {
		text: `
		select vencimento, clientes.usuario_id , clientes.cliente_id from usuarios join clientes on usuarios.usuario_id = clientes.usuario_id 
		join cobrancas on clientes.cliente_id = cobrancas.cliente_id
		where clientes.usuario_id = $1 
		group by clientes.usuario_id, clientes.cliente_id, cobrancas.vencimento 
		;`,
		values: [usuarioId],
	};

	const result = await database.query(query);
	console.log(result);
	return result.rows;
};

module.exports = { checarStatusCobranca };

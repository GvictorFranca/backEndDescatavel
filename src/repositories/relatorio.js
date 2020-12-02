const database = require('../helpers/database');

const obterRelatorio = async (usuarioId) => {
	const query = {
		text: `
		select 
		clientes.usuario_id,
		clientes.cliente_id,   
		cobrancas.valor_cobranca,
		cobrancas.vencimento,
		cobrancas.status,
		cobrancas.reference_key,
		cobrancas.cobranca_id
		from  
		usuarios join clientes on usuarios.usuario_id = clientes.usuario_id 
		join cobrancas on clientes.cliente_id = cobrancas.cliente_id 
		where clientes.usuario_id = $1 
		group by clientes.usuario_id ,clientes.cliente_id, cobrancas.valor_cobranca, cobrancas.vencimento, cobrancas.status, cobrancas.reference_key, cobrancas.cobranca_id
		`,
		values: [usuarioId],
	};
	const result = await database.query(query);
	return result.rows;
};
module.exports = { obterRelatorio };

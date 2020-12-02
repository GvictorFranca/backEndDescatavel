const database = require('../helpers/database');

const obterClientePorEmail = async (email) => {
	const query = {
		text: `SELECT * FROM clientes where cliente_email = $1`,
		values: [email],
	};

	const result = await database.query(query);
	return result.rows.shift();
};

const criarCliente = async (usuarioId, nome, email, cpf, tel) => {
	const deletado = false;
	const query = {
		text: `INSERT INTO clientes (isdeleted, usuario_id, cliente_nome, cliente_email, cliente_cpf, cliente_celular)
						VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
		values: [deletado, usuarioId, nome, email, cpf, tel],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const editarCliente = async (clienteId, usuarioId, nome, email, tel) => {
	const query = {
		text: `UPDATE clientes SET usuario_id = $2, cliente_nome = $3, cliente_email = $4, cliente_celular = $5 
						WHERE cliente_id = $1 RETURNING *`,
		values: [clienteId, usuarioId, nome, email, tel],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const buscarClientePorTexto = async (
	usuarioId,
	texto,
	clientesPorPagina,
	offset
) => {
	console.log(usuarioId);
	const query = {
		text: `
		select 
		clientes.usuario_id,
		clientes.cliente_id, 
		clientes.cliente_nome,
		clientes.cliente_email, 
		(select sum(valor_cobranca) as TOTAL from cobrancas where cobrancas.cliente_id = clientes.cliente_id and status = 'waiting_payment') as cobrancas_aguardando,
		(select sum(valor_cobranca) as TOTAL from cobrancas where cobrancas.cliente_id = clientes.cliente_id and status = 'overdue') as cobrancas_inadimplentes,
		(select sum(valor_cobranca) as TOTAL from cobrancas where cobrancas.cliente_id = clientes.cliente_id and status = 'paid') as cobrancas_recebidas
		from  
		usuarios join clientes on usuarios.usuario_id = clientes.usuario_id 
		join cobrancas on clientes.cliente_id = cobrancas.cliente_id
		where clientes.usuario_id = $1 and clientes.cliente_nome like '%'||$4||'%' and clientes.usuario_id = $1 or clientes.cliente_cpf like '%'||$4||'%' and clientes.usuario_id = $1 or clientes.cliente_email like '%'||$4||'%' and clientes.usuario_id = $1 
		group by clientes.usuario_id ,clientes.cliente_id, clientes.cliente_nome, clientes.cliente_email
		LIMIT $2 offset $3
		`,
		values: [usuarioId, clientesPorPagina, offset, texto],
	};
	const result = await database.query(query);
	return result.rows;
};

const buscarClientesSemTexto = async (usuarioId, clientesPorPagina, offset) => {
	const query = {
		text: `
		select 
		clientes.usuario_id,
		clientes.cliente_id, 
		clientes.cliente_nome,
		clientes.cliente_email, 
		(select sum(valor_cobranca) as TOTAL from cobrancas where cobrancas.cliente_id = clientes.cliente_id and status = 'waiting_payment') as cobrancas_aguardando,
		(select sum(valor_cobranca) as TOTAL from cobrancas where cobrancas.cliente_id = clientes.cliente_id and status = 'overdue') as cobrancas_inadimplentes,
		(select sum(valor_cobranca) as TOTAL from cobrancas where cobrancas.cliente_id = clientes.cliente_id and status = 'paid') as cobrancas_recebidas
		from  
		usuarios join clientes on usuarios.usuario_id = clientes.usuario_id 
		join cobrancas on clientes.cliente_id = cobrancas.cliente_id
		where clientes.usuario_id = $1 
		group by clientes.usuario_id ,clientes.cliente_id, clientes.cliente_nome, clientes.cliente_email
		LIMIT $2 offset $3
		`,
		values: [usuarioId, clientesPorPagina, offset],
	};
	const result = await database.query(query);
	return result.rows;
};

const clienteIdInfo = async (usuarioId, clienteId) => {
	const query = {
		text: `select * from clientes where usuario_id = $1 and cliente_id = $2`,
		values: [usuarioId, clienteId],
	};
	const result = await database.query(query);
	return result.rows.shift();
};

module.exports = {
	clienteIdInfo,
	criarCliente,
	obterClientePorEmail,
	editarCliente,
	buscarClientePorTexto,
	buscarClientesSemTexto,
};

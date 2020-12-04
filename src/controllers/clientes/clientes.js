/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
const response = require('./response-clientes');
const Clientes = require('../../repositories/clientes');
const Format = require('./formatar-cliente');
const Checar = require('./checagem-status');

const criarCliente = async (ctx) => {
	const usuarioId = ctx.state.id;
	const {
		nome = null,
		cpf = null,
		email = null,
		tel = null,
	} = ctx.request.body;

	if (!nome || !cpf || !email || !tel) {
		return response.responseLogin(ctx, 400, {
			message: 'Email ou senha invalidos',
		});
	}

	const clienteExiste = await Clientes.obterClientePorEmail(email);

	if (clienteExiste) {
		return response.responseCriandoCliente(ctx, 400, {
			mensagem: 'Este cliente ja existe',
		});
	}

	const dados = await Clientes.criarCliente(usuarioId, nome, email, cpf, tel);

	return response.responseCriandoCliente(
		ctx,
		200,
		dados.cliente_id,
	);
};

const editarCliente = async (ctx) => {
	const usuarioId = ctx.state.id;
	const {
		clienteId = null,
		nome = null,
		email = null,
		tel = null,
	} = ctx.request.body;

	if (clienteId === null || nome === null || email === null || tel === null) {
		return response.responseBuscandoCliente(ctx, 400, 'Algum campo nao foi passado');
	}

	const dados = await Clientes.editarCliente(
		clienteId,
		usuarioId,
		nome,
		email,
		tel
	);

	return response.responseEditandoCliente(ctx, 200, dados);
};

const buscarClientes = async (ctx) => {
	const { busca = null, clientesPorPagina = null, offset = null } = ctx.query;

	if (clientesPorPagina === null || offset === null) {
		return response.responseCamposNulos(ctx,400,'Algum campo nao foi passado');
	}
	const usuarioId = ctx.state.id;
	let dados;

	// eslint-disable-next-line no-unused-expressions
	
	if (busca === null ){
		dados = await Clientes.buscarClientesSemTexto(
			usuarioId,
			clientesPorPagina,
			offset
		)
	} else {
		dados = await Clientes.buscarClientesPorTexto(
			usuarioId,
			busca,
			clientesPorPagina,
			offset
		)
	}

	Checar.checagemStatus(dados);
	const result = await Format.formatarCliente(dados);
	const totalDeResultados = result.length;

	const totalPaginas = Math.ceil(totalDeResultados / clientesPorPagina);

	return response.responseBuscandoCliente(
		ctx,
		200,
		result,
		offset,
		totalPaginas
	);
};

module.exports = {
	criarCliente,
	editarCliente,
	buscarClientes,
};


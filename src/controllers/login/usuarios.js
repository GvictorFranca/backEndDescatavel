const Usuarios = require('../../repositories/usuarios');
const response = require('./response');

const criarUsuario = async (ctx) => {
	const { email = null, nome = null } = ctx.request.body;
	const { hash = null } = ctx.state;
	const usuarioExiste = await Usuarios.obterUsuarioPorEmail(email);

	if (email === null || nome === null || hash === null) {
		return response.responseCamposNulos(
			ctx,
			400,
			'Algum campo nao foi passado'
		);
	}
	if (usuarioExiste) {
		return response.responseCriandoUsuario(ctx, 400, {
			mensagem: 'Usuário já existe.',
		});
	}

	const dados = await Usuarios.criarUsuario(email, hash, nome);

	return response.responseCriandoUsuario(ctx, 200, dados.usuario_id);
};

module.exports = { criarUsuario };

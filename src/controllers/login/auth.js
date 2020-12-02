const jwt = require('jsonwebtoken');
const response = require('./response');
const Usuarios = require('../../repositories/usuarios');
const Password = require('../../helpers/password');

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) {
		return response.responseCamposNulos(ctx, 400, {
			message: 'Email ou senha invalidos',
		});
	}

	const usuario = await Usuarios.obterUsuarioPorEmail(email);

	if (usuario) {
		const comparacao = await Password.check(senha, usuario.usuario_senha);
		if (comparacao) {
			const token = await jwt.sign(
				{ id: usuario.usuario_id, email: usuario.usuario_email },
				process.env.JWT_SECRET || 'cubos',
				{
					expiresIn: '1h',
				}
			);
			// eslint-disable-next-line prettier/prettier
			return response.responseLogin(
				ctx,
				200,
				// eslint-disable-next-line prettier/prettier
				{ menssagem: 'Usuario logado com sucesso!', token },
			);
		}
	}

	return response.responseCamposNulos(ctx, 400, {
		message: 'Email ou senha mal formatados ou incorretos',
	});
};

module.exports = { autenticar };

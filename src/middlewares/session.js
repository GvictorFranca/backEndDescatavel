const jwt = require('jsonwebtoken');
const response = require('../controllers/login/response');
require('dotenv').config();

const verificar = async (ctx, next) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const [bearer, token] = ctx.headers.authorization.split(' ');
		const verificacao = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.id = verificacao.id;
		ctx.state.email = verificacao.email;
	} catch (erro) {
		return response.responseAutenticacao(ctx, 403, {
			mensagem: 'Ação proibida.',
		});
	}
	return next();
};

module.exports = { verificar };

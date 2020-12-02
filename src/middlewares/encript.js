const bcrypt = require('../helpers/bcrypt');
const response = require('../controllers/login/response');

const encriptar = async (ctx, next) => {
	const { senha = null } = ctx.request.body;

	if (!senha) {
		response(ctx, 400, { mensagem: 'Pedido mal-formatado.' });
	}

	const hash = await bcrypt.encriptarSenha(senha);
	ctx.state.hash = hash;

	return next();
};

module.exports = { encriptar };

const bcrypt = require('bcrypt');

const encriptarSenha = async (senha) => {
	const hash = await bcrypt.hash(senha, 10);

	return hash;
};

const compararHash = async (senha, hash) => {
	const comparacao = await bcrypt.compare(senha, hash);
	return comparacao;
};

module.exports = { encriptarSenha, compararHash };

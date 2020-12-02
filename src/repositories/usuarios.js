const database = require('../helpers/database');

const obterUsuarioPorEmail = async (email) => {
	const query = {
		text: `SELECT * FROM USUARIOS where usuario_email = $1`,
		values: [email],
	};

	const result = await database.query(query);
	return result.rows.shift();
};

const criarUsuario = async (email, hash, nome) => {
	const deletado = false;
	const query = {
		text: `INSERT INTO usuarios (isdeleted, usuario_email, usuario_senha, usuario_nome)
						VALUES ($1, $2, $3, $4) RETURNING *`,
		values: [deletado, email, hash, nome],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

module.exports = { obterUsuarioPorEmail, criarUsuario };

/* eslint-disable no-bitwise */
const listarChavesDeReferencia = async (dados) => {
	const chavesDeReferencia = [];
	await dados.forEach((chave) => {
		// eslint-disable-next-line prettier/prettier
		if( chave.reference_key !== null ) {
			chavesDeReferencia.push({
				key: chave.reference_key,
			});
		}
	});
	return chavesDeReferencia;
};

module.exports = { listarChavesDeReferencia };

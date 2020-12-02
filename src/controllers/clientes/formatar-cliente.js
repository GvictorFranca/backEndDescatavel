/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const formatarCliente = (dadosChecados) => {
	const result = [];

	// eslint-disable-next-line no-restricted-syntax
	for (dado of dadosChecados) {
		result.push({
			usuarioId: dado.usuario_id,
			clienteId: dado.cliente_id,
			nome: dado.cliente_nome,
			email: dado.cliente_email,
			cobrancasFeitas: (parseFloat(dado.cobrancas_aguardando) || 0) + (parseFloat(dado.cobrancas_inadimplentes) || 0),
			cobrancasRecebidas: parseFloat(dado.cobrancas_recebidas || 0),
			estaInadimplente: parseFloat(dado.cobrancas_inadimplentes) > 0,
		});
	}
	return result;
};

module.exports = { formatarCliente };

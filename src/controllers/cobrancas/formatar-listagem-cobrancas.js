/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const formatarListagemDeCobrancas = (dados) => {
	const result = [];
	// eslint-disable-next-line no-restricted-syntax
	for (dado of dados) {

		result.push({
			id: dado.cobranca_id,
			idDoCliente: dado.cliente_id,
			descricao: dado.descricao,
			valor: dado.valor_cobranca,
			vencimento: dado.vencimento,
			linkDoBoleto: dado.link_boleto,
			status:dado.status,
		});
	}
	return result;
};

module.exports = { formatarListagemDeCobrancas };

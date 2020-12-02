/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const axios = require('axios').default;
require('dotenv').config();
const keyGenerator = require('keygenerator');

const PagarmeException = require('../exceptions/exception');

const gerarBoleto = async (clienteIdInfo, valorCobranca) => {
	console.log(clienteIdInfo);
	const boletoInfo = [];
	const referenceKey = keyGenerator.transaction_id();
	try {
		const transaction = await axios.post(
			'https://api.pagar.me/1/transactions',
			{
				reference_key: referenceKey,
				amount: valorCobranca,
				api_key: process.env.API_KEY,
				payment_method: 'boleto',
				customer: {
					external_id: clienteIdInfo.cliente_id.toString(),
					type: 'individual',
					country: 'br',
					email: clienteIdInfo.cliente_email,
					name: clienteIdInfo.cliente_nome,
					documents: [
						{
							type: 'cpf',
							number: clienteIdInfo.cliente_cpf,
						},
					],
				},
			}
		);
		boletoInfo.push({
			referenceKey,
			transactionId: transaction.data.tid,
			clienteId: transaction.data.customer.external_id,
			clienteNome: transaction.data.customer.name,
			clienteEmail: transaction.data.customer.email,
			status: transaction.data.status,
			valor: transaction.data.amount,
			vencimento: transaction.data.boleto_expiration_date,
			url: transaction.data.boleto_url,
		});
		return boletoInfo;
	} catch (err) {
		console.log(err.response.data);
		return {
			status: 'error',
			menssagem: err.response.data,
		};
	}
};

const pagarBoleto = () => {
	axios
		.put(
			'https://api.pagar.me/1/transactions/10601199',
			{
				params: {
					status: 'paid',
				},
			},
			{
				params: {
					api_key: process.env.API_KEY,
					status: 'paid',
				},
			}
		)
		.then((x) => console.log(x))
		.catch((err) => console.log(err.response.data));
};

const obterBoletosPelaPagarme = async (chavesDeReferencia) => {
	console.log(chavesDeReferencia);
	const boletos = [];
	try {
		chavesDeReferencia.forEach((value) => {
			const x = axios.get('https://api.pagar.me/1/transactions/', {
				params: {
					api_key: process.env.API_KEY,
					reference_key: value.key,
				},
			});
			boletos.push({
				status: x.data.status,
			});
		});
	} catch (err) {
		console.log(err.response.data);
		return {
			status: 'error',
			menssagem: err.response.data,
		};
	}
	return boletos;
};

// simularPagamento();

// gerarBoleto(valorCobranca, clienteId, clienteNome, clienteCpf);

module.exports = { gerarBoleto, obterBoletosPelaPagarme };

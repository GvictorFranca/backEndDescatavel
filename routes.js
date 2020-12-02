const Router = require('koa-router');
const Session = require('./src/middlewares/session');
const AuthController = require('./src/controllers/login/auth');
const UsuariosController = require('./src/controllers/login/usuarios');
const EncriptarMiddleware = require('./src/middlewares/encript');
const Clientes = require('./src/controllers/clientes/clientes');
const Cobrancas = require('./src/controllers/cobrancas/cobrancas');
const Relatorio = require('./src/controllers/relatorios/relatorio');
const Pagamento = require('./src/controllers/pagamento/pagamento');

const router = new Router();
// CRIACÃO DE USUARIO
router.post(
	'/usuarios',
	EncriptarMiddleware.encriptar,
	UsuariosController.criarUsuario
);
// AUTENTICACAO
router.post('/auth', AuthController.autenticar);

// CRIAR CLIENTES - editar resposta
router.post('/clientes', Session.verificar, Clientes.criarCliente);

// EDITAR CLIENTES
router.put('/clientes', Session.verificar, Clientes.editarCliente);

router.post('/cobrancas', Session.verificar, Cobrancas.criarCobranca);
// Listar Clientes
router.get('/clientes', Session.verificar, Clientes.buscarClientes);

// OBTER RELATORIO
router.get('/relatorios', Session.verificar, Relatorio.obterRelatorios);

// LISTAR COBRANCAS
router.get('/cobrancas', Session.verificar, Cobrancas.listarCobrancas);

// PAGAR COBRANCA
router.put('/cobrancas', Session.verificar, Pagamento.pagamento);

module.exports = router;

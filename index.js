const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const cors = require('@koa/cors');

const server = new Koa();

const router = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 8081;
server.use(cors());
server.use(bodyparser());
server.use(router.routes());

server.listen(PORT, '0.0.0.0', null, () =>
	console.log(`rodando na porta ${PORT}`)
);

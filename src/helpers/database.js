const { Client } = require('pg');

require('dotenv').config();

const database = new Client({
	connectionString: process.env.DB_URI,
	ssl: {
		rejectUnauthorized: false,
	},
});

database
	.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.error('connection error', err.stack));

module.exports = database;

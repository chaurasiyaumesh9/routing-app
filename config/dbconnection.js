var sql = require('mysql');
var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'classicmodels'
});



module.exports = pool;
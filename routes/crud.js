var express    = require('express')   ;
var router= express.Router();
var pool = require('../config/dbconnection');


router.get('/', function( request, response ){
	getUsers( request, response );
});
router.post('/', function( request, response ){
	addUser( request, response );
});
router.delete('/:id', function( request, response ){
	deleteUser( request, response );
});

function getUsers(req, res){
	pool.getConnection( function(err, conn){
		conn.query("select * from users", function(err, rows) {
             if (!err)
			{
				res.json( rows );
			}else{
				console.log('Error while performing the query..check function getUsers() for more details..');
			}
			conn.release();
         });
	});
}
function addUser(req,res){
	pool.getConnection( function(err, conn){
		conn.query("insert into users(username) values('"+ req.body.username +"')", function(err, rows) {
             if (!err)
			{
				res.json( rows );
			}else{
				console.log('Error while performing the query..check function addUser() for more details..');
			}
			conn.release();
         });
	});
}

function deleteUser(req,res){
	pool.getConnection( function(err, conn){
		conn.query("delete from users where id='"+ req.params.id +"'", function(err, rows) {
             if (!err)
			{
				res.json( rows );
			}else{
				console.log('Error while performing the query..check function deleteUser() for more details..');
			}
			conn.release();
         });
	});
}


module.exports = router;

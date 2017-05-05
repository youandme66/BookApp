var Dao=require('./Dao');
var async = require('async');
var pool=new Dao();
module.exports = function transDao(sqlparamEntities,callback){
	pool.getConnection(function(err,connection){
		if(err){
			return callback(err,null);
		}
		connection.beginTransaction(function(err){
			if(err){
				return callback(err,null);
			}
			var funcAry = [];
			sqlparamEntities.forEach(function(sql_param){
				var temp = function(cb){
					var sql = sql_param.sql;
					var param = sql_param.param;
					connection.query(sql,param,function(err,rows,fields){
						if(err){
							connection.rollback(function(){
								console.log(err);
								throw err;
							});
						}else{
							return cb(null,'ok');
						}
					});
				};
				funcAry.push(temp);
			});
			async.series(funcAry,function(err,result){
				console.log(err);
				if(err){
					connection.rollback(function(err){
						console.log(err);
						return callback(err,null);
					});
				}else{
					connection.commit(function(err,info){
						console.log(err);
						if(err){
							connection.rollback(function(err){
								console.log(err);
								connection.release();
							});
						}else{
							connection.release();
							return callback(null,info);
						}
					});
				}
			});
		});
	});
};
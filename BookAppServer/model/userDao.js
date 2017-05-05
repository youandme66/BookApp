var Dao=require('./Dao');
var async = require('async');
var transDao = require('./transDao');
var pool=new Dao();
exports.register = function(user_params,callback){
	var sql = "insert into user(uname,uphone,upassword) value(?,?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.login = function(user_params,callback){
	var sql = "select uid,uname,uimage,uphone from user where uphone=? and upassword=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.updatePassword = function(user_params,callback){
	var sql = "update user set upassword=? where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.supplyInfo = function(user_params,callback){
	var sql = "update user set uemail=?,uqq=?,signature=? where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.updateSetting = function(user_params,callback){
	var sql = "update user set ispushmessage=? where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.getUserInfor = function(user_params,callback){
	var sql = "select uemail,uqq,signature,ispushmessage from user where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.getUserAllInfor = function(user_params,callback){
	var sql = "select uid,uimage,uname,uqq,uphone,ulevel,umoney,uemail,signature from user where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.sendMessage = function(user_params,params2,callback){
	var sql = "insert into userchat(sid,rid,message,time) value(?,?,?,?)";
	var sql2 = "update friend set haschat=1 where uid1=? and uid2=? or uid1=? and uid2=?"
	var params = [{
		sql:sql,
		param:user_params
	},{
		sql:sql2,
		param:params2
	}];
	transDao(params,callback);
};
exports.receiveMessage = function(user_params,callback){
	var sql = "update userchat set isread=1 where sid=? and rid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.searchFriend = function(user_params,callback){
	var sql = "select uid,uimage,uname,signature from user where (uphone=? or uname=?) and uid!=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.addFriend = function(user_params,callback){
	var sql = "insert into friend(uid1,uid2) value(?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.isFriend = function(user_params,callback){
	var sql = "select * from friend where uid1=? and uid2=? or uid1=? and uid2=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.getMyFriend = function(user_params,callback){
	var data ={};
	var sql1 = "select uid,uimage,uname,signature from user where uid in (select uid2 from friend where uid1=? and isagree=1)";
	var sql2 = "select uid,uimage,uname,signature from user where uid in (select uid1 from friend where uid2=? and isagree=1)";
	var sql3 = "select uid,uimage,uname,signature from user where uid in (select uid1 from friend where uid2=? and isagree=0)";
	var sql4 = "select uid,uimage,uname,signature from user where uid in (select uid2 from friend where uid1=? and isagree=0)"
	var result1;
	var result2;
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql1,user_params,function(err,result){
			result1 = result;
		});
		connection.query(sql2,user_params,function(err,result){
			result2 = result1.concat(result);
			data.myfriends = result2;
		});
		connection.query(sql4,user_params,function(err,result){
			data.youagree = result;
		})
		connection.query(sql3,user_params,function(err,result){
			data.myagree = result;
			callback(err,data);
		});
		connection.release();
	});
};
exports.deleteFriend = function(user_params,callback){
	var sql = "delete from friend where uid1=? and uid2=? or uid1=? and uid2=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.myAgreeFriend = function(user_params,callback){
	var sql = "update friend set isagree=1 where uid1=? and uid2=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.cancelPost = function(user_params,callback){
	var sql = "delete from friend where uid1=? and uid2=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.getMessage = function(user_params,callback){
	var sql1 = "update userchat set isread=1 where sid=? and rid=?";
	var sql2 = "select message,time,case when rid=? then true else false end isFromMe from userchat where sid=? and rid=? or sid=? and rid=? order by mid asc";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql1,user_params.one,function(err){});
		connection.query(sql2,user_params.two,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.getLastOneMessage = function(user_params,callback2){
	var data = [];
	var count = 0;
	var sql1 = "select case when uid1=? then uid2 else uid1 end uid from friend where (uid1=? or uid2=?) and haschat=1";
	var sql2 = "select uid,uname,uimage from user where uid in (select case when uid1=? then uid2 else uid1 end uid from friend where uid1=? or uid2=?)";
	var sql3 = "select count(isread=0 or null) nrmc,message lastmessage,date_format(time,'%Y-%c-%d %h:%i:%s') origintime from userchat where rid=? and sid=? or rid=? and sid=? GROUP BY isread,message,time ORDER BY time desc LIMIT 1;";
	pool.getConnection(function(err,connection){
		connection.connect();
		async.waterfall([
			function(callback){
				connection.query(sql1,user_params,function(err,result){
					callback(null,result);
				});
			},
			function(arg1,callback){
				for(var i=0;i<arg1.length;i++){
					var user_params2 = [user_params[0],arg1[i].uid,arg1[i].uid,user_params[0]];
					connection.query(sql3,user_params2,function(err,result){
						data[count] = result[0];
						count++;
						if(count==arg1.length){
							callback(null)
						}
					});
				}
			},
			function(callback){
				connection.query(sql2,user_params,function(err,result){
					for(var i=0;i<data.length;i++){
						if(data[i]==null){
							data[i]={};
						}
						data[i].uid = result[i].uid;
						data[i].uname = result[i].uname;
						data[i].uimage = result[i].uimage;
					}
					callback(null);
				});
			}
			],function(err){
				if(err){
					console.log(err);
				}else{
					callback2(err,data);
				}	
			});
		connection.release();
	});

};
exports.deleteMessage = function(user_params,callback){
	var sql1 = "delete from userchat where rid=? and sid=? or rid=? and sid=?";
	var sql2 = "update friend set haschat=0 where uid1=? and uid2=? or uid1=? and uid2=?";
	var param = [{
		sql:sql1,
		param:user_params
	},{
		sql:sql2,
		param:user_params
	}];
	transDao(param,callback);
};
exports.getOnReadMessage = function(user_params,callback){
	var sql = "select count(isread=0 or null) nrmc from userchat where rid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
exports.beginFollow = function(user_params,callback){
	var sql = "insert into follow(uid,fid) value(?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.cancelFollow = function(user_params,callback){
	var sql = "delete from follow where uid=? and fid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.getMyFollow = function(user_params,callback){
	var sql = "select fid,uname,uimage,signature from follow a inner join user b on a.fid=b.uid where a.uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
exports.updateImageUrl = function(user_params,callback){
	var sql = "update user set uimage=? where uid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
	
};
exports.addBook = function(user_params,callback){
	var sql = "insert into book(uid,bname,bcreatetime,isself,bauthor,bupdatetime,tags,bintroduce,type,lock) value(?,?,?,1,?,?,?,?,?,1)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,user_params,function(err){
			callback(err);
		});
		connection.release();
	});
};

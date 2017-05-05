var userDao = require('../model/userDao');
var timeUtil = require('../util/timeUtil');
exports.instantMessage = function(err,socket,session){
	socket.on('sendMessage',function(data){
		var user_params = [session.uid,data.rid,data.content,timeUtil.getFullTime()];
		var params2 = [session.uid,data.rid,data.rid,session.uid];
		userDao.sendMessage(user_params,params2,function(err,result){
			if(err){
				socket.emit(data.sid+'err',{
					content:'服务器错误'
				});
			}else{
				socket.broadcast.emit(''+data.rid,{
					sid:session.uid,
					content:data.content
				});
			}
		})	
	});
	socket.on('receiveMessage',function(data){
		var user_params = [data.sid,data.rid];
		userDao.receiveMessage(user_params,function(err){});
	});
};
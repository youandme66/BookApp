var userDao = require('../model/userDao');
var bookDao = require('../model/bookDao');
var auth = require('../middleware/auth');
var allCfg = require('../config/allCfg');
var util = require('../util/timeUtil');
var image_upload = require('../util/user_image_upload');
var user_upload=image_upload.single('user');
exports.login = function(req,res){
	var uphone = req.body.uphone;
	var upassword = req.body.upassword;
	var user_params = [uphone,upassword];
	userDao.login(user_params,function(err,result){
		if(err){
			res.json({
				code:500,
				msg:'登录错误'
			});
		}else{
			if(result.length==0){
				res.json({
					code:404,
					msg:'用户名或密码错误'
				});
			}else{
				req.session.uid=result[0].uid;
				res.json({
					code:200,
					msg:result
				});
			}
		}
	});
};
exports.register = function(req,res){
	var uname = req.body.uname;
	var uphone = req.body.uphone;
	var upassword = req.body.upassword;
	var user_params = [uname,uphone,upassword];
	userDao.register(user_params,function(err){
		if(err){
			res.json({
				code:500,
				msg:'注册失败'
			});
		}else{
			res.json({
				code:200,
				msg:'注册成功'
			});
		}
	});
};
exports.exit = function(req,res){
	req.session.destroy();
	res.json({
		code:200,
		msg:'退出成功'
	});
};
exports.updatePassword = function(req,res){
	var uid = req.session.uid;
	var upassword = req.body.upassword;
	var user_params = [upassword,uid];
	userDao.updatePassword(user_params,function(err){
		if(err){
			res.json({
				code:500,
				msg:'密码修改失败'
			});
		}else{
			res.json({
				code:200,
				msg:'密码修改成功'
			});
		}
	});
};
exports.supplyInfo = function(req,res){
	var uemail = req.body.uemail;
	var uqq = req.body.uqq;
	var signature = req.body.signature;
	var uid = req.session.uid;
	var user_params = [uemail,uqq,signature,uid];
	userDao.supplyInfo(user_params,function(err){
		if(err){
			res.json({
				code:500,
				msg:'信息完善失败'
			});
		}else{
			res.json({
				code:200,
				msg:'信息完善成功'
			});
		}
	});
};
exports.updateSetting = function(req,res){
	var ispushmessage = req.body.ispushmessage;
	var uid = req.session.uid;
	var user_params = [ispushmessage,uid];
	userDao.updateSetting(user_params,function(err){
		if(err){
			res.json({
				code:500,
				msg:'修改设置失败'
			});
		}else{
			res.json({
				code:200,
				msg:'修改设置成功'
			});
		}
	});
};
exports.getUserInfor = function(req,res){
	var uid = req.session.uid;
	var user_params = [uid];
	userDao.getUserInfor(user_params,function(err,result){
		if(err){
			res.json({
				code:500,
				msg:'获取信息失败'
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.getUserAllInfor = function(req,res){
	var uid = req.session.uid;
	var user_params = [uid];
	userDao.getUserAllInfor(user_params,function(err,result){
		if(err){
			res.json({
				code:500,
				msg:'获取信息失败'
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.searchFriend = function(req,res){
	var condition = req.body.condition;
	var uid = req.session.uid;
	var user_params = [condition,condition,uid];
	userDao.searchFriend(user_params,function(err,result){
		if(err){
			res.json({
				code:500,
				msg:'获取信息失败'
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.addFriend = function(req,res){
	var adduid = req.body.uid;
	var uid = req.session.uid;
	var is_user_params = [uid,adduid,adduid,uid];
	var user_params=[uid,adduid];
	userDao.isFriend(is_user_params,function(err,result){
		if(err){
			res.json({
				code:500,
				msg:'请求发送失败'
			});
		}else{
		if(result.length==0){
			userDao.addFriend(user_params,function(err){
				if(err){
					res.json({
						code:500,
						msg:'请求发送失败'
					});
				}else{
					res.json({
						code:200,
						msg:'请求发送成功'
					});
				}
			});
		}else{
			res.json({
				code:404,
				msg:'你们已经是好友了'
			});
		  }			
		}
	});
	
};
exports.getMyFriend = function(req,res){
	var uid = req.session.uid;
	var user_params = [uid];
	userDao.getMyFriend(user_params,function(err,result){
		if(err){
			res.json({
				code:500,
				msg:'获取好友列表失败'
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.deleteFriend = function(req,res){
	var deluid = req.body.deluid;
	var uid = req.session.uid;
	var user_params=[uid,deluid,deluid,uid];
	userDao.deleteFriend(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.myAgreeFriend = function(req,res){
	var agreeuid = req.body.agreeuid;
	var uid = req.session.uid;
	var user_params = [agreeuid,uid];
	userDao.myAgreeFriend(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.cancelPost = function(req,res){
	var canceluid = req.body.canceluid;
	var uid = req.session.uid;
	var user_params = [uid,canceluid];
	userDao.cancelPost(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.refuseFriend = function(req,res){
	var refuseuid = req.body.refuseuid;
	var uid = req.session.uid;
	var user_params = [refuseuid,uid];
	userDao.cancelPost(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.getMessage = function(req,res){
	var data = {};
	var messageuid = req.body.messageuid;
	var uid = req.session.uid;
	var user_params1 = [messageuid];
	var user_params2 = [uid,messageuid,uid,uid,messageuid];
	var user_params3 = [messageuid,uid];
	var user_params = {
		one:user_params3,
		two:user_params2
	}
	userDao.getUserAllInfor(user_params1,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			data.uid = result[0].uid;
			data.uname = result[0].uname;
			data.uimage = result[0].uimage;
			userDao.getMessage(user_params,function(err,result){
				if(err){
						res.json({
						code:500
					});
				}else{
						data.messages = result;
						res.json({
							code:200,
							msg:data
						});
					}
				});
			}
	});
};
exports.getLastOneMessage = function(req,res){
	var uid = req.session.uid;
	var user_params = [uid,uid,uid];
	userDao.getLastOneMessage(user_params,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.deleteMessage = function(req,res){
	var uid = req.session.uid;
	var messageuid = req.body.messageuid;
	var user_params = [uid,messageuid,messageuid,uid];
	userDao.deleteMessage(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.getOnReadMessage = function(req,res){
	var uid = req.session.uid;
	var user_params = [uid];
	userDao.getOnReadMessage(user_params,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.beginFollow = function(req,res){
	var uid = req.session.uid;
	var followuid = req.body.followuid;
	var user_params = [uid,followuid];
	userDao.beginFollow(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.cancelFollow = function(req,res){
	var uid = req.session.uid;
	var followuid = req.body.followuid;
	var user_params = [uid,followuid];
	userDao.cancelFollow(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200
			});
		}
	});
};
exports.getMyFollow = function(req,res){
	var uid = req.session.uid;
	var user_params = [uid];
	userDao.getMyFollow(user_params,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200,
				msg:result
			});
		}
	});
};
exports.userImageUpload = function(req,res){
	var uid = req.session.uid;
	var uimageUrl = allCfg.userImageDir+uid+'.jpg';
	var user_params = [uimageUrl,uid];
	user_upload(req,res,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			userDao.updateImageUrl(user_params,function(err){
				if(err){
					res.json({
						code:500
					});
				}else{
					res.json({
						code:200
					});
				}
			});
		}
	});
};
//添加书籍
exports.addBook = function(req,res){
	var uid = req.session.uid;
	var bname = req.body.bname;
	var bcreatetime = util.getFullTime();
	var tags = req.body.tags;
	var bintroduce = req.body.bintroduce;
	var type = req.body.type;
	var user_params = [uid,bname,bcreatetime,uid,bcreatetime,tags,bintroduce,type];
	var user_params2 = [uid];
	bookDao.isMyBook(user_params2,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			for(x in result){
				if(bname==result[x].bname){
					return res.json({
						code:200,
						msg:'你已经有这样的书名了'
					});
				}
			}
	userDao.addBook(user_params,function(err){
		if(err){
			res.json({
				code:500
			});
		}else{
			res.json({
				code:200,
				msg:'你已成功添加书籍'
			});
		}
	});		
		}
	});
};

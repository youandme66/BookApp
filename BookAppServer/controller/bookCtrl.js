var bookDao = require('../model/bookDao');
var auth = require('../middleware/auth');
exports.getBook = function(req,res){

}
exports.getMyBookCount = function(req,res){
	var uid = req.session.uid;
	var book_params = [uid];
	bookDao.getMyBookCount(book_params,function(err,result){
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
exports.getMyBook = function(req,res){
	var uid = req.session.uid;
	var book_params = [uid];
	var data = [];
	var temp = [];
	bookDao.getMyBook(book_params,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			for(var i=0;i<result.length;i++){
				temp[i%2] = result[i];
				if(i%2==1){
					data[parseInt(i/2)]=temp;
					temp=[];
				}
				if(i==result.length-1&&i%2!=1){
					data[parseInt(i/2)]=temp;
				}
			}
			res.json({
				code:200,
				msg:data
			});
		}
	});
};
exports.getBookInfo = function(req,res){
	var uid = req.session.uid;
	var bid = req.body.bid;
	var book_params = [uid,bid];
	bookDao.getBookInfo(book_params,function(err,result){
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
exports.updateBookInfo = function(req,res){
	var uid = req.session.uid;
	var bid = req.body.bid;
	var bname = req.body.bname;
	var tags = req.body.tags;
	var type = req.body.type;
	var bintroduce = req.body.bintroduce;
	var block = req.body.block;
	var book_params = [bname,type,block,tags,bintroduce,uid,bid];
	bookDao.updateBookInfo(book_params,function(err){
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
exports.deleteBook = function(req,res){
	var uid = req.session.uid;
	var bid = req.body.bid;
	var book_params = [uid,bid];
	bookDao.deleteBook(book_params,function(err){
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
exports.getBookNumber = function(req,res){
	var uid =req.session.uid;
	var bid = req.body.bid;
	var book_params = [bid];
	bookDao.getBookNumber(book_params,function(err,result){
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
exports.addBookNumber = function(req,res){
	var bid = req.body.bid;
	var name = req.body.name;
	var book_params = [bid,name];
	bookDao.addBookNumber(book_params,function(err){
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
exports.updateBookNumberName = function(req,res){
	var id = req.body.id;
	var name = req.body.name;
	var book_params = [name,id];
	bookDao.updateBookNumberName(book_params,function(err){
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
exports.addBookContent = function(req,res){
	var id = req.body.id;
	var content = req.body.content;
	var book_params = [content,id];
	bookDao.addBookContent(book_params,function(err){
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
exports.getBookContent = function(req,res){
	var id = req.body.id;
	var cut = req.body.cut;
	var book_params = [cut,id];
	bookDao.getBookContent(book_params,function(err,result){
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
exports.getCount = function(req,res){
	var bid = req.body.bid;
	var book_params = [bid];
	bookDao.getCount(book_params,function(err,result){
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
exports.getWriteContent = function(req,res){
	var id = req.body.id;
	var count = req.body.count;
	var book_params = [count,id];
	var book_params2 = null;
	var result2 = [];
	result2[0] = {};
	bookDao.getWriteContent(book_params,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			if(result[0].data==""){
				book_params2 = [id];
				bookDao.getAllContent(book_params2,function(err,result){
					if(result[0].content==null){
						result[0].data = result[0].content;
						result[0].length = null;
						res.json({
							code:500,
							msg:result
						});
					}else{
						result2[0].data = result[0].content.substring(0,result[0].content.length-(count-1)*500);
						result2[0].length = result[0].content.length-(count-1)*500;
						res.json({
							code:200,
							msg:result2
						});
					}
				});
			}else{
				result[0].length = null;
				res.json({
					code:200,
					msg:result
				});
			}
		}
	});
};
exports.saveContent = function(req,res){
	var id = req.body.id;
	var content = req.body.content;
	var count = req.body.count;
	var length = req.body.length;
	if(length==null){
		length=0;
	}
	var book_params1 = [id];
	var book_params2 = null;
	bookDao.getAllContent(book_params1,function(err,result){
		if(err){
			res.json({
				code:500
			});
		}else{
			if(result[0].content==null){
				book_params2 = [content,id];
				bookDao.saveContent(book_params2,function(err){
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
			}else{
				var tempstr = result[0].content.substring(0,result[0].content.length-(count-1)*500-length);
				var newstr = tempstr+content;
				var book_params2 = [newstr,id];
				bookDao.saveContent(book_params2,function(err){
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
		}
	});
};
var Dao=require('./Dao');
var async = require('async');
var transDao = require('./transDao');
var pool=new Dao();
//获取书籍
exports.getBook = function(book_params,callback){

}
//获取我的书籍数量
exports.getMyBookCount = function(book_params,callback){
	var sql = "select count(*) mybookcount from book where uid=? and isself=1";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//是否存在这本书名
exports.isMyBook = function(book_params,callback){
	var sql = "select bname from book where uid=? and isself=1";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(er,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获得我的书籍
exports.getMyBook = function(book_params,callback){
	var sql= "select bid,bname,bimage from book where uid=? and isself=1";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获得书籍信息
exports.getBookInfo = function(book_params,callback){
	var sql = "select bid,bname,type,tags,block,bintroduce from book where uid=? and isself=1 and bid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//更新书籍信息
exports.updateBookInfo = function(book_params,callback){
	var sql = "update book set bname=?,type=?,block=?,tags=?,bintroduce=? where uid=? and isself=1 and bid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
//删除书籍
exports.deleteBook = function(book_params,callback){
	var sql = "delete from book where uid=? and isself=1 and bid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
//获得书籍章数
exports.getBookNumber = function(book_params,callback){
	var sql = "select id,name from mybookcontent where bid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//添加小说章数
exports.addBookNumber = function(book_params,callback){
	var sql = "insert into mybookcontent(bid,name) value(?,?)";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
//修改小说章数名
exports.updateBookNumberName = function(book_params,callback){
	var sql = "update mybookcontent set name=? where id=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err){
			callback(err);
		});
		connection.release();
	});
};
//读者小说内容
exports.getBookContent = function(book_params,callback){
	var sql = "select substring(content,?*500+1,500) data from mybookcontent where id=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//获取章数
exports.getCount = function(book_params,callback){
	var sql = "select count(*)+1 number from mybookcontent where bid=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//写者读取小说内容
exports.getWriteContent = function(book_params,callback){
	var sql="select substring(content,-?*500,500) data from mybookcontent where id=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//取小说所有内容
exports.getAllContent = function(book_params,callback){
	var sql = "select content from mybookcontent where id=?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err,result){
			callback(err,result);
		});
		connection.release();
	});
};
//存小说
exports.saveContent = function(book_params,callback){
	var sql = "update mybookcontent set content=? where id =?";
	pool.getConnection(function(err,connection){
		connection.connect();
		connection.query(sql,book_params,function(err){
			callback(err);
		});
		connection.release();
	});
};

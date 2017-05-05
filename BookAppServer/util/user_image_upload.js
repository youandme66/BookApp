var multer=require('multer');
var gm=require('gm').subClass({imageMagick:true});
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/user_images');
    gm('./public/user_images/' + filename).resize(300, 300).write('./public/user_images/' + filename, function(err) {
					if (err) {
						console.log(err);
					}
				});
  },
  filename: function(req, file, cb) {
    var user_id = req.session.uid;
    filename = user_id+".jpg" ;
    cb(null, filename);
  }
});
var user_upload=multer({
	storage:storage
});
module.exports=user_upload;
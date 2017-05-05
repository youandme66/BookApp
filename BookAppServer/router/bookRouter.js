var express = require('express');
var router = express.Router();
var bookCtrl = require('../controller/bookCtrl');
router.post('/getBook',bookCtrl.getBook);
router.post('/getMyBookCount',bookCtrl.getMyBookCount);
router.post('/getMyBook',bookCtrl.getMyBook);
router.post('/getBookInfo',bookCtrl.getBookInfo);
router.post('/updateBookInfo',bookCtrl.updateBookInfo);
router.post('/deleteBook',bookCtrl.deleteBook);
router.post('/getBookNumber',bookCtrl.getBookNumber);
router.post('/addBookNumber',bookCtrl.addBookNumber);
router.post('/updateBookNumberName',bookCtrl.updateBookNumberName);
router.post('/addBookContent',bookCtrl.addBookContent);
router.post('/getBookContent',bookCtrl.getBookContent);
router.post('/getCount',bookCtrl.getCount);
router.post('/getWriteContent',bookCtrl.getWriteContent);
router.post('/saveContent',bookCtrl.saveContent);

module.exports=router;
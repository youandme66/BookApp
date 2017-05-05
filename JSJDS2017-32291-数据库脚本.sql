/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : bookapp

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2017-05-02 20:16:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `bname` varchar(255) NOT NULL,
  `bimage` varchar(255) NOT NULL DEFAULT '/book_images/default.jpg',
  `bcreatetime` datetime NOT NULL,
  `isself` tinyint(4) NOT NULL DEFAULT '0',
  `bauthor` varchar(255) NOT NULL,
  `block` tinyint(4) NOT NULL DEFAULT '0',
  `bupdatetime` datetime NOT NULL,
  `readcount` int(11) DEFAULT '0',
  `bmoney` int(11) DEFAULT '0',
  `dicount` int(11) DEFAULT '0',
  `tags` varchar(255) DEFAULT NULL,
  `bintroduce` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '7', '我的第一本书', '/book_images/default.jpg', '2017-04-19 11:51:39', '1', '7', '0', '2017-04-19 11:51:39', '0', '0', '0', '自创', '我我敬老卡受打击了发见识到了交罚款了圣诞节疯狂拉升经典款浪费', '言情');
INSERT INTO `book` VALUES ('2', '7', '我的第二本书', '/book_images/default.jpg', '2017-04-19 11:53:29', '1', '7', '0', '2017-04-19 11:53:29', '0', '0', '0', '感悟', '娃娃房间卡拉斯的减肥啦开始打九分裤垃圾袋', '玄幻');
INSERT INTO `book` VALUES ('3', '7', '我的第三本书', '/book_images/default.jpg', '2017-04-19 11:54:53', '1', '7', '0', '2017-04-19 11:54:53', '0', '0', '0', '感悟', '健康教案扣篮大赛九分裤垃圾堆里发酵的卡', '言情');

-- ----------------------------
-- Table structure for `bookcase`
-- ----------------------------
DROP TABLE IF EXISTS `bookcase`;
CREATE TABLE `bookcase` (
  `uid` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  KEY `bid3` (`bid`),
  KEY `uid6` (`uid`),
  CONSTRAINT `bid3` FOREIGN KEY (`bid`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid6` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bookcase
-- ----------------------------

-- ----------------------------
-- Table structure for `bookstore`
-- ----------------------------
DROP TABLE IF EXISTS `bookstore`;
CREATE TABLE `bookstore` (
  `bsid` int(11) NOT NULL AUTO_INCREMENT,
  `bsname` varchar(255) NOT NULL,
  `bsintroduce` varchar(255) NOT NULL,
  `bsimageurl` varchar(255) NOT NULL DEFAULT '/public/bookstore_images/default.jpg',
  `bslevel` int(11) NOT NULL DEFAULT '0',
  `bsphone` int(11) NOT NULL,
  `bsemail` varchar(255) NOT NULL,
  `bsidcard` varchar(255) DEFAULT NULL,
  `bstruename` varchar(255) DEFAULT NULL,
  `bsaddress` varchar(255) DEFAULT NULL,
  `block` tinyint(4) DEFAULT '0',
  `isauthen` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`bsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bookstore
-- ----------------------------

-- ----------------------------
-- Table structure for `changebook`
-- ----------------------------
DROP TABLE IF EXISTS `changebook`;
CREATE TABLE `changebook` (
  `uid1` int(11) NOT NULL,
  `uid2` int(11) NOT NULL,
  `bid1` int(11) NOT NULL,
  `bid2` int(11) NOT NULL,
  `isagree` tinyint(4) NOT NULL,
  `isnow` tinyint(4) NOT NULL,
  `ishad` tinyint(4) NOT NULL,
  KEY `bid11` (`bid1`),
  KEY `bid21` (`bid2`),
  KEY `uid11` (`uid1`),
  KEY `uid21` (`uid2`),
  CONSTRAINT `bid11` FOREIGN KEY (`bid1`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `bid21` FOREIGN KEY (`bid2`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid11` FOREIGN KEY (`uid1`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid21` FOREIGN KEY (`uid2`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of changebook
-- ----------------------------

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `bid` int(11) NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL,
  `uid` int(11) NOT NULL,
  KEY `bid4` (`bid`),
  KEY `uid7` (`uid`),
  CONSTRAINT `bid4` FOREIGN KEY (`bid`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid7` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for `commentstore`
-- ----------------------------
DROP TABLE IF EXISTS `commentstore`;
CREATE TABLE `commentstore` (
  `bsid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `comment` text NOT NULL,
  `creatime` date NOT NULL,
  KEY `uid12` (`uid`),
  KEY `bsid5` (`bsid`),
  CONSTRAINT `bsid5` FOREIGN KEY (`bsid`) REFERENCES `bookstore` (`bsid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid12` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commentstore
-- ----------------------------

-- ----------------------------
-- Table structure for `community`
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) NOT NULL,
  `cintroduce` varchar(255) NOT NULL,
  `ctime` datetime NOT NULL,
  `count` int(11) NOT NULL,
  `climitcount` int(11) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `cimageurl` varchar(255) NOT NULL DEFAULT '/public/community_images/default.jpg',
  PRIMARY KEY (`cid`),
  KEY `uid8` (`uid`),
  CONSTRAINT `uid8` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of community
-- ----------------------------

-- ----------------------------
-- Table structure for `compeople`
-- ----------------------------
DROP TABLE IF EXISTS `compeople`;
CREATE TABLE `compeople` (
  `cid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `isagree` tinyint(4) NOT NULL,
  KEY `cid2` (`cid`),
  KEY `uid15` (`uid`),
  CONSTRAINT `cid2` FOREIGN KEY (`cid`) REFERENCES `community` (`cid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid15` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of compeople
-- ----------------------------

-- ----------------------------
-- Table structure for `donetask`
-- ----------------------------
DROP TABLE IF EXISTS `donetask`;
CREATE TABLE `donetask` (
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  KEY `uid16` (`uid`),
  KEY `tid1` (`tid`),
  CONSTRAINT `tid1` FOREIGN KEY (`tid`) REFERENCES `task` (`tid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid16` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of donetask
-- ----------------------------

-- ----------------------------
-- Table structure for `exercise`
-- ----------------------------
DROP TABLE IF EXISTS `exercise`;
CREATE TABLE `exercise` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `eauthor` varchar(255) NOT NULL,
  `eaddress` varchar(255) NOT NULL,
  `etime` datetime NOT NULL,
  `eisclose` tinyint(4) NOT NULL,
  `ecareful` varchar(255) NOT NULL,
  `ecount` int(11) NOT NULL,
  `eintroduce` varchar(255) NOT NULL,
  `bsid` int(11) NOT NULL,
  PRIMARY KEY (`eid`),
  KEY `bsid1` (`bsid`),
  CONSTRAINT `bsid1` FOREIGN KEY (`bsid`) REFERENCES `bookstore` (`bsid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exercise
-- ----------------------------

-- ----------------------------
-- Table structure for `exercisecomment`
-- ----------------------------
DROP TABLE IF EXISTS `exercisecomment`;
CREATE TABLE `exercisecomment` (
  `eid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `content` text NOT NULL,
  `creatime` datetime NOT NULL,
  KEY `eid2` (`eid`),
  KEY `uid14` (`uid`),
  CONSTRAINT `eid2` FOREIGN KEY (`eid`) REFERENCES `exercise` (`eid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid14` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exercisecomment
-- ----------------------------

-- ----------------------------
-- Table structure for `follow`
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `uid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  KEY `uid1` (`uid`),
  KEY `uid2` (`fid`),
  CONSTRAINT `uid1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid2` FOREIGN KEY (`fid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of follow
-- ----------------------------

-- ----------------------------
-- Table structure for `friend`
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `uid1` int(11) NOT NULL,
  `uid2` int(11) NOT NULL,
  `isagree` tinyint(4) NOT NULL DEFAULT '0',
  `haschat` tinyint(4) NOT NULL DEFAULT '0',
  KEY `uid17` (`uid1`),
  KEY `uid18` (`uid2`),
  CONSTRAINT `uid17` FOREIGN KEY (`uid1`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid18` FOREIGN KEY (`uid2`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES ('6', '3', '1', '1');
INSERT INTO `friend` VALUES ('3', '9', '1', '1');
INSERT INTO `friend` VALUES ('3', '10', '1', '1');
INSERT INTO `friend` VALUES ('3', '7', '1', '0');
INSERT INTO `friend` VALUES ('7', '9', '1', '1');
INSERT INTO `friend` VALUES ('7', '10', '1', '1');
INSERT INTO `friend` VALUES ('10', '9', '1', '1');
INSERT INTO `friend` VALUES ('3', '11', '1', '1');

-- ----------------------------
-- Table structure for `guidance`
-- ----------------------------
DROP TABLE IF EXISTS `guidance`;
CREATE TABLE `guidance` (
  `uid` int(11) NOT NULL,
  `bsid` int(11) NOT NULL,
  `bsnumber` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `isanswer` tinyint(4) DEFAULT '0',
  `glock` tinyint(4) DEFAULT '0',
  KEY `uid10` (`uid`),
  KEY `bsid3` (`bsid`),
  KEY `bsnumber1` (`bsnumber`),
  CONSTRAINT `bsid3` FOREIGN KEY (`bsid`) REFERENCES `bookstore` (`bsid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `bsnumber1` FOREIGN KEY (`bsnumber`) REFERENCES `server` (`bsnumber`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid10` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of guidance
-- ----------------------------

-- ----------------------------
-- Table structure for `mybookcontent`
-- ----------------------------
DROP TABLE IF EXISTS `mybookcontent`;
CREATE TABLE `mybookcontent` (
  `bid` int(11) NOT NULL,
  `content` longtext,
  `name` varchar(10) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `bid5` (`bid`),
  CONSTRAINT `bid5` FOREIGN KEY (`bid`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mybookcontent
-- ----------------------------
INSERT INTO `mybookcontent` VALUES ('1', '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十我想看懂我们不需要看懂', '孙悟空大脑天宫', '1');
INSERT INTO `mybookcontent` VALUES ('1', null, '孙悟空三打白骨精', '2');
INSERT INTO `mybookcontent` VALUES ('1', null, '我已经搞定了', '3');

-- ----------------------------
-- Table structure for `option`
-- ----------------------------
DROP TABLE IF EXISTS `option`;
CREATE TABLE `option` (
  `uid` int(11) NOT NULL,
  `content` text NOT NULL,
  `createtime` datetime NOT NULL,
  KEY `uid13` (`uid`),
  CONSTRAINT `uid13` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of option
-- ----------------------------

-- ----------------------------
-- Table structure for `people`
-- ----------------------------
DROP TABLE IF EXISTS `people`;
CREATE TABLE `people` (
  `eid` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  KEY `eid1` (`eid`),
  KEY `uid9` (`uid`),
  CONSTRAINT `eid1` FOREIGN KEY (`eid`) REFERENCES `exercise` (`eid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid9` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of people
-- ----------------------------

-- ----------------------------
-- Table structure for `punch`
-- ----------------------------
DROP TABLE IF EXISTS `punch`;
CREATE TABLE `punch` (
  `uid` int(11) NOT NULL,
  `date` date NOT NULL,
  KEY `uid3` (`uid`),
  CONSTRAINT `uid3` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of punch
-- ----------------------------

-- ----------------------------
-- Table structure for `readhistory`
-- ----------------------------
DROP TABLE IF EXISTS `readhistory`;
CREATE TABLE `readhistory` (
  `uid` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  KEY `bid1` (`bid`),
  KEY `uid4` (`uid`),
  CONSTRAINT `bid1` FOREIGN KEY (`bid`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid4` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of readhistory
-- ----------------------------

-- ----------------------------
-- Table structure for `sentiment`
-- ----------------------------
DROP TABLE IF EXISTS `sentiment`;
CREATE TABLE `sentiment` (
  `uid` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  KEY `bid2` (`bid`),
  KEY `uid5` (`uid`),
  CONSTRAINT `bid2` FOREIGN KEY (`bid`) REFERENCES `book` (`bid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `uid5` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sentiment
-- ----------------------------

-- ----------------------------
-- Table structure for `server`
-- ----------------------------
DROP TABLE IF EXISTS `server`;
CREATE TABLE `server` (
  `bsid` int(11) NOT NULL,
  `bsname` varchar(255) NOT NULL,
  `bsnumber` varchar(255) NOT NULL,
  `bspassword` varchar(16) NOT NULL,
  `bsphone` int(11) NOT NULL,
  `isable` tinyint(4) NOT NULL DEFAULT '1',
  `bsimageurl` varchar(255) NOT NULL DEFAULT '/public/server_images/default.jpg',
  PRIMARY KEY (`bsnumber`),
  KEY `bsid2` (`bsid`),
  CONSTRAINT `bsid2` FOREIGN KEY (`bsid`) REFERENCES `bookstore` (`bsid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of server
-- ----------------------------

-- ----------------------------
-- Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `cid` int(11) NOT NULL,
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(255) NOT NULL,
  `tdescription` varchar(255) NOT NULL,
  `tlimisttime` datetime NOT NULL,
  `isclose` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tid`),
  KEY `cid1` (`cid`),
  CONSTRAINT `cid1` FOREIGN KEY (`cid`) REFERENCES `community` (`cid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(8) NOT NULL,
  `uphone` varchar(11) NOT NULL,
  `uemail` varchar(20) DEFAULT NULL,
  `signature` varchar(30) DEFAULT NULL,
  `upassword` varchar(16) NOT NULL,
  `umoney` float(8,1) DEFAULT NULL,
  `ulevel` int(11) DEFAULT NULL,
  `ucreatetime` datetime DEFAULT NULL,
  `uimage` varchar(255) DEFAULT '/user_images/default.jpg',
  `uqq` int(11) DEFAULT NULL,
  `ispushmessage` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('3', '忆往昔我', '13554468370', '2514705610@qq.com', '一个人的生活我才', 'lzh001520258', '1000.0', '100', null, '/user_images/default.jpg', '1319135082', '0');
INSERT INTO `user` VALUES ('6', '一个孤独的鬼', '17702737106', null, '我们都是好孩子', '001520258', null, '100', null, '/user_images/default.jpg', null, '1');
INSERT INTO `user` VALUES ('7', '王扬', '18672353951', null, null, 'zm01010805', null, null, null, '/user_images/default.jpg', null, '1');
INSERT INTO `user` VALUES ('9', 'hk', '18186473712', '295243877@qq.com', 'ha', '43170088', null, null, null, '/user_images/default.jpg', '295243877', '1');
INSERT INTO `user` VALUES ('10', 'shitou', '18186471979', '342002906@qq.com', 'qwe', '87654321', null, null, null, '/user_images/default.jpg', '342002906', '1');
INSERT INTO `user` VALUES ('11', '你提', '15334049559', null, null, '123456789', null, null, null, '/user_images/default.jpg', null, '1');

-- ----------------------------
-- Table structure for `userchat`
-- ----------------------------
DROP TABLE IF EXISTS `userchat`;
CREATE TABLE `userchat` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `message` text NOT NULL,
  `isread` tinyint(4) NOT NULL DEFAULT '0',
  `time` datetime DEFAULT NULL,
  `isshow` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userchat
-- ----------------------------
INSERT INTO `userchat` VALUES ('6', '7', '9', '666', '1', '2017-04-17 19:40:53', '1');
INSERT INTO `userchat` VALUES ('9', '10', '3', 'q', '1', '2017-04-17 19:41:23', '1');
INSERT INTO `userchat` VALUES ('10', '9', '3', 'hi', '1', '2017-04-17 19:41:51', '1');
INSERT INTO `userchat` VALUES ('11', '3', '10', '测试', '1', '2017-04-17 19:42:15', '1');
INSERT INTO `userchat` VALUES ('12', '10', '9', 'q', '1', '2017-04-17 19:42:31', '1');
INSERT INTO `userchat` VALUES ('13', '3', '10', '在哪？', '0', '2017-04-17 19:42:37', '1');
INSERT INTO `userchat` VALUES ('14', '9', '7', 'hi', '1', '2017-04-17 19:43:25', '1');
INSERT INTO `userchat` VALUES ('15', '7', '10', '在吗', '0', '2017-04-18 23:48:18', '1');
INSERT INTO `userchat` VALUES ('16', '3', '11', '在？', '1', '2017-04-26 17:58:02', '1');

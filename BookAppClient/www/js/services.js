angular.module('starter.services', [])
	.factory('messageService', ['$http', function($http) {
		return {

		};
	}])
	.factory('utilService', [function() {
		var socket = io.connect('http://123.56.31.2:4000',{rememberTransport:true,timeout:1500});
		return {
			getScoket: function() {
				return socket;
			},
			handleMessageDate: function(messages) {
				var i = 0,
					length = 0,
					messageDate = {},
					nowDate = {},
					weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
					diffWeekValue = 0;
				if (messages) {
					nowDate = this.getNowDate();
					length = messages.length;
					for (i = 0; i < length; i++) {
						messageDate = this.getMessageDate(messages[i]);
						if (!messageDate) {
							return null;
						}
						if (nowDate.year - messageDate.year > 0) {
							messages[i].time = messageDate.year + "";
							continue;
						}
						if (nowDate.month - messageDate.month >= 0 ||
							nowDate.day - messageDate.day > nowDate.week) {
							messages[i].time = messageDate.month +
								"月" + messageDate.day + "日";
							continue;
						}
						if (nowDate.day - messageDate.day <= nowDate.week &&
							nowDate.day - messageDate.day > 1) {
							diffWeekValue = nowDate.week - (nowDate.day - messageDate.day);
							messages[i].time = weekArray[diffWeekValue];
							continue;
						}
						if (nowDate.day - messageDate.day === 1) {
							messages[i].time = "昨天";
							continue;
						}
						if (nowDate.day - messageDate.day === 0) {
							messages[i].time = messageDate.hour + ":" + messageDate.minute;
							continue;
						}
					}
					// console.log(messages);
					// return messages;
				} else {
					console.log("messages is null");
					return null;
				}

			},
			getNowDate: function() {
				var nowDate = {};
				var date = new Date();
				nowDate.year = date.getFullYear();
				nowDate.month = date.getMonth();
				nowDate.day = date.getDate();
				nowDate.week = date.getDay();
				nowDate.hour = date.getHours();
				nowDate.minute = date.getMinutes();
				nowDate.second = date.getSeconds();
				return nowDate;
			},
			getMessageDate: function(message) {
				var messageDate = {};
				var messageTime = "";
				//2015-10-12 15:34:55
				var reg = /(^\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/g;
				var result = new Array();
				if (message) {
					messageTime = message.origintime;
					result = reg.exec(messageTime);
					if (!result) {
						console.log("result is null");
						return null;
					}
					messageDate.year = parseInt(result[1]);
					messageDate.month = parseInt(result[2]);
					messageDate.day = parseInt(result[3]);
					messageDate.hour = parseInt(result[4]);
					messageDate.minute = parseInt(result[5]);
					messageDate.second = parseInt(result[6]);
					return messageDate;
				} else {
					console.log("message is null");
					return null;
				}
			}
		}
	}])
	.factory('todataService', [function() {
		return {
			setdata: function(data) {
				this.data = data;
			},
			getdata: function() {
				return this.data;
			},
			setdatabid:function(data){
				this.databid = data;
			},
			getdatabid:function(){
				return this.databid;
			}
		}
	}])
	.factory('localService', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key) {
				return $window.localStorage[key];
			}
		}
	}])
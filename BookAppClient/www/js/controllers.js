angular.module('starter.controllers',[])
// 欢迎界面
.controller('splashController',[
      '$scope',
      '$location',
      '$window', 
      '$ionicHistory',
      '$interval',function(
            $scope,
            $location,
            $window,
            $ionicHistory,
            $interval){

	$scope.vm={};//数据模型对象
	$scope.vm.count=3;
	var timer=$interval(function () {
		  $scope.vm.count--;
		  if($scope.vm.count==0){
		  	$interval.cancel(timer);
		  	startApp();
		  }
	},1000);

	// $window.localStorage['code']='25c85dd791fd81f528eb550d6c107dcf';
	
	//事件:
	$scope.goEarlier=function () {
		  $interval.cancel(timer);
		  startApp();
	}
	function startApp () {
		// var user = $window.localStorage['code'] || '';
		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});
			$location.path('/tab/find');
	}
}])
// 主菜单
.controller('tabController',[
      '$scope',
      'localService',
      '$state',
      '$cordovaDialogs',
      'url',
      '$rootScope',function(
             $scope,
             localService,
            $state,
            $cordovaDialogs,
            url,
            $rootScope){
       $scope.uname=localService.get('uname');
       if($scope.uname){
            $scope.uimage=url+'/user_images/default.jpg';
       }else{
            $scope.uimage='../img/ionic.png';
       }
       $scope.gologin=function(){
            if($scope.uname){
                  $state.go('showinfo');
            }else{
                  $state.go('login');
            }
       };
       $scope.go=function(view){
            if($scope.uname){
                 $state.go(view);
            }else{
                  $cordovaDialogs.alert('请登录账号','提示信息','确定');
            }
       }
}])
// 发现
.controller('findController',[
      '$scope',
      '$rootScope',
      '$state',
      'localService',function(
            $scope,
            $rootScope,
            $state,
            localService){
	$scope.bookstore=function(){
            $state.go('bookstoredetail');
      };
     
}])
// 通讯录
.controller('chatController',[
      '$scope',
      '$http',
      '$cordovaToast',
      'url',function(
            $scope,
            $http,
            $cordovaToast,
            url){
        $http({
              method:'post',
              url:url+'/user/getOnReadMessage'
        }).then(function(res){
          if(res.data.code!=200){
            $cordovaToast.show('获取信息条数失败','short','bottom');
          }
            $scope.nrmc=res.data.msg[0].nrmc;
        });
}])
// 书房
.controller('bookController',[
      '$scope',
      '$http',function(
            $scope,
            $http){
	
      
}])
// 其他
.controller('otherController',[
      '$scope',
      '$http',
      'url',
      '$cordovaToast',function(
            $scope,
            $http,
            url,
            $cordovaToast){
        $http({
          method:'post',
          url:url+'/book/getMyBookCount'
        }).then(function(res){
          if(res.data.code!=200){
            $cordovaToast.show('获取数据失败','short','bottom');
          }else{
            $scope.mybookcount=res.data.msg[0].mybookcount;
          }
        });
}])
//个人信息菜单
.controller('selfinforController',[
      '$scope',
      '$ionicPopup',
      '$window',
      '$http',
      'url',
      '$cordovaDialogs',
      '$state',
      'localService',
      '$cordovaToast',function(
            $scope,
            $ionicPopup,
            $window,
            $http,
            url,
            $cordovaDialogs,
            $state,
            localService,
            $cordovaToast){
      $scope.uname = localService.get('uname');
      $scope.uphone = localService.get('uphone');
      $scope.user = {};
      $scope.popup = {
            isPopup: false
        };
      $http({
            url:url+'/user/getUserInfor',
             headers:{'Content-Type':'application/json;charset=utf-8'},
            method:'post'
      }).then(function(res){
            if(res.data.code!=200 || res.status!=200){
                  $cordovaToast.show('获取信息失败','short','bottom');
            }else{
                  $scope.user.uemail = res.data.msg[0].uemail;
                  $scope.user.uqq = res.data.msg[0].uqq;
                  $scope.user.signature = res.data.msg[0].signature;
                  var isChecked;
                  if(res.data.msg[0].ispushmessage){
                        $scope.user.isChecked = true;
                  }else{
                        $scope.user.isChecked = false;
                  }
            }
      });
      $scope.popupOptions = function() {
        $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/useruploadimage.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
    };
    $scope.imgSrc;
    $scope.reader = new FileReader();
    $scope.img_upload = function(files){
      $scope.reader.readAsDataURL(files[0]);
      $scope.reader.onload=function(event){
            $scope.$apply(function(){
                  $scope.imgSrc=event.target.result;
            });
      };
    };
    $scope.exitapp = function(){
      $http({
            url:url+'/user/exit',
             headers:{'Content-Type':'application/json;charset=utf-8'},
            method:'post'
      }).then(function(res){
            $cordovaDialogs.alert(res.data.msg,'提示信息','确定');
            $window.localStorage.clear();
            $state.go('tab.find');
      });
    };
    $scope.supplyInfoPopup = function(){
      $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/supplyInfoPopup.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
    };
    $scope.updatePasswordPopup = function(){
      $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/updatePasswordPopup.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
    };
    $scope.isPushMessagePopup = function(){
      console.log($scope.isChecked);
      $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/isPushMessagePopup.html",
            scope: $scope
        });
        $scope.popup.isPopup = true;
    };
    $scope.supplyInfo = function(){
      $http({
            url:url+'/user/supplyInfo',
            method:'post',
             headers:{'Content-Type':'application/json;charset=utf-8'},
            data:{
                  uemail:$scope.user.uemail,
                  uqq:$scope.user.uqq,
                  signature:$scope.user.signature
            }
      }).then(function(res){
            if(res.data.code!=200){
                  $cordovaDialogs.alert(res.data.msg,'提示信息','确认');
            }else{
                  $scope.popup.optionsPopup.close();
                  $scope.popup.isPopup = false;
                  $cordovaToast.show(res.data.msg,'short','bottom');
            }
      });
    };
    $scope.updatepwd = function(){
      if($scope.user.upassword!=$scope.user.apassword){
            $cordovaDialogs.alert('两次输入的密码不一致','提示信息','确认');
      }else{
            $http({
                  url:url+'/user/updatePassword',
                  method:'post',
                   headers:{'Content-Type':'application/json;charset=utf-8'},
                  data:{
                        upassword:$scope.user.upassword
                  }
            }).then(function(res){
                  if(res.data.code!=200){
                        $cordovaDialogs.alert(res.data.msg,'提示信息','确认');
                  }else{
                        $scope.user.upassword = null;
                        $scope.user.apassword = null;
                        $scope.popup.optionsPopup.close();
                        $scope.popup.isPopup = false;
                        $cordovaToast.show(res.data.msg,'short','bottom');
                  }
            });
      } 
    };
    $scope.updateSetting = function(){
      var isTrue;
      if($scope.user.isChecked){
            isTrue = 1;
      }else{
            isTrue = 0;
      }
      $http({
            url:url+'/user/updateSetting',
            method:'post',
             headers:{'Content-Type':'application/json;charset=utf-8'},
            data:{
                  ispushmessage:isTrue
            }
      }).then(function(res){
            if(res.data.code!=200){
                  $cordovaToast.show(res.data.msg,'short','bottom');
            }else{
                  $scope.popup.optionsPopup.close();
                  $scope.popup.isPopup = false;
                  $cordovaToast.show(res.data.msg,'short','bottom');
            }
      });
    };
}])
//换书菜单
.controller('changebooktabs',[
      '$scope',
      '$state',function(
            $scope,
            $state){
	$scope.myback = function(){
		$state.go('tab.book');
	};
}])
// 我的交换书
.controller('mychangebookController',[
      '$scope',
      '$state',function(
            $scope,
            $state){
	$scope.onSwipeLeft = function(){
		$state.go('changebooktabs.mychanging');
	};
}])
// 正在交换的书
.controller('mychangingbookController',[
      '$scope',
      '$state',function(
            $scope,
            $state){
	$scope.onSwipeRight = function(){
		$state.go('changebooktabs.mychange');
	};
	$scope.onSwipeLeft = function(){
		$state.go('changebooktabs.changebook');
	};
}])
// 换书看
.controller('changebookController',[
      '$scope',
      '$state',function(
            $scope,
            $state){
	$scope.onSwipeRight = function(){
		$state.go('changebooktabs.mychanging');
	}
}])
// 我的书友
.controller('bookfriendController',[
      '$scope',
      '$http',
      'url',
      '$cordovaToast',
      '$rootScope',
      'todataService',
      '$state',function(
            $scope,
            $http,
            url,
            $cordovaToast,
            $rootScope,
            todataService,
            $state){
            function init(){
               $http({
                  method:'post',
                  url:url+'/user/getmyfriend',
                   headers:{'Content-Type':'application/json;charset=utf-8'}
            }).then(function(res){
                  if(res.data.code!=200){
                        $cordovaToast.show('获取信息失败','short','bottom');
                  }else{
                        if(res.data.msg==null){
                              $cordovaToast.show('你还没有好友，去添加好友吧','short','bottom');
                        }else{
                              $scope.data = res.data.msg;
                        }  
                  }
            });   
            }
            init();
            $scope.goAddFriend = function(){
                  $state.go('addfriend');
            };
            $scope.deleteFriend = function(deluid){
                  $http({
                        url:url+'/user/deleteFriend',
                        method:'post',
                        headers:{'Content-Type':'application/json;charset=utf-8'},
                        data:{
                              deluid:deluid
                        }
                  }).then(function(res){
                        if(res.data.code!=200){
                              $cordovaToast.show('删除书友失败','short','bottom');
                        }else{
                              $cordovaToast.show('删除书友成功','short','bottom');
                              init();
                        }
                  });
            };
            $scope.myAgreeFriend = function(agreeuid){
                  $http({
                        url:url+'/user/myAgreeFriend',
                        method:'post',
                         headers:{'Content-Type':'application/json;charset=utf-8'},
                        data:{
                              agreeuid:agreeuid
                        }
                  }).then(function(res){
                        if(res.data.code!=200){
                              $cordovaToast.show('操作失败','short','bottom');
                        }else{
                              $cordovaToast.show('添加成功','short','bottom');
                              init();
                        }
                  });
            };
            $scope.cancelPost = function(canceluid){
                  $http({
                        url:url+'/user/cancelPost',
                        method:'post',
                        headers:{'Content-Type':'application/json;charset=utf-8'},
                        data:{
                              canceluid:canceluid
                        }
                  }).then(function(res){
                        if(res.data.code!=200){
                              $cordovaToast.show('操作失败','short','bottom');
                        }else{
                              $cordovaToast.show('取消请求成功','short','bottom');
                              init();
                        }
                  });
            };
            $scope.refuseFriend = function(refuseuid){
                  $http({
                        url:url+'/user/refuseFriend',
                        method:'post',
                         headers:{'Content-Type':'application/json;charset=utf-8'},
                        data:{
                              refuseuid:refuseuid
                        }
                  }).then(function(res){
                        if(res.data.code!=200){
                              $cordovaToast.show('拒绝失败','short','bottom');
                        }else{
                              $cordovaToast.show('拒绝成功','short','bottom');
                              init();
                        }
                  });
            };
            //与书友聊天
            $scope.chat = function(messageuid){
                  todataService.setdata(messageuid);
                  $state.go('messagedetail');
            };
}])
// 个人信息详情
.controller('showinfoController',[
      '$scope',
      '$http',
      'url',function(
            $scope,
            $http,
            url){
      $http({
            method:'post',
             headers:{'Content-Type':'application/json;charset=utf-8'},
            url:url+'/user/getUserAllInfor'
      }).then(function(res){
            if(res.data.code!=200){
                  $cordovaToast.show('获取信息失败','short','bottom');
            }else{
                  $scope.selfinfor = res.data.msg[0];
            }
      });
}])
// 聊天列表
.controller('messageController',[
      '$scope',
      '$http',
      'utilService',
      '$state',
      'todataService',
      'url',
      '$cordovaToast',function(
            $scope,
            $http,
            utilService,
            $state,
            todataService,
            url,
            $cordovaToast){
            $http({
                  method:'post',
                  url:url+'/user/getLastOneMessage',
            }).then(function(res){
                  if(res.data.code!=200){
                        $cordovaToast.show('获取信息失败','short','bottom');
                  }else{
                        $scope.messages = res.data.msg;
                        for(i=0;i<$scope.messages.length;i++){
                              if ($scope.messages[i].nrmc > 0) {
                                    $scope.messages[i].showHint = true;
                              } else {
                                    $scope.messages[i].showHint = false;
                              }
                        }
                        utilService.handleMessageDate($scope.messages);
                  }
            });
      $scope.messageDetils = function(messageid){
            todataService.setdata(messageid);
            $state.go('messagedetail');
      };
      $scope.deleteMessage = function(messageuid){
        $http({
          method:'post',
          url:url+'/user/deleteMessage',
          data:{
            messageuid:messageuid
          }
        }).then(function(res){
          if(res.data.code!=200){
            $cordovaToast.show('获取信息失败','short','bottom');
          }else{
            for(var i=0;i<$scope.messages.length;i++){
              if($scope.messages[i].uid==messageuid){
                delete $scope.messages[i];
                $scope.$apply();
              }
            }
          }
        });
      }
}])
// 聊天详情
.controller('messagedetailController',[
      '$scope',
      '$http',
      'todataService',
      '$cordovaToast',
      'url',
      'utilService',
      'localService',
      '$ionicScrollDelegate',function(
            $scope,
            $http,
            todataService,
            $cordovaToast,
            url,
            utilService,
            localService,
            $ionicScrollDelegate){
      var socket = utilService.getScoket();
      $scope.messagedetail={};
      var viewScroll =  $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
      $http({
            method:'post',
            url:url+'/user/getmessage',
            data:{
                  messageuid:todataService.getdata()
            }
      }).then(function(res){
            if(res.data.code!=200){
                  $cordovaToast.show('获取消息失败','short','bottom');
            }else{
                  $scope.messagedetail=res.data.msg;
                  viewScroll.scrollBottom();
            }
      });
      $scope.sendMessage = function(rid){
            socket.emit('sendMessage',{
                  rid:rid,
                  content:$scope.send_content
            });
            $scope.messagedetail.messages[$scope.messagedetail.messages.length]={'isFromMe':false,'message':$scope.send_content};
            $scope.send_content = null;
            viewScroll.scrollBottom();
      };
      socket.on(localService.get('uid')+'err',function(data){
            $cordovaToast.show(data.content,'short','bottom');
      });
      socket.on(localService.get('uid'),function(data){
            if(todataService.getdata()==data.sid){
                  socket.emit('receiveMessage',{
                        sid:data.sid,
                        rid:parseInt(localService.get('uid'))
                  });
                   $scope.messagedetail.messages[$scope.messagedetail.messages.length]={'isFromMe':true,'message':data.content};
                   $scope.$apply();
                   viewScroll.scrollBottom();
            }else{
                  $cordovaToast.show('你有新消息','short','bottom');
            }
      });   
}])
// 关注
.controller('followController',[
      '$scope',
      '$http',function(
            $scope,
            $http){
      $scope.$on('$ionicView.beforeEnter',function(){
            $http({
                  method:'get',
                  url:'http://localhost:8100/data/follow.json'
            }).then(function(res){
                  $scope.follows=res.data;
            });
      });
}])
// 我的书架
.controller('mybookcaseController',[
      '$scope',
      '$http',function(
            $scope,
            $http){
	 $scope.$on('$ionicView.beforeEnter',function(){
            $http({
            method:'get',
            url:'http://localhost:8100/data/book.json'
          }).then(function(res){
            $scope.bookList = res.data;
         });
      });
}])
// 晒书房
.controller('baskbookController',[
      '$scope',function(
            $scope){

}])
// 阅读历史
.controller('readhistoryController',[
      '$scope',function(
            $scope){

}])
//动态
.controller('dynamicController',[
      '$scope',function(
            $scope){

}])
//注册
.controller('registerController',[
      '$scope',
      '$cordovaDialogs',
      '$http',
      '$state',
      'url',function(
            $scope,
            $cordovaDialogs,
            $http,
            $state,
            url){
      $scope.user={};
      $scope.registerSub=function(){
            if($scope.user.upassword!=$scope.user.apassword){
                  $cordovaDialogs.alert('两次输入的密码不一致','提示信息','确认');
            }else{
                $http({
                  url:url+'/user/register',
                  method:'post',
                  headers:{'Content-Type':'application/json;charset=utf-8'},
                  data:{
                        uname:$scope.user.uname,
                        uphone:$scope.user.uphone,
                        upassword:$scope.user.upassword
                  }
             }).then(function(res){
                  if(res.data.code!=200){
                        $cordovaDialogs.alert(res.data.msg,'提示信息','确认');
                  }else{
                        $cordovaDialogs.alert(res.data.msg,'提示信息','确认');
                        $state.go('login');
                  }
             })  
            }
            
      }
}])
//登录
.controller('loginController',['$scope',
      '$state',
      '$cordovaDialogs',
      '$http',
      'localService',
      'url',
      '$rootScope',function(
            $scope,
            $state,
            $cordovaDialogs,
            $http,
            localService,
            url,
            $rootScope){
      $scope.user={};
      $scope.loginSub=function(){
            $http({
                  url:url+'/user/login/',
                  method:'post',
                  headers:{'Content-Type':'application/json;charset=utf-8'},
                  data:{
                        uphone:$scope.user.uphone,
                        upassword:$scope.user.upassword
                  }
            }).then(function(res){
                  if(res.data.code!=200){
                        $cordovaDialogs.alert(res.data.msg,'提示信息','确认');
                  }else{
                        localService.set('uid',res.data.msg[0].uid);
                        localService.set('uname',res.data.msg[0].uname);
                        localService.set('uimage',res.data.msg[0].uimage);
                        localService.set('uphone',res.data.msg[0].uphone);
                        $state.go('tab.find');
                  }
            });
      };
      $scope.retset = function(){
            $state.go('tab.find');
      }
}])
//忘记密码
.controller('forgetController',[
      '$scope',function(
            $scope){
      
}])
//找回密码step2
.controller('forgetstep2Controller',[
      '$scope',function(
            $scope){

}])
//用户详情
.controller('userdetailController',[
      '$scope',function(
            $scope){
      
}])
//书店详情
.controller('bookstoredetailController',[
      '$scope',
      '$ionicPopup',function(
            $scope,
            $ionicPopup){
      $scope.popup = {
            isPopup: false
        };
      $scope.popupOptions = function() {
        $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/popup.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
    };
}])
//活动详情
.controller('activitydetailController',[
      '$scope',function(
            $scope){
      
}])
//书籍详情
.controller('bookdetailController',[
      '$scope',function(
            $scope){
      
}])
//搜索书友
.controller('addfriendController',[
      '$scope',
      '$http',
      'url',
      '$cordovaToast',function(
            $scope,
            $http,
            url,
            $cordovaToast){
      $scope.searchFriend = function(){
            $http({
                  url:url+'/user/searchFriend',
                  method:'post',
                  headers:{'Content-Type':'application/json;charset=utf-8'},
                  data:{
                        condition:$scope.condition
                  }
            }).then(function(res){
                  if(res.data.code!=200){
                        $cordovaToast.show('获取信息失败','short','bottom');
                  }else{
                        if(res.data.msg.length==0){
                              $cordovaToast.show('没有符合条件的','short','bottom');
                        }else{
                              $scope.friends = res.data.msg;
                        }
                  }
            });
      };
      $scope.addfriend = function(uid){
            $http({
                  url:url+'/user/addfriend',
                  method:'post',
                  headers:{'Content-Type':'application/json;charset=utf-8'},
                  data:{
                        uid:uid
                  }
            }).then(function(res){
                  $cordovaToast.show(res.data.msg,'short','bottom');
            });
      };
}])
//添加书籍
.controller('addbookController',[
  '$scope',
  'url',
  '$cordovaToast',
  '$http',function(
    $scope,
    url,
    $cordovaToast,
    $http){
  $scope.book = {};
  $scope.subAddBook = function(){
    $http({
      method:'post',
      url:url+'/user/addBook',
      data:{
        bname:$scope.book.name,
        type:$scope.book.type,
        tags:$scope.book.tags,
        bintroduce:$scope.book.introduce
      }
    }).then(function(res){
        if(res.data.code!=200){
          $cordovaToast.show('添加书籍失败','short','bottom');
        }else{
          $scope.book={};
          $cordovaToast.show(res.data.msg,'short','bottom');
        }
      });
  }
}])
//我的书籍
.controller('myselfbookController',[
  '$scope',
  '$http',
  'url',
  '$cordovaToast',
  '$ionicPopup',
  'todataService',
  '$state',function(
    $scope,
    $http,
    url,
    $cordovaToast,
    $ionicPopup,
    todataService,
    $state){
  function init(){
    $http({
    method:'post',
    url:url+'/book/getMyBook'
  }).then(function(res){
    if(res.data.code!=200){
      $cordovaToast.show('获取信息失败','short','bottom');
    }else{
      $scope.mybook=res.data.msg;
    }
  });
  }
  init(); 
  $scope.popup={
    isPopup:false
  };
  $scope.bookPopup = function(bid,bname){
    $scope.popup.bid=bid;
    $scope.popup.bname=bname;
    $scope.popup.optionsPopup = $ionicPopup.show({
            templateUrl: "templates/bookPopup.html",
            scope: $scope,
        });
        $scope.popup.isPopup = true;
  };
  $scope.modifyInfo = function(){
    $scope.popup.optionsPopup.close();
    todataService.setdatabid($scope.popup.bid);
    $state.go('bookmanage');
  };
  $scope.continueBook=function(){
    $scope.popup.optionsPopup.close();
    todataService.setdatabid($scope.popup.bid);
    $state.go('continuebook');
  }
  $scope.uploadBookImage=function(){
    $scope.popup.optionsPopup.close();
    $scope.popup.optionsPopup=$ionicPopup.show({
      templateUrl:"templates/useruploadimage.html",
      scope:$scope
    });
  };
  $scope.imgSrc;
  $scope.reader = new FileReader();
  $scope.img_upload = function(files){
    $scope.reader.readAsDataURL(files[0]);
    $scope.reader.onload=function(event){
          $scope.$apply(function(){
                $scope.imgSrc=event.target.result;
          });
    };
  };
  $scope.deleteBook = function(){
    $http({
      method:'post',
      url:url+'/book/deleteBook',
      data:{
        bid:$scope.popup.bid
      }
    }).then(function(res){
      if(res.data.code!=200){
        $cordovaToast.show('删除书籍失败','short','bottom');
      }else{
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup=false;
        init();
        $cordovaToast.show('删除书籍成功','short','bottom');
      }
    });
  };
  $scope.addbooknumber = function(bid,bname){
    todataService.setdatabid(bid);
    $state.go('booknumber',{bname:bname});
  };
}])
.controller('continuebookController',[
  '$scope',function(
    $scope){

}])
.controller('bookmanageController',[
  '$scope',
  'url',
  '$http',
  '$cordovaToast',
  'todataService',function(
    $scope,
    url,
    $http,
    $cordovaToast,
    todataService){
    $http({
      method:'post',
      url:url+'/book/getBookInfo',
      data:{
        bid:todataService.getdatabid()
      }
    }).then(function(res){
      if(res.data.code!=200){
        $cordovaToast('获取书籍信息失败','short','bottom');
      }else{
        $scope.book=res.data.msg[0];
      }
    });
    $scope.supplyInfo = function(){
      $http({
        method:'post',
        url:url+'/book/updateBookInfo',
        data:{
          bid:todataService.getdatabid(),
          bname:$scope.book.bname,
          tags:$scope.book.tags,
          type:$scope.book.type,
          bintroduce:$scope.book.bintroduce,
          block:$scope.book.block?1:0
        }
      }).then(function(res){
        if(res.data.code!=200){
          $cordovaToast.show('修改书籍信息失败','short','bottom');
        }else{
          $cordovaToast.show('修改书籍信息成功','short','bottom');
        }
      });
    };
}])
.controller('booknumberController',[
  '$scope',
  'url',
  '$http',
  '$cordovaToast',
  'todataService',
  '$stateParams',
  '$ionicPopup',
  '$state',
  '$ionicHistory',function(
    $scope,
    url,
    $http,
    $cordovaToast,
    todataService,
    $stateParams,
    $ionicPopup,
    $state,
    $ionicHistory){
    $scope.bname=$stateParams.bname;
    $scope.popup={
      isPopup:false
    };
    function init(){
      $http({
        method:'post',
        url:url+'/book/getBookNumber',
        data:{
          bid:todataService.getdatabid()
        }
      }).then(function(res){
        if(res.data.code!=200){
          $cordovaToast('获取信息失败','short','bottom');
        }else{
          $scope.booknumber=res.data.msg;
        }
      });
      }
      init();
      $scope.addBookNumberPopup = function(){
        $http({
          method:'post',
          url:url+'/book/getCount',
          data:{
            bid:todataService.getdatabid()
          }
        }).then(function(res){
          if(res.data.code!=200){
            $cordovaToast('获取信息失败','short','bottom');
          }else{
            $scope.number=res.data.msg[0].number;
          }
        });
        $scope.popup.optionsPopup=$ionicPopup.show({
          templateUrl:"templates/addbooknumberpopup.html",
          scope:$scope
        });
        $scope.popup.isPopup=true;
      };
      $scope.addBookNumber = function(){
        $http({
          method:'post',
          url:url+'/book/addBookNumber',
          data:{
            bid:todataService.getdatabid(),
            name:$scope.popup.numname
          }
        }).then(function(res){
          if(res.data.code!=200){
            $cordovaToast.show('添加章数失败','short','bottom');
          }else{
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup=false;
            $scope.popup.numname=null;
            init();
            $cordovaToast.show('添加章数成功','short','bottom');
          }
        });  
      };
    $scope.editBook = function(id,name){
      todataService.setdata(id);
      $state.go('editbookcontent',{name:name});
    };
    $scope.goback = function(){
      $ionicHistory.goBack();
    }
}])
.controller('editbookcontentController',[
  '$scope',
  'url',
  '$http',
  '$cordovaToast',
  'todataService',
  '$cordovaDialogs',
  '$stateParams',function(
    $scope,
    url,
    $http,
    $cordovaToast,
    todataService,
    $cordovaDialogs,
    $stateParams){
    $scope.numname = $stateParams.name;
    var count=1;
    $scope.isWrite=false;
    $scope.book={
      content:''
    };
    var lastLength = null;
    function init(){
      if(lastLength==null){
       $http({
        method:'post',
        url:url+'/book/getWriteContent',
        data:{
          id:todataService.getdata(),
          count:count
        }
      }).then(function(res){
        if(res.data.code!=200){
          $cordovaToast.show('获取内容失败','short','bottom');
        }else{
          if(res.data.msg[0].data==''||res.data.msg[0].data==null){
            $cordovaToast.show('没有可读取的内容','short','bottom');
          }else{
          if(res.data.msg[0].length!=null){
            lastLength = res.data.msg[0].length;
            $scope.book.content=res.data.msg[0].data+$scope.book.content;
          }else{
            $scope.book.content=res.data.msg[0].data+$scope.book.content;
            count++;  
          }
          
          }
        }
      }); 
      }else{
        $cordovaToast.show('没有可读取的内容','short','bottom');
      }
      
    };
    init();
    $scope.doRefresh = function(){
      init();
      $scope.$broadcast('scroll.refreshComplete');
      // $scope.$apply();
    };
    $scope.startEdit = function(){
      $scope.isWrite=true;
      $cordovaToast.show('当前模式为编辑模式','short','bottom');
    }
    $scope.subContent = function(){
      $scope.isWrite=false;
      $http({
        method:'post',
        url:url+'/book/saveContent',
        data:{
          id:todataService.getdata(),
          content:$scope.book.content,
          count:count,
          length:lastLength
        }
      }).then(function(res){
        if(res.data.code!=200){
          $cordovaDialogs.alert('保存失败，请重新保存','提示信息','确认');
        }else{
          count=1;
          lastLength=null;
          $scope.book.content='';
          init();
          $cordovaToast.show('保存成功,当前为预览模式','short','bottom');
        }
      });
    }
}])
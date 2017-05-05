angular.module('starter', ['ionic','ngCordova','starter.controllers','starter.routers','starter.directives','starter.services'])

.run(['$ionicPlatform','$rootScope','$state','$window',function($ionicPlatform,$rootScope,$state,$window) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $ionicPlatform.registerBackButtonAction(function(e){
    if($state.current.name=="changebooktabs.mychange"|| $state.current.name=="changebooktabs.mychanging"|| $state.current.name=="changebooktabs.changebook"){
      $state.go('tab.book');
    }else if($state.current.name=="tab.find"|| $state.current.name=="tab.book"|| $state.current.name=="tab.chat"){
      ionic.Platform.exitApp();
    }
    else{
      $window.history.back();
    }
  },400);
  $rootScope.url='http://123.56.31.2:4000';
  window.addEventListener('native.keyboardshow', function keyboardShowHandler(e){
      $rootScope.hideta = 'tabs-item-hide';
});
  window.addEventListener('native.keyboardhide', function keyboardHideHandler(e){
      $rootScope.hideta = '';
});
}])
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    ionic.Platform.isFullScreen = false;
    $ionicConfigProvider.platform.ios.tabs.style('standard'); 
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
}])
.constant('url','http://123.56.31.2:4000')

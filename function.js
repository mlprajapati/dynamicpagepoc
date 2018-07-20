var currentPalform ='appleTv';
var config={};
var platform={};
var currentPage={};
var pageData={};
var isLogin = true;

var loadData = function(url,type,data){
    var jqXhr = $.ajax({
        url: url,
        method: type,
        data: data
    });
      return jqXhr;
};
var app = {
    setConfig:function(value){
        config = value;
    },
    getConfig:function(){
        return config;
    },
    setPlatform:function(value){
        platform = value;
    },
    getPlatform:function(){
        return platform;
    },
    setCurrentPage: function(value){
        currentPage = value;
    },
    getCurrentPage: function(){
        return currentPage;
    },
    setPageData: function(value){
        pageData = value;
    },
    getPageData: function(pageid){
        return engine.getPlatformJson(pageid);
    },
    getLogin: function() {
        return isLogin;
    }



}
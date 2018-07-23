var currentPalform ='appleTv';
var config={};
var platform={};
var currentPage={};
var pageData={};
var isLogin = false;
var isLocal=true;
var applicationVerion='0.9422.0';
var identity ='poc1';
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
        if (!localStorage.getItem(identity + "_main.json")) {
            localStorage.setItem(identity + "_main.json", JSON.stringify(value));
        }
        config = value;
    },
    getConfig:function(){
        return config;
    },
    setPlatform:function(value){
        if (!localStorage.getItem(identity + "_" + currentPalform + ".json")) {
            localStorage.setItem(identity + "_" + currentPalform + ".json", JSON.stringify(value));
        }
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
    setPageData: function(pageId,value){
        if (!localStorage.getItem(identity + "_" + pageId + ".json")) {
            localStorage.setItem(identity + "_" + pageId + ".json", JSON.stringify(value));
        }
        pageData = value;
    },
    getPageData: function(pageid){
        return engine.getPlatformJson(pageid);
    },
    getLogin: function() {
        return isLogin;
        return engine.getPageJson(pageid);
    },
    getComponent: function(comp){
        return engine.getComponentJson(comp);
    },
    getCurrentPlatform: function() {
        return getCurrentPlatform;
    }



}
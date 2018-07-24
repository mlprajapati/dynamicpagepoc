var settingsObj = {
    currentPalform: 'fireTv',
    config: {},
    platform: {},
    currentPage: {},
    pageData: {},
    isLogin: false,
    isLocal: true,
    mainDataUrl: {
        local: 'data/main.json',
        prod: 'http://servername.com/main.json'
    },
    applicationVerion: '0.9422.0',
    isVersionChanges: false,
    identity: 'poc1',
    patformSortKey: 'ftv'
}

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
        if (!localStorage.getItem(settingsObj.identity + "_main.json")) {
            localStorage.setItem(settingsObj.identity + "_main.json", JSON.stringify(value));
        }
        settingsObj.config = value;
    },
    getConfig:function(){
        return settingsObj.config;
    },
    setPlatform:function(value){
        if (!localStorage.getItem(settingsObj.identity + "_" + settingsObj.currentPalform + ".json")) {
            localStorage.setItem(settingsObj.identity + "_" + settingsObj.currentPalform + ".json", JSON.stringify(value));
        }
        settingsObj.platform = value;
    },
    getPlatform:function(){
        return settingsObj.platform;
    },
    setCurrentPage: function(value){
        settingsObj.currentPage = value;
    },
    getCurrentPage: function(){
        return settingsObj.currentPage;
    },
    setPageData: function(pageId,value){
        if (!localStorage.getItem(settingsObj.identity + "_" + pageId + ".json")) {
            localStorage.setItem(settingsObj.identity + "_" + pageId + ".json", JSON.stringify(value));
        }
        settingsObj.pageData = value;
    },
    getPageData: function(pageid){
        return engine.getPlatformJson(pageid);
    },
    getLogin: function() {
        return settingsObj.isLogin;
    },
    getComponent: function(comp){
        return engine.getComponentJson(comp);
    },
    getCurrentPlatform: function() {
        return getCurrentPlatform;
    }

}
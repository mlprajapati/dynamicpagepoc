var config={};
var platform={};
var currentPage={};
$.when(engine.getMainJson()).then(function(data){
    config = data;
    $.when(engine.getPlatformJson('appleTv')).then(function(data2){
        platform = data2;
        var page = platform.pages.find(page=> page['Page-Name'] ==='Home Page')
        $.when(engine.getPlatformJson(page['Page-ID'])).then(function(data3){
            currentPage = data3;
        });
    });
});

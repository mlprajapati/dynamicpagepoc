
$(document).ready(function(){
    engine.getMainJson().done(function(data){
        app.setConfig(data);
        factory.setFont();
        engine.getPlatformJson(currentPalform).done(function(data2){
            app.setPlatform(data2);
            var page = app.getPlatform().pages.find(page=> page['Page-Name'] ==='Home Page');
            app.setCurrentPage(page);
            app.getPageData(page['Page-ID']).done(function(data3){
                app.setPageData(page['Page-ID'],data3);
                factory.init();
            });
        });
    });
});


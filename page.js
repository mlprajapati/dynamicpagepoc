
$(document).ready(function(){
    $.when(engine.getMainJson()).then(function(data){
        app.setConfig(data);
        factory.setFont();
        $.when(engine.getPlatformJson(currentPalform)).then(function(data2){
            app.setPlatform(data2);
            var page = platform.pages.find(page=> page['Page-Name'] ==='Home Page')
            app.setCurrentPage(page);
            $.when(app.getPageData(page['Page-ID'])).then(function(data3){
                app.setPageData(data3);
                factory.init();
            });
        });
    });
});


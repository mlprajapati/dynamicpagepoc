
$(document).ready(function(){
    //load main.json file
    engine.getMainJson().done(function(data){
        //save config in local storage
        app.setConfig(data);
        
        //set global font styles
        factory.setFont();

        //load platform json
        engine.getPlatformJson(settingsObj.currentPalform).done(function(data2){
            
            //save platform config in local storage
            app.setPlatform(data2);
            var page = app.getPlatform().pages.find(page=> page['Page-Name'] ==='Home Page');
            app.setCurrentPage(page);

            //load page data 
            app.getPageData(page['Page-ID']).done(function(data3){

                //save page data in local storage
                app.setPageData(page['Page-ID'],data3);
                
                //initialise page template generation process
                factory.init();
            });
        });
    });
});


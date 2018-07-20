
var factory = {};

factory.getPageLayout = function(dataObj, pageId) {

    let pageType = 'appleTv';
    let moduleArr = dataObj['moduleList'];
    let html = '';

    html += factory.getNavigation(mainContent);

    moduleArr.forEach(element => {
        
        switch(element.blockName) {
            case 'carousel01': html += factory.carousalTemplate(element, pageType);
                        break;

            case 'footer01': html += factory.footerTemplate(element, pageType, mainContent);
                        break;
        }
        
    });

    return html;
}

factory.getStyles = function(obj) {
    let style = 'style="';

    if (obj['yAxis']) {
        style += 'left: ' + obj['yAxis'] + 'px; '; 
    }

    if (obj['leftMargin']) {
        style += 'margin-left: ' + obj['leftMargin'] + 'px; '; 
    }

    if (obj['xAxis']) {
        style += 'top: ' + obj['xAxis'] + 'px; '; 
    }

    if (obj['rightMargin']) {
        style += 'margin-right: ' + obj['rightMargin'] + 'px; '; 
    }

    if (obj['height']) {
        style += 'height: ' + obj['height'] + 'px; '; 
    }

    if (obj['bottomMargin']) {
        style += 'margin-bottom: ' + obj['bottomMargin'] + 'px; '; 
    }

    if (obj['width']) {
        style += 'width: ' + obj['width'] + 'px; '; 
    }

    style += 'border: 1px solid #999;"';

    return style;
}


factory.getNavigation = function(content) {
    
    let html = '<div class="topnav" id="myTopnav" style="overflow: hidden; background-color: #333; height: 20px;">';

    content.forEach(element => {

        let classText = '';
        
        if (element.title == 'Home') {
            classText = 'active';
        }

        html += '<a href="' + element.url + '" class="'+ classText +'"><i class="' + element.icon + '"></i>&nbsp;'+ element.title + '</a>';
        
    });

    html += '<a href="javascript:void(0);" class="icon" onclick="toggleNav()"><i class="fa fa-bars"></i></a>'

    html += '</div>';

    return html;
}


factory.carousalTemplate = function(obj, pageType) {
    let html = '<div id="carousal"' + factory.getStyles(obj.layout[pageType]) + '>';
        html += '</div>';

        return html;
}

// factory.footerTemplate = function(obj, pageType, content) {
//     let html = '<div id="footer"' + factory.getStyles(obj.layout[pageType]) + '>';
//         html += '</div>';

//         return html;
// }
factory.headerTemplate = function(){
    let html = '<div id="header" style="dispaly:flex;position:fixed;top:0px;width:100%;height:58px;border: 1px solid red;">';
        html += '</div>';
        return html;
}
factory.contentTemplate = function(){
    let html = '<div id="content" style="dispaly:flex;position:fixed;top:58px;width:100%;height:calc(100vh - 58px);border: 1px solid blue;">';
        html += '</div>';
        return html;
}
factory.footerTemplate = function(){
    let html = '<div id="footer" style="dispaly:flex;position:fixed;bottom:0px;width:100%;height:58px;border: 1px solid green;">';
        html += '</div>';
        return html;
}
factory.setFont = function(){
    $('head').append('<link rel="stylesheet" href="'+app.getConfig().brand.general.fontUrl+'" type="text/css" />');
}
factory.init = function(){
    $('#container').append(factory.headerTemplate());
    $('#container').append(factory.contentTemplate());
    $('#container').append(factory.footerTemplate());

}
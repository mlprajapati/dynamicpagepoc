
var page = {};

page.getPageLayout = function(dataObj, pageId) {

    let pageType = 'appleTv';
    let moduleArr = dataObj['moduleList'];
    let html = '';

    html += page.getNavigation(mainContent);

    moduleArr.forEach(element => {
        
        switch(element.blockName) {
            case 'carousel01': html += page.carousalTemplate(element, pageType);
                        break;

            case 'footer01': html += page.footerTemplate(element, pageType, mainContent);
                        break;
        }
        
    });

    return html;
}

page.getStyles = function(obj) {
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


page.getNavigation = function(content) {
    
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


page.carousalTemplate = function(obj, pageType) {
    let html = '<div id="carousal"' + page.getStyles(obj.layout[pageType]) + '>';
        html += '</div>';

        return html;
}

page.footerTemplate = function(obj, pageType, content) {
    let html = '<div id="footer"' + page.getStyles(obj.layout[pageType]) + '>';
        html += '</div>';

        return html;
}
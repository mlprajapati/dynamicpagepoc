
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


factory.globalCSS = function() {
    let config = app.getConfig();
    let html = '<style>';

    html += 'body{ padding: 0px; margin: 0px; box-sizing: border-box; }';
    html += 'a { color: ' + config.brand.link.textColor + '; text-decoration: none; }';
    html += 'a:hover { color: ' + config.brand['link--hover'].textColor + '; text-decoration: none; }';
    html += '.topnav{background-color:#333;overflow:hidden}.topnav button{display:block;padding:10px;outline:0;border:none;font-size:17px;float:left}.dropdown a.link{display:none;padding:10px}.topnav.responsive{position:relative}.dropdown.active{position:absolute;z-index:99;width:25%}.dropdown.active a{float:none;display:block;text-align:left}.topnav.responsive .icon{position:absolute;left:0;top:0}#site-name{margin:0;float:left;padding:9px}#header .user{float:right;margin:0}#header .user a{float:left;margin-left:10px;padding:9px}';

    html += '#footer { color: ' + config.brand.footer.textColor + '; background: ' + config.brand.footer.backgroundColor + ';}';

    html += '</style>';
    return html;
}



factory.headerTemplate = function(){

    let platform = app.getPlatform();
    let config = app.getConfig();
    let isLogin = app.getLogin();

    //create html layout of navigation
    let html = '<div id="header">';

    html += '<div class="topnav">'
    html += '<button class="icon" onclick="toggleNav()"><i class="fa fa-bars"></i></button>';
    html += '<h3 id="site-name"><a href="/">' + config.site + '</a></h3>';
    
    
    //user links
    html += '<div class="user">';
    platform.navigation.user.forEach(element => {
        if (element.accessLevels.loggedIn == isLogin) {
            html += '<a href="' + element.url + '">'+ element.title + '</a>';
        }
    }); 
    html += '</ul>';
    html += '</div>';
    html += '</div>';

    html += '<div class="dropdown" id="nav-dropdown">'
    platform.navigation.primary.forEach(element => {
        let classText = '';
        if (element.title == 'Home') {
            classText = 'active';
        }

        html += '<a href="' + element.url + '" class="link '+ classText +'">'+ element.title + '</a>';
    });        

    //add shortAppname link and search link in menu
    html += '<a href="/" class="link">'+ platform.shortAppName + '</a>';
    html += '<a href="' + platform.navigation.tabBar.find(page => page['title'] == 'Search').url + '" class="link">Search</a>';


    html += '</div>';

    //apply css from main.js
    html += '<style>'; 
    
    html += '.topnav button { color: ' + config.brand.navigation['dropdown'].textColor + '; background: ' + config.brand.navigation['dropdown'].backgroundColor + '}';

    html += '.dropdown a { color: ' + config.brand.navigation.link.textColor + '; font-weight: ' + config.brand.navigation.link.style[0] + '; background: ' + config.brand.navigation.link.backgroundColor + '}'; 
    
    html += '.dropdown a.active { font-weight: ' + config.brand.navigation['link--active'].style[0] + '; background: ' + config.brand.navigation['link--active'].backgroundColor + '}';

    html += '.dropdown.active { color: ' + config.brand.navigation['dropdown--active'].textColor + '; background: ' + config.brand.navigation['dropdown--active'].backgroundColor + '}';

    html += '.dropdown a:hover { color: ' + config.brand.navigation['link--hover'].textColor + '; font-weight: ' + config.brand.navigation['link--hover'].style[0] + '; background: ' + config.brand.navigation['link--hover'].backgroundColor + '}';

    html += '</style>';

    return html;
}
factory.contentTemplate = function(){
    let html = '<div id="content" style="dispaly:block;position:relative;width:100%;height:calc(100vh - 75px);">';
        html += '</div>';
        return html;
}
factory.footerTemplate = function(){
    let html = '<div id="footer" style="dispaly:block;position:relative;bottom:0px;width:100%;height:35px;">';
        html += '</div>';
        return html;
}
factory.setFont = function(){
    $('head').append('<link rel="stylesheet" href="'+app.getConfig().brand.general.fontUrl+'" type="text/css" />');
}
factory.init = function(){
    $('body').append(factory.globalCSS());
    $('#container').append(factory.headerTemplate());
    $('#container').append(factory.contentTemplate());
    $('#container').append(factory.footerTemplate());

}


function toggleNav() {
    var x = document.getElementById("nav-dropdown");
    if (x.className === "dropdown") {
        x.className += " active responsive";
    } else {
        x.className = "dropdown";
    }
}
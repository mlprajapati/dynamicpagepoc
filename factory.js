var factory = {};

/**
 * function to get template of all components of page
 * @param {*component id} divId 
 */
factory.getPageLayout = function(divId) {

    let currentPage = app.getCurrentPage();
    let html = '';


    app.getPageData(currentPage['Page-ID']).done(resp => {
        let pageType = currentPalform;
        let moduleArr = resp['moduleList'];
        

        moduleArr.forEach(element => {
            
            switch(element.blockName) {
                case 'carousel01': let carouselHtml = factory.carousalTemplate(element, pageType);
                            $('#'+divId).append(carouselHtml);
                            app.getComponent(element.blockName).done(resp => {
                                $('#'+element.id).append(resp);                    
                            }).fail((xhr) => {
                                $('#'+element.id).append('<h2>'+ element.blockName +' not found!</h2>');
                            });
                            break;

                case 'continueWatching01': let continousHtml = factory.continousTemplate(element, pageType);
                            $('#'+divId).append(continousHtml);
                            app.getComponent(element.blockName).done(resp => {
                                    $('#'+element.id).append(resp);    
                            }).fail((xhr) => {
                                $('#'+element.id).append('<h2>'+ element.blockName +' not found!</h2>');
                            });
                            break;

                case 'tray01': let trayHtml = factory.trayTemplate(element, pageType);
                            $('#'+divId).append(trayHtml);
                            app.getComponent(element.blockName).done(resp => {
                                    $('#'+element.id).append(resp);    
                            }).fail((xhr) => {
                                $('#'+element.id).append('<h2>'+ element.blockName +' not found!</h2>');
                            });
                            break;

                
            }
            
        });

        
    });
    
}

/**
 * function to apply css style properties as mention in json obj
 * @param {*json obj} obj 
 * @param {*} customStyle 
 */
factory.getStyles = function(obj, customStyle) {
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

    if (customStyle != null) {
        style += 'float: left; ';
    }

    style += 'border: 1px solid #999;"';

    return style;
}

/**
 * carousal component template
 * @param {*} obj 
 * @param {*} pageType 
 */
factory.carousalTemplate = function(obj, pageType) {
    let html = '<div id="'+ obj.id +'"' + factory.getStyles(obj.layout[pageType.toLowerCase()], null) + '>';

    html += '</div>';
    return html;
}

/**
 * continous component template
 * @param {*} obj 
 * @param {*} pageType 
 */
factory.continousTemplate = function(obj, pageType) {
    let html = '<div id="'+ obj.id +'"' + factory.getStyles(obj.layout[pageType.toLowerCase()], null) + '>';

    html += '</div>';
    return html;
}

/**
 * tray component template
 * @param {*} obj 
 * @param {*} pageType 
 */
factory.trayTemplate = function(obj, pageType) {
    let customStyle = null;
    if (obj.settings.loop) {
        customStyle = 'float: left;';
    }

    let html = '<div id="'+ obj.id +'" class="tray col-sm-' + obj.settings.columns.tablet + ' cold-md-' + obj.settings.columns.desktop  + ' cold-xs-' + obj.settings.columns.mobile  +'"' + factory.getStyles(obj.layout[pageType.toLowerCase()], customStyle) + '>';

    html += '</div>';
    return html;
}

/**
 * Global css properties
 */
factory.globalCSS = function() {
    let config = app.getConfig();
    let html = '<style>';

    html += 'body{ padding: 0px; margin: 0px; box-sizing: border-box; }';
    html += '.pull-right { float: right; }';
    html += 'a { color: ' + config.brand.link.textColor + '; text-decoration: none; }';
    html += 'a:hover { color: ' + config.brand['link--hover'].textColor + '; text-decoration: none; }';
    html += '.topnav{background-color:#333;overflow:hidden}.topnav button{display:block;padding:10px;outline:0;border:none;font-size:17px;float:left}.dropdown{z-index: 99;}.dropdown a.link{display:none;padding:10px}.topnav.responsive{position:relative}.dropdown.active{position:absolute;z-index:99;width:25%}.dropdown.active a{float:none;display:block;text-align:left}.topnav.responsive .icon{position:absolute;left:0;top:0}#site-name{margin:0;float:left;padding:9px}#header .user{float:right;margin:0}#header .user a{float:left;margin-left:10px;padding:9px}.footer-links{margin:7px}.footer-links a{ margin-right: 25px;}.tab{overflow:hidden;text-align:center}.tab a{background-color:inherit;border:none;outline:0;cursor:pointer;padding:14px 16px;transition:.3s;font-size:17px;display:inline-block}.tab a.active{border-top:2px solid red}.tabcontent{display:none;padding:6px 12px;border-top:none}.tabcontent:first-child{display:block}.tray{margin-right:5%}#Home div{margin:2%}@media only screen and (min-width :320px) and (max-width :480px){.col-xs-3{width:25%}.col-xs-4{width:33.33%}}@media only screen and (min-width :768px) and (max-width :1024px){.col-sm-3{width:25%}.col-sm-4{width:33.33%}}@media only screen and (min-width :1224px){.col-md-3{width:25%}.col-md-4{width:33.33%}.col-md-5{width:41.66%}}';

    html += '#content { color: ' + config.brand.general.textColor + '; background: ' + config.brand.general.backgroundColor + ';}';
    html += '#footer { color: ' + config.brand.footer.textColor + '; background: ' + config.brand.footer.backgroundColor + ';}';

    html += '</style>';
    return html;
}

/**
 * Header Navigation template
 */
factory.headerTemplate = function(){

    let platform = app.getPlatform();
    let config = app.getConfig();
    let isLogin = app.getLogin();

    //create html layout of navigation
    let html = '<div id="header" style="position: fixed; width: 100%;z-index:9999;">';

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

    html += '<div class="dropdown" id="nav-dropdown">';

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

/**
 * Page main container template
 */
factory.contentTemplate = function(){

    let platform = app.getPlatform();

    let html = '<div id="content" style="display:block;position:relative; top: 40px; width:100%;height:calc(100vh - 58px);txt-align:center;">';

    html += '<div class="tab" style="overflow: hidden; text-align: center;position: fixed;margin: auto; left: 0px; right: 0px;">';

    platform.navigation.tabBar.forEach((element, index) => {
        let classTxt = '';
        if (index == 0) {
            classTxt = ' active';
        }
        html += '<a id="" href="javascript://" class="tablinks'+ classTxt +'" onclick="openTab(event, \'' + element.title +'\')">' + element.title +'</a>';
    });

    html += '</div>';
    html += '<div id="tab-container" style="position: fixed;top: 90px;width: 100%;height: calc(100vh - 123px); overflow-y: auto;">';

    

    platform.navigation.tabBar.forEach(element => {
        html += '<div id="'+ element.title +'" class="tabcontent"></div>';
    });

    html += '</div>'
    

    html += '</div>';
    return html;
}

/**
 * Footer template
 */
factory.footerTemplate = function(){
    let platform = app.getPlatform();
    let html = '<div id="footer" style="display:block;position:fixed;bottom:0px;width:100%;height:35px;">';
    
    html += '<div class="pull-right footer-links">';

    platform.navigation.footer.forEach(element => {
        html += '<a href="' + element.url + '" class="link">'+ element.title + '</a>';
    });  

    html += '</div>';
    html += '</div>';
    return html;
}

/**
 * Set Global Font
 */
factory.setFont = function(){
    $('head').append('<link rel="stylesheet" href="'+app.getConfig().brand.general.fontUrl+'" type="text/css" />');
}

/**
 * Init function to start processing
 */
factory.init = function(){
    $('body').append(factory.globalCSS());
    engine.downloadsPages();
    engine.downloadsBlocks();
    $('#container').append(factory.headerTemplate());
    $('#container').append(factory.contentTemplate());
    let firstTab = app.getPlatform().navigation.tabBar[0].title;
    factory.getPageLayout(firstTab);
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


function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
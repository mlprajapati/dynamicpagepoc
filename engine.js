var engine = {

    getMainJson: function () {
        let url = '';
        if (settingsObj.isLocal) {
            url = settingsObj.mainDataUrl.local;
        } else {
            url = settingsObj.mainDataUrl.prod;
        }
        if (localStorage.getItem(settingsObj.identity + "_main.json")) {
            let config = JSON.parse(localStorage.getItem(settingsObj.identity + "_main.json"));
            if (config['version'] == settingsObj.applicationVerion && localStorage.getItem(settingsObj.identity + "currentPlatform") == settingsObj.currentPalform) {
                return $.when(config);
            } else{
                settingsObj.isVersionChanges =true;
            }
        } 
        engine.removeAllDataFromCache(settingsObj.identity + '_', '');
        localStorage.setItem(settingsObj.identity + "currentPlatform",settingsObj.currentPalform);
        return loadData(url, 'GET', {});
           
    },
    getPlatformJson: function (platform) {
  
        if (localStorage.getItem(settingsObj.identity + "_" + platform + ".json")) {
            return $.when(JSON.parse(localStorage.getItem(settingsObj.identity + "_" + platform + ".json")));
        } else {
            let url = '';
            if (settingsObj.isLocal) {
                url = 'data/' + platform + '.json'
            } else {
                url = app.getConfig()[platform];
            }
           return loadData(url, 'GET', {});
               
        }

    },
    getPageJson: function (pageId) {
        if (localStorage.getItem(settingsObj.identity + "_" + settingsObj.pageId + ".json")) {
            return $.when(JSON.parse(localStorage.getItem(settingsObj.identity + "_" + pageId + ".json")));
        } else {
            let url = '';
            if (settingsObj.isLocal) {
                url = 'data/' + pageId + '.json'
            } else {
                url = app.getPlatform().pages.find(page => page['Page-ID'] === pageId)['Page-ID'];
            }
            return loadData('data/' + pageId + '.json', 'GET', {})
               
        }

    },
    // This methos will call all blocks request to download json data and store in cache.
    downloadsBlocks: function () {
        var blocks = app.getPlatform().blocks;
        var blocksBaseUrl = app.getPlatform().blocksBaseUrl;
        var async_request = [];
        var responses = [];
        for (let i in blocks) {
            // you can push  any aysnc method handler
            var url = blocksBaseUrl + '/' + blocks[i]['name'];
            if (!localStorage.getItem(settingsObj.identity + "_" + blocks[i]['name'] + ".json")) {
                async_request.push($.ajax({
                    url: url, // your url
                    method: 'GET', // method GET or POST
                    data: {},
                    success: function (data) {
                        console.log('success of ajax response')
                        responses.push(data);
                        localStorage.setItem(settingsObj.identity + "_" + blocks[i]['name'] + ".json",JSON.stringify(data));
                    }
                }));
            }
        }
        $.when.apply(null, async_request).done(function () {
            // all done
            console.log('blocks all request completed')
            console.log(responses);
        });
    },
    // This methos will call all pages request to download json data and store in cache.
    downloadsPages: function () {
        var pages = app.getPlatform().pages;
        var async_request = [];
        var responses = [];
        for (let i in pages) {
            // you can push  any aysnc method handler
            var url = pages[i]['Page-UI'];
            if (!localStorage.getItem(settingsObj.identity + "_" + pages[i]['Page-ID'] + ".json")) {
                async_request.push($.ajax({
                    url: url, // your url
                    method: 'GET', // method GET or POST
                    data: {},
                    success: function (data) {
                        console.log('success of ajax response')
                        responses.push(data);
                        localStorage.setItem(settingsObj.identity + "_" + pages[i]['Page-ID'] + ".json",JSON.stringify(data))
                    }
                }));
            }
        }
        $.when.apply(null, async_request).done(function () {
            // all done
            console.log('pages all request completed')
            console.log(responses);
        });
    },
    getComponentJson(comp){
        if (localStorage.getItem(settingsObj.identity + "_" + comp + ".json")) {
            return $.when(JSON.parse(localStorage.getItem(settingsObj.identity + "_" + comp + ".json")));
        } else {
            var blocksBaseUrl = app.getPlatform().blocksBaseUrl;
            let url = '';
            if (settingsObj.isLocal) {
                url = 'data/' + comp + '.json'
            } else {
                url = blocksBaseUrl+'/'+ comp;
            }
            return loadData(url + '.json', 'GET', {})
               
        }
    },
    // This methos will remove the all data from cache based on the prefix.
    removeAllDataFromCache: function (pref, newName) {
        for (var key in localStorage) {
            if (key.indexOf(pref) == 0) {
                if (key != newName) {
                    localStorage.removeItem(key);
                }
            }
        }
    }
}
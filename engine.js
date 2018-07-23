var engine = {

    getMainJson: function () {
        let url = '';
        if (isLocal) {
            url = 'data/main.json'
        } else {
            url = 'http://servername.com/main.json';
        }
        if (localStorage.getItem(identity + "_main.json")) {
            let config = JSON.parse(localStorage.getItem(identity + "_main.json"));
            if (config['version'] == applicationVerion) {
                return $.when(config);
            } else{
                isVersionChanges =true;
            }
        } 
        engine.removeAllDataFromCache(identity + '_', '');
        return loadData(url, 'GET', {});
           
    },
    getPlatformJson: function (platform) {
  
        if (localStorage.getItem(identity + "_" + platform + ".json")) {
            return $.when(JSON.parse(localStorage.getItem(identity + "_" + platform + ".json")));
        } else {
            let url = '';
            if (isLocal) {
                url = 'data/' + platform + '.json'
            } else {
                url = app.getConfig()[platform];
            }
           return loadData(url, 'GET', {});
               
        }

    },
    getPageJson: function (pageId) {
        if (localStorage.getItem(identity + "_" + pageId + ".json")) {
            return $.when(JSON.parse(localStorage.getItem(identity + "_" + pageId + ".json")));
        } else {
            let url = '';
            if (isLocal) {
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
            if (!localStorage.getItem(identity + "_" + blocks[i]['name'] + ".json")) {
                async_request.push($.ajax({
                    url: url, // your url
                    method: 'GET', // method GET or POST
                    data: {},
                    success: function (data) {
                        console.log('success of ajax response')
                        responses.push(data);
                        localStorage.setItem(identity + "_" + blocks[i]['name'] + ".json",JSON.stringify(data));
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
            if (!localStorage.getItem(identity + "_" + pages[i]['Page-ID'] + ".json")) {
                async_request.push($.ajax({
                    url: url, // your url
                    method: 'GET', // method GET or POST
                    data: {},
                    success: function (data) {
                        console.log('success of ajax response')
                        responses.push(data);
                        localStorage.setItem(identity + "_" + pages[i]['Page-ID'] + ".json",JSON.stringify(data))
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
        if (localStorage.getItem(identity + "_" + comp + ".json")) {
            return $.when(JSON.parse(localStorage.getItem(identity + "_" + comp + ".json")));
        } else {
            var blocksBaseUrl = app.getPlatform().blocksBaseUrl;
            let url = '';
            if (isLocal) {
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
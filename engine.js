var engine = {

    getMainJson: function() {
         if(localStorage.getItem("main.json")){
             return JSON.parse(localStorage.getItem("main.json"));
         } else {
            loadData('data/main.json','GET',{})
            .done(function(data){
                localStorage.setItem("main.json",JSON.stringify(data));
                return data;
            })
            .fail(function(xhr){
                alert("main.Json failed to download");
                return {};
            })
         }

    },
    getPlatformJson: function(platform) {
        if(localStorage.getItem(platform+".json")){
            return JSON.parse(localStorage.getItem(platform+".json"));
        } else {
           loadData('data/'+platform+'.json','GET',{})
           .done(function(data){
               localStorage.setItem(platform+".json",JSON.stringify(data));
               return data;
           })
           .fail(function(xhr){
               alert("platform.Json failed to download");
               return {};
           })
        }

    },
    getPageJson: function(pageId) {
        if(localStorage.getItem(pageId+".json")){
            return JSON.parse(localStorage.getItem(pageId+".json"));
        } else {
        loadData('data/'+pageId+'.json','GET',{})
        .done(function(data){
            localStorage.setItem(pageId+".json",JSON.stringify(data));
            return data;
        })
        .fail(function(xhr){
            alert(pageId+".Json failed to download");
            return {};
        })
        }

    }
}
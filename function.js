var loadData = function(url,type,data){
    var jqXhr = $.ajax({
        url: url,
        method: type,
        data: data
    });
      return jqXhr;
};
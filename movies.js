var listTemplate = document.getElementById("list_template").innerHTML,
    detailsTemplate = document.getElementById("details_template").innerHTML,
    searchText = document.getElementById("search_text"),
    listDiv = document.getElementById("list"),
    detailsDiv = document.getElementById("details"),
    searchBtn = document.getElementById("search_button");


searchBtn.addEventListener("click", function () {
    var title = searchText.value;
    $.get("http://www.omdbapi.com/?apikey=debe556a&s=" + title, null, null, "json")
        .done(onSearchResult)
        .fail(onSearchFail);

});

function onSearchResult(data) {
    var html = Mustache.render(listTemplate, data);
    listDiv.innerHTML = html;

    var items = listDiv.getElementsByTagName("a");
    for(var i = 0; i < items.length; i++){
        var item = items[i];
        item.addEventListener("click", function(e){
            var id = e.target.id;
            $.get("http://www.omdbapi.com/?apikey=debe556a&plot=full&i=" + id, null, null, "json")
             .done(onDetailsResult)
             .fail(onSearchFail);
            
        });
    }
}

function onSearchFail(){
    alert("There was a problem contacting the server. Please try again.");
}


function onDetailsResult(data){
    var html = Mustache.render(detailsTemplate, data);
    detailsDiv.innerHTML = html;
}


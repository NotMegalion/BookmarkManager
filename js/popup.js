$(document).ready(function()
{
  console.log("loaded.");
  //chrome.bookmarks.getTree(function(e){window.tree = e; $("body").html()})
  $("#add-bookmark").click(function()
  {
    var value = $("#bookmark-input").val(),
        substring = "https://",
        subsubstring = "http://";
        if(value.indexOf(substring) > -1 && value.indexOf(subsubstring > -1)){
    //chrome.tabs.create({url: value});
    chrome.bookmarks.create({title: value, url: value});
  }
  else{
    //chrome.tabs.create({url: substring+value});
    chrome.bookmarks.create({title: value, url: substring+value});
  }

    //chrome.bookmarks.create({'title': 'Extension bookmarks', 'url': '+value+'});
    //$("#bookmark-list").append("<li><button id=>"+value+"</button></li>");
  });
  function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("listing bookmarks: " );
  chrome.bookmarks.getTree( process_bookmark );
});
});

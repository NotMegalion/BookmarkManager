$(document).ready(function()
{
  console.log("loaded.");
  printBookmarks('0');


  //chrome.bookmarks.getTree(function(e){window.tree = e; $("body").html()})
  $("#add-bookmark").click(function()
  {
    var value = $("#bookmark-input").val(),
        substring = "https://",
        subsubstring = "http://";
        if(value.indexOf(substring) > -1 || value.indexOf(subsubstring) > -1){
    chrome.bookmarks.create({title: value, url: value});
    $("#bookmark-list").empty();
    printBookmarks('0');
document.geti("bookmark-input").reset();
  }
  else{
    chrome.bookmarks.create({title: value, url: substring+value});
    $("#bookmark-list").empty();
    printBookmarks('0');
document.geti("bookmark-input").reset();
  }

  });
  $("#list-bookmark").click(function(){
    $("#bookmark-list").empty();
    printBookmarks('0');
  });
  function printBookmarks(id) {
   chrome.bookmarks.getChildren(id, function(children) {
      children.forEach(function(bookmark) {
        console.log(bookmark.title);
        var id = $("#bookmark-list").children().length;
        var bookmarkLocal = bookmark;
        $("#bookmark-list").append("<li id='"+id+"'>"+bookmark.title+"<p id='x"+id+"' style='color:red; display: inline-block; margin:0px; margin-left:5px;'>X</p></li>");
        $("#"+id).click(function(e){
          if (e.target !== this)
            return;
          chrome.tabs.create({url: bookmarkLocal.url})
        });
        $("#x"+id).click(function(){
          chrome.bookmarks.remove(bookmarkLocal.id);
          $("#bookmark-list").empty();
          printBookmarks('0');
        });
        printBookmarks(bookmark.id);
      });
   });
  }

});

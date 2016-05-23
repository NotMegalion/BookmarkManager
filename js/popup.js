$(document).ready(function()
{
  //window.bookmarks = [];
  console.log("loaded.");
  printBookmarks('0');
  $("#add-bookmark").click(function()
  /*document.getElementById("bookmark-input").onkeyup = function(){
    searchBookmarks('0', $("#bookmark-input").val());
  }*/
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
  $("#search-bookmark").click(function(){
    var searchVal = $("#bookmark-input").val();
    $("#bookmark-list").empty();
    searchBookmarks('0', searchVal);
  });

  function printBookmarks(id) {
   chrome.bookmarks.getChildren(id, function(children) {
      children.forEach(function(bookmark) {
        console.log(bookmark.title);
        //window.bookmarks.push(bookmark.title);
        //console.log(window.bookmarks);
        var id = $("#bookmark-list").children().length;
        var bookmarkLocal = bookmark;
        $("#bookmark-list").append("<li id='"+id+"'>"+bookmark.title+"<button id='x"+id+"' style='color:red; position: absolute; float: right; font-size:10px; display: inline-block; margin:0px; margin-left:5px;'>x</button></li>");
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

  function searchBookmarks(id, str){
    chrome.bookmarks.getChildren(id, function(children){
      children.forEach(function(bookmark){
        if(bookmark.title.indexOf(str) >= 0){
          console.log(bookmark.title);
          console.log($("#bookmark-list"));
         $("#bookmark-list").append("<li id='"+id+"'>"+bookmark.title+"<button id='x"+id+"' style='color:red; position: absolute; float: right; font-size:10px; display: inline-block; margin:0px; margin-left:5px;'>x</button></li>");
        }
        searchBookmarks(bookmark.id, str);
      });
    });

  }

});

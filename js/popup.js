$(document).ready(function()
{
  chrome.bookmarks.getTree(function(e){window.tree = e; $("body").html()})
  $("#options").click(function(){
    console.log("clicky");
    window.open("https://google.com");
  });
});

document.getElementById("myForm").addEventListener("submit", saveBookmark);

//save bookmark
function saveBookmark(e) {
  //get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };
  //console.log(bookmark);

  /*
  //Local Storage Test
  localStorage.setItem("test", "Hello User!!");
  console.log(localStorage.getItem("test"));
  localStorage.removeItem("test");
  console.log(localStorage.getItem("test"));
*/

  //Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    //Init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //add bookmark to array
    bookmarks.push(bookmark);
    //re-set back to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  //clear form
  document.getElementById("myForm").reset();

  //re-fetch bookmarks
  fetchBookmarks();

  e.preventDefault();
}

//delete bookmarks
function deleteBookmark(url) {
  //get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  //re-set back to localstorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //re-fetch bookmarks
  fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
  //get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //get output id
  var bookmarksResults = document.getElementById("bookmarksResults");
  //build output
  bookmarksResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      '<a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      "<a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>" +
      "</div>";
  }
}

//validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use valid url");
    return false;
  }

  return true;
}

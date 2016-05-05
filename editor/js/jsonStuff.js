var allPeople = [];
var whichPerson = null;

// Request what's available currently on page load
// window.fetch('http://localhost:1339/editors')
window.fetch('http://encore-api.herokuapp.com/editors')
.then(function(res) { return res.json(); })
.then(jsonLoaded);

var socket = io.connect('http://localhost:1339');
// var socket = io.connect('http://encore-api.herokuapp.com');

// Get updated results as they are created
socket.on('EDITORS', function (data) {
  jsonLoaded(data);
});

function jsonLoaded(obj) {
  allPeople = obj;

  // if there are no results, print a message and return
  if (obj.length == 0){
    var status = "No results found";
    document.querySelector("#container").innerHTML = "<p>" + status + "</p>";
    return; // Bail out
  }

  // If there is an array of results, loop through them
  loadUsername();
}

function loadUsername() {
  var bigString = ''

  // loop through events here
  for (var i = 0; i < allPeople.length; i++){
    var person = allPeople[i];

    //create flex-items
    if (person.username != null){
      bigString += "<div class='flex-item'>";
        bigString += "<button type='button' class='user-button' id='User" + i + "' data-index=" + i + ">";
          bigString += "<div class='image'>";
            bigString += "<h3>" + person.username + "</h3>";
            bigString += "<img src='images/profiles/" + person.artistKey + ".png' alt=" + person.username + " />";
          bigString += "</div>";
        bigString += "</button>"
      bigString += "</div>";
    }
  }

  document.querySelector(".container").innerHTML = bigString;

  var btns = document.querySelectorAll('.user-button')

  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function(e) {
      whichPerson = e.currentTarget.dataset.index;
      getThreePicture(e.currentTarget.dataset.index);
    }
  }
}

function getThreePicture(index) {
  var bigString = ''
  for (var i = 0; i < allPeople[index].photos.length; i++){
    var picture = allPeople[index].photos[i];

    //create flex-items
    if (picture != null){
      bigString += "<div id='flex-item" + i + "'>";
        bigString += "<label>"
          bigString += "<input class='great-show--label-input' type='radio' name='picture' value ='"+ i + "' />";
          bigString += "<img class='great-show--img' src='" + picture + "' alt=" + allPeople[index].username + " />";
        bigString += "<label>"
      bigString += "</div>";
    }
  }
  document.querySelector("#containerGreatShow").innerHTML = bigString;

  document.querySelector("#nextUp").style.display = "none";
  document.querySelector("#greatShow").style.display = "block";
}

function addPictureToEditor() {
  if(document.querySelector('input[name="picture"]:checked').value != null){
    var whichPicture =
      document.querySelector('input[name="picture"]:checked').value;

    setPicture(allPeople[whichPerson].photos[whichPicture]);
    document.querySelector("#greatShow").style.display = "none";
    document.querySelector("#editor").style.display = "block";
  }
  else {
    alert("please pick the picture");
  }
}

function backToNextUp(){
  document.querySelector("#greatShow").style.display = "none";
  document.querySelector("#nextUp").style.display = "block";
}

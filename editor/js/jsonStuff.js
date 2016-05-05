
// Request what's available currently on page load
window.fetch('http://localhost:1339/editors')
// window.fetch('http://encore-api.herokuapp.com/editors')
.then(function(res) { return res.json(); })
.then(jsonLoaded);

var socket = io.connect('http://localhost:1339');
// var socket = io.connect('http://encore-api.herokuapp.com');

// Get updated results as they are created
socket.on('EDITORS', function (data) {
  jsonLoaded(data);
});

function jsonLoaded(obj) {
  // if there are no results, print a message and return
  if (obj.length == 0){
    var status = "No results found";
    document.querySelector("#container").innerHTML = "<p>" + status + "</p>";
    return; // Bail out
  }

  // If there is an array of results, loop through them
  loadUsername(obj);
}

function loadUsername(allPeople){
  var bigString = ''

  // loop through events here
  for (var i = 0; i < allPeople.length; i++){
    var person = allPeople[i];

    //create flex-items
    if (person.username != null){
      bigString += "<div class='flex-item'>";
        bigString += "<button type='button' id='" + i + "'>";
          bigString += "<div class='image'>";
            bigString += "<h3>" + person.username + "</h3>";
            bigString += "<img src='images/profiles/" + person.artistKey + ".png' alt=" + person.username + " />";
          bigString += "</div>";
        bigString += "</button>"
      bigString += "</div>";
    }
  }

  document.querySelector(".container").innerHTML = bigString;
  console.log("call load");
}

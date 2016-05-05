var allPeople = [];

function getData(){
  $.ajax({
    dataType: "json",
    url: "###########",
    data: null,
    success: jsonLoaded
  });
}

function jsonLoaded(obj) {
  // if there's an error, print a message and return
  if (obj.error){
    var status = obj.status;
    var description = obj.description;
    document.querySelector("#container").innerHTML = "<h3><b>Error!</b></h3>" + "<p><i>" + status + "</i></p>" + "<p><i>" + description + "</i></p>";
    return; // Bail out
  }

  // if there are no results, print a message and return
  if(obj.people.length == 0){
    var status = "No results found";
    document.querySelector("#container").innerHTML = "<p>" + status + "</p>";
    return; // Bail out
  }

  // create an array with the single object
  // If there is an array of results, loop through them
  allPeople = obj.people;
}

function loadUsername(){
  var bigString = ''

  // loop through events here
  for (var i = 0; i < allPeople.length; i++){
    var person = allPeople[i];

    //create flex-items
    if (person.username !=null){
      bigString += "<div class='flex-item'>";
        bigString += "<button type='button' id='" + i + "'>";
          bigString += "<div class='image'>";
            bigString += "<h3>" + person.username + "</h3>";
            bigString += "<img src=" + person.photoSrc + " alt=" + person.username + " />";
          bigString += "</div>";
        bigString += "</button>"
      bigString += "</div>";
    }
  }

  document.querySelector(".container").innerHTML = bigString;
}

jsonLoaded({
description: '',
status: 200,
error: null,
people: [
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl1', photoSrc: 'stuff' },
],
})

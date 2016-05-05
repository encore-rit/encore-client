var allPeople = [];
var whichPerson;
var whichPicture;

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
  loadUsername();
}

function loadUsername(){
  var bigString = ''

  // loop through events here
  for (var i = 0; i < allPeople.length; i++){
    var person = allPeople[i];

    //create flex-items
    if (person.username !=null){
      bigString += "<div class='flex-item'>";
        bigString += "<button type='button' id='User" + i + "'>";
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

function getThreePicture(e){
  console.log(allPeople[e]);
  whichPerson = e;
  var bigString = ''
  for (var i = 0; i < allPeople[whichPerson].photos.length; i++){
    var picture = allPeople[whichPerson].photos[i];
    //create flex-items
    if (picture !=null){
      bigString += "<div id='" + flex-item +  "'>";
        bigString += "<lable>"
          bigString += "<input type='radio' name='picture' value ='"+ i + "' />";
          bigString += "<img src='" + picture + "' alt=" + allPicture[whichPerson].username + " />";
        bigString += "<lable>"
      bigString += "</div>";
    }
  }
  document.querySelector("#containerGreatShow").innerHTML = bigString;

  document.querySelector("#nextUp").style.display = "none";
  document.querySelector("#greatShow").style.display = "block";
}

function addPictureToEditor(){
  if(document.querySelector('input[name="picture"]:checked').value !=null){
    whichPicture = document.querySelector('input[name="picture"]:checked').value;
    console.log(whichPicture);
    addPicture(allPeople[e].photos[whichPicture]);
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

jsonLoaded({
description: '',
status: 200,
error: null,
people: [
{ username: 'testl1', photoSrc: 'stuff' },
{ username: 'testl2', photoSrc: 'stuff' },
{ username: 'testl3', photoSrc: 'stuff' },
{ username: 'testl4', photoSrc: 'stuff' },
{ username: 'testl5', photoSrc: 'stuff' },
{ username: 'testl6', photoSrc: 'stuff' },
{ username: 'testl7', photoSrc: 'stuff' },
{ username: 'testl8', photoSrc: 'stuff' },
{ username: 'testl9', photoSrc: 'stuff' },
],
})

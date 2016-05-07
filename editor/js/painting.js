var API = 'http://encore-api.herokuapp.com'

// EVENT CALLBACK FUNCTIONS
function doLineWidthChange(e){
  lineWidth = e.target.value;
}

function doTouchdown(e){
  console.log(e.type);
  dragging = true;
  // get location of mouse in canvas coordinates
  var touch = getTouch(e);
  ppts.push({x:touch.x, y:touch.y});
  console.log(ppts);
  onPaint(e);
}

function doTouchmove(e) {
  // bail out if the touch button is not down
  if(!dragging) return;
  // get location of touch in canvas coordinates
  var touch = getTouchCoords(e, canvas);
  ppts.push({x:touch.x, y:touch.y});
  console.log(ppts);
  onPaint(e);
}

//when the touch is up, push the canvas to the canvasPushArray and stop dragging
function doTouchup(e) {
  console.log(e.type);
  //drawing tmp Canvas to the main canvas
  ctx.drawImage(tmpCanvas, 0, 0);
  //clearing tmp canvas
  tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
  //emptying the pencil points
  ppts = [];

  dragging = false;
  canvasPush();
}

// if the user drags out of the canvas
function doTouchout(e) {
  console.log(e.type);
  //ctx.closePath();
  dragging = false;
}

var onPaint = function(e) {
  var touch = getTouchCoords(e, canvas);
  //ppts.push({x:touch.x, y:touch.y});

  if (ppts.length < 3){
    var b = ppts[0];
    tmpCtx.beginPath();
    tmpCtx.arc(b.x, b.y, tmpCtx.lineWidth / 2, 0, Math.PI * 2, !0);
    tmpCtx.fill();
    tmpCtx.closePath();

    return;

  }

  // tmp canvas need to clear canvas before drawing
  tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

  tmpCtx.beginPath();
  tmpCtx.moveTo(ppts[0].x, ppts[0].y);

  for (var i = 1; i < ppts.length -2; i++) {
    var c = (ppts[i].x + ppts[i + 1].x) / 2;
    var d = (ppts[i].y + ppts[i + 1].y) / 2;

    tmpCtx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
  }

  // For the last 2 points
  tmpCtx.quadraticCurveTo(
    ppts[i].x,
    ppts[i].y,
    ppts[i + 1].x,
    ppts[i + 1].y
  );
  // set ctx.strokeStyle and ctx.lineWidth to correct global values
  tmpCtx.strokeStyle = strokeStyle;
  tmpCtx.lineWidth = lineWidth;
  tmpCtx.stroke();
  console.log("paint as been call");

};

function doClear(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function doExport(){
  $('.export input:text').val() == "";
  var pic = finalCanvas.toDataURL();

  var data = {
    imageData: pic,
    email:  $('.export input:text').val(),
    memory: memoryTextResult,
    bigScreen: $('.export input:checkbox').prop("checked"),
  }

  console.log(data.bigScreen, data.email);

  return fetch(API+'/users/'+allPeople[parseInt(whichPerson)]._id+'/editedPhoto', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
}

// UTILITY FUNCTIONS
// returns touch position in local coordinate system of element
function getTouch(e){
  var touch = {};
  touch.x = e.pageX - e.target.offsetLeft;
  touch.y = e.pageY - e.target.offsetTop;
  return touch;
}
function getTouchCoords(e, canvas){
  var touch = {}
  touch.x = e.touches[0].pageX - canvas.offsetLeft;
  touch.y = e.touches[0].pageY - canvas.offsetTop;
  return touch;
}

function setPicture(src) {
  console.log('setPicture ', src);
  editorImg.crossOrigin = "";
  editorImg.src = src;
  editorImg.onload = addPicture;
}

function addPicture() {
  picCtx.drawImage(editorImg,
                   // source rectangle
                   0, 0, 2448, 3696,
                   // destination rectangle
                   0, 0, 1366 * 0.66, 1366);

  // picCtx.drawImage(editorImg,
  //                  // source rectangle
  //                  0, 0, editorImg.width, editorImg.height,
  //                  // destination rectangle
  //                  0, 0, picCanvas.width, picCanvas.height);
}

function resizeCanvas() {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  tmpCtx.canvas.height = window.innerHeight;
  tmpCtx.canvas.width = window.innerWidth;
  picCtx.canvas.width  = window.innerWidth - 120;
  picCtx.canvas.height = window.innerHeight;
  finalCtx.canvas.width  = window.innerWidth;
  finalCtx.canvas.height = window.innerHeight;
  editorImg.width = canvas.width;
  editorImg.height = canvas.height;
}

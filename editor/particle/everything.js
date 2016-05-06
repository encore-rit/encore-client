<script>
"use strict";

// Enable fastclick library
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

window.onload = init;
// GLOBALS
var canvas,ctx,dragging=false,lineWidth,strokeStyle;
var tmpCanvas, tmpCtx;
var picCanvas, picCtx;
var img;

var slideMenuBoolean = true;

// Pencil Points
var ppts = [];

//making array for undo button. Picture the canvas everytime when the touch is release.
var canvasPushArray = new Array();
var canvasStep = -1;
// CONSTANTS
var DEFAULT_LINE_WIDTH = 3;
var DEFAULT_STROKE_STYLE = "red";

// FUNCTIONS
function init(){
  // initialize some globals
  canvas = document.querySelector('#mainCanvas');
  ctx = canvas.getContext('2d');
  tmpCanvas = document.querySelector('#tmpCanvas');
  tmpCtx = tmpCanvas.getContext('2d');
  picCanvas = document.querySelector('#pictureCanvas');
  picCtx = picCanvas.getContext('2d');
  img = document.querySelector('#img');
  lineWidth = DEFAULT_LINE_WIDTH;
  strokeStyle = DEFAULT_STROKE_STYLE;
  //set initial properties of the graphics context
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.lineCap = "round"; // "butt", "round", "square" (default "butt")
  ctx.lineJoin = "round"; // "round", "bevel", "miter" (default "miter")

  //FIX THIS PAINTING COLOR
  tmpCtx.lineWidth = lineWidth;
  tmpCtx.lineJoin = 'round';
  tmpCtx.lineCap = 'round';
  tmpCtx.strokeStyle = strokeStyle;

  resizeCanvas();
  // Hook up event listeners
  canvas.addEventListener('touchstart', doTouchdown);
  canvas.addEventListener('touchmove', doTouchmove);
  canvas.addEventListener('touchend', doTouchup);
  canvas.addEventListener('touchcancel', doTouchout);
  document.querySelector('#lineWidthChooser').onchange = doLineWidthChange;
  document.querySelector('#exportButton').onclick = doExport;
  document.querySelector('#clearButton').onclick = doClear;
  document.querySelector('#undoButton').onclick = canvasUndo;
  document.querySelector('#redoButton').onclick = canvasRedo;
  document.querySelector('#invertFilter').onclick = invertFilter;
  document.querySelector('#grayscaleFilter').onclick = grayscaleFilter;
  document.querySelector('#redFilter').onclick = redFilter;
  document.querySelector('#blueFilter').onclick = blueFilter;
  document.querySelector('#greenFilter').onclick = greenFilter;
  document.querySelector('#noFilter').onclick = noFilter;

  $("#slideMenu").click(function(){
    if(slideMenuBoolean == false){
      $("ul").slideDown();
      slideMenuBoolean = true;
    }
    else{
      $("ul").slideUp();
      slideMenuBoolean = false
    }

  });

  window.onresize = resizeCanvas;
  addPicture();
  //push a blank canvas
  canvasPush();
}

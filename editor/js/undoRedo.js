//undo function for painting below
//push current canvas to canvas array
function canvasPush(){
  canvasStep++;
  if (canvasStep < canvasPushArray.length)
    {
      canvasPushArray.length = canvasStep;
    }
  canvasPushArray.push(canvas.toDataURL());
}
//load previous canvas from canvasPushArray
function canvasUndo(){
  if (canvasStep > 0){
    canvasStep--;
    var canvasImage = new Image();
    canvasImage.src = canvasPushArray[canvasStep];
    doClear();
    canvasImage.onload = function() {ctx.drawImage(canvasImage,0,0);}
  }
}
//load after current canvas from canvasPushArray
function canvasRedo(){
  if (canvasStep < canvasPushArray.length-1){
    canvasStep++;
    var canvasImage = new Image();
    doClear();
    canvasImage.src = canvasPushArray[canvasStep];
    canvasImage.onload = function() {ctx.drawImage(canvasImage,0,0);}
  }
}

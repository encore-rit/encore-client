var currentColor = 'rgb(255,0,0)';

function getColor(){
  return currentColor;
  console.log(currentColor);
}

function getTheColor( colorVal ) {
  var theColor = "";
  //red to yellow
  if ( colorVal < 255 ) {
        Red = 255;
        Green = parseInt(colorVal);
        Blue = 0;
  }
  //yellow to green
  else if ( colorVal <= 510 ) {
          Red = Math.abs(parseInt(colorVal-510));
          Green = 255;
          Blue = 0;
  }
  //green to light blue
  else if ( colorVal <= 765 ) {
          Red = 0;
          Green = 255;
          Blue = parseInt(colorVal-510);
  }
  //light blue to blue
  else if ( colorVal <= 1020 ) {
          Red = 0;
          Green = Math.abs(parseInt(colorVal-1020));
          Blue = 255;
  }
  //blue to pink
  else if ( colorVal <= 1275 ) {
          Red = parseInt(colorVal-1020);
          Green = 0;
          Blue = 255;
  }
  //pink to red
  else if ( colorVal <= 1530 ) {
          Red = 255;
          Green = 0;
          Blue = Math.abs(parseInt(colorVal-1530));
  }

  theColor = "rgb(" + Red + "," + Green + "," + Blue + ")";
  return( theColor );
}
//change the stroke color and slider color
function refreshSwatch() {
var coloredSlider = $( "#coloredSlider" ).slider( "value" ),
currentColor = getTheColor( coloredSlider );
strokeStyle = currentColor;

$( "#coloredSlider .ui-state-default, .ui-widget-content .ui-state-default" ).css( "background-color", currentColor );
}

$(function() {
  $( "#coloredSlider" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 1530,
      value: 0,
      slide: refreshSwatch,
      change: refreshSwatch
  });
});

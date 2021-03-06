//booleans for filter
var invert = false;
var grayscale = false;
var tintRed = false;
var tintBlue = false;
var tintGreen = false;

function invertFilter(){
  grayscale = tintRed = tintGreen = tintBlue = false;
  invert = true;
  console.log("invertFilter");
  manipulatePixels();
}

function grayscaleFilter(){
  noFilter();
  invert = tintRed = tintGreen = tintBlue = false;
  grayscale = true;
  console.log("grayscaleFilter");
  manipulatePixels();
}

function redFilter(){
  noFilter();
  invert = grayscale = tintGreen = tintBlue = false;
  tintRed = true;
  console.log("redFilter");
  manipulatePixels();
}

function blueFilter(){
  noFilter();
  invert = grayscale = tintRed = tintGreen = false;
  tintBlue = true
  console.log("blueFilter");
  manipulatePixels();
}

function greenFilter(){
  noFilter();
  invert = grayscale = tintRed = tintBlue = false;
  tintGreen = true;
  console.log("greenFilter");
  manipulatePixels();
}

function noFilter(){
  invert = grayscale = tintRed = tintGreen = tintBlue = false;
  console.log("noFilter");
  manipulatePixels();
}

function manipulatePixels(){
  // Get all of the rgba pixel data of the canvas by grabbing the ImageData Object
  // https://developer.mozilla.org/en-US/docs/Web/API/ImageData
  addPicture();
  var imageData = picCtx.getImageData(0, 0, picCanvas.width, picCanvas.height);
  console.log(imageData)
  //imageData.data is an 8-bit typed array - values range from 0-255
  var data = imageData.data;
  var length = data.length;
  var width = imageData.width;
  //Iterate through each pixel
  // data[i] is the red value
  // data[i+1] is the green value
  // data[i+2] is the blue value
  // data[i+3] is the alpha value
  for (var i = 0; i < length; i +=4){
    // increase red value only
    if(tintRed){
      data[i] = data[i] + 100;
    }
    // increase green value only
    if(tintGreen){
      data[i+1] = data[i+1] + 100;
    }
    // increase blue value only
    if(tintBlue){
      data[i+2] = data[i+2] + 100;
    }
    // invert every color channel
    if(invert){
      var red = data[i], green = data[i+1], blue = data[i+2];
      data[i] = 255 - red;
      data[i+1] = 255 - green;
      data[i+2] = 255 - blue;
    }
    //grayscale
    if(grayscale){
      var red = data[i];
      var green = data[i+1];
      var blue = data[i+2];
      var v = 0.2126*red + 0.7152*green + 0.0722*blue;
      data[i] = data[i+1] = data[i+2] = v
    }
  }
  // put the modified data back on the canvas
  picCtx.putImageData(imageData, 0, 0);
}

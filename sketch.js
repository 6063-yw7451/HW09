let img;
let handpose, video;
let hands = [];
let viewImage = false;
let freehandDrawing = false;
let circleDrawing = false;
// graphics buffers
let viewPG, freehandPG, circlePG;

function preload() {
  // Load and display an image in the window. 
  img = loadImage('assets/1687631452.jpg');
}

function setup() {
  /* 1. Initial Setup */
  // Create a display window.
  createCanvas(1200, 600);
  viewPG = createGraphics(600, 600);
  img.resize(600, 600);

  viewPG.image(img, 0, 0);
  viewPG.filter(BLUR, 5);
  freehandPG = createGraphics(600, 600);
  circlePG = createGraphics(600, 600);
  // The instant view of the camera should be displayed next to the image 
  // and has the same size as the image.
  video = createCapture(VIDEO);
  video.size(width / 2, height);
  video.hide();

  /* 2. Index finger tip detection */
  handpose = ml5.handpose(video, modelReady);
  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", function (results) {
    hands = results;
  });
}

function modelReady() {
  console.log('model ready');
}

function gotResults(results) {
  detections = results;
}

function draw() {
  image(img, 0, 0);
  // In the view image mode, a blurred version of the image should be displayed. 
  if (viewImage) image(viewPG, 0, 0);
  // Enter the freehand drawing mode.
  if (freehandDrawing) image(freehandPG, 0, 0);
  // Enter the circle drawing mode.
  if (circleDrawing) image(circlePG, 0, 0);

  image(video, width / 2, 0, width / 2, height);
  // If there is a hand
  if (hands.length > 0) {
    drawIndexFingerTip();
  }
}

/* A small circle should be drawn on the camera view to indicate 
the position of the detected index finger tip. */
function drawIndexFingerTip() {
  let index = hands[0].annotations.indexFinger;
  fill(29, 53, 87);
  noStroke();
  // When you move your index finger in front of the camera, 
  // the circle should keep following your finger tip.
  // The top of the index finger is index 3
  ellipse(width / 2 + index[3][0], index[3][1], 30);
  // When your index finger tip is moving in the camera view, 
  // a rectangular area around the position indicator in the blurred image 
  // should display the corresponding region from the original image without blurring.
  if (viewImage) {
    copy(img, index[3][0] - 50, index[3][1] - 50, 100, 100, index[3][0] - 50, index[3][1] - 50, 100, 100);
  }
  // In the freehand drawing mode, a freehand trace should be drawn on the image
  // according to the movement of your index finger tip.
  if (freehandDrawing) {
    freehandPG.stroke(241, 250, 238);
    freehandPG.strokeWeight(20.0);
    freehandPG.point(index[3][0], index[3][1]);
  }
  // When your index finger tip is moving in the camera view, 
  // a circle should be drawn at the position indicator on the image.
  if (circleDrawing) {
    circlePG.noStroke();
    // The circle should be filled with the pixel color
    // at the location of the position indicator with a suitable degree of opacity. 
    let pixelColor = img.get(index[3][0], index[3][1]);
    circlePG.fill(pixelColor, 80);
    // The radius of the circle should be adjusted in proportion
    // to the distance between the tips of your thumb and index finger. 
    let thumb = hands[0].annotations.thumb;
    let distTips = dist(thumb[3][0], thumb[3][1], index[3][0], index[3][1]);
    let radius = 0.5 * distTips;
    circlePG.circle(index[3][0], index[3][1], radius);
  }
  // A corresponding position indicator should also be drawn on the image
  // to follow the movement of your index finger tip. 
  fill(230, 57, 70);
  stroke(0);
  square(index[3][0] - 15, index[3][1] - 15, 30, 10);
}

function keyReleased() {
  /* 3. Viewing the image */
  // When the ‘v’ key is pressed and released, 
  // the interface should enter the view image mode. 
  if (key === 'v' || key === 'V') viewImage = true;

  /* 4. Freehand drawing on the image */
  // When the ‘f’ key is pressed and released, 
  // the interface should enter the freehand drawing mode. 
  if (key === 'f' || key === 'F') freehandDrawing = true;

  /* 5. Drawing circles on the image */
  // When the ‘c’ key is pressed and released, 
  // the interface should enter the circle drawing mode.
  if (key === 'c' || key === 'C') {
    // In this mode, the original image should be displayed.
    viewImage = false;
    freehandDrawing = false;
    circleDrawing = true;
  }

  /* 6. Exiting the view image/freehand drawing/circle drawing mode */
  // When the ‘e’ key is pressed and released, 
  // the interface should exit from the view image / freehand drawing / circle drawing mode, 
  // and the original image should be redisplayed. 
  if (key === 'e' || key === 'E') {
    viewImage = false;
    freehandDrawing = false;
    circleDrawing = false;
  }
}
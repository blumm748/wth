// All credit for the hand detection model go to the ml5 library
//Awesome job MIT!!!
//Copyright (c) 2023 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let handpose;
let video;
let hands = [];
let img; // Declare a variable for the image
let captureTime = 3000; // Time to capture the screenshot in milliseconds
let captured = false; // Flag to indicate if the screenshot has been captured
let imgSize = 50; // Size of the image and the mask
let font; // Variable for the font

function preload() {
  // Load the handpose model.
  handpose = ml5.handpose();
  // Load the font
  font = loadFont('font.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handpose.detectStart(video, gotHands);
  textSize(32);
  // Set the frame rate to a lower value
  frameRate(12); // for example, 30 frames per second
  // Set the font
  textFont(font);
}

function draw() {
  background(0);
  
  // Draw the text if the left hand is detected
  if (hands[0] && hands[0].handedness == "Left" && hands[0].score > 0.9) {
    fill(255); // Set the text color to white
    textAlign(CENTER);
    textSize(windowWidth/8);
    text("BORN", windowWidth-(windowWidth/4), windowHeight-(windowHeight/7));
    text("BEING", windowWidth/4, windowHeight/4);
}
  
  // Draw the webcam video
  let videoX = (windowWidth - video.width) / 2;
  let videoY = (windowHeight - video.height) / 2;
  
  // Create an ellipse mask
  let mask = createGraphics(video.width, video.height);
  mask.ellipse(video.width / 2, video.height / 2, video.width, video.height);
  // Apply the mask to the video
  video.mask(mask.get());
  
  image(video, videoX, videoY, video.width, video.height);
  // Capture a screenshot from the webcam video after 3 seconds
  if (millis() > captureTime && !captured) {
    img = video.get();
    captured = true;
  }
  
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      if (img) {
        // Create a circular mask
        let mask = createGraphics(imgSize, imgSize);
        mask.circle(imgSize / 2, imgSize / 2, imgSize);
        // Apply the mask to the image
        img.mask(mask.get());
        // Draw the masked image at each keypoint
        image(img, videoX + keypoint.x - imgSize / 2, videoY + keypoint.y - imgSize / 2, imgSize, imgSize);
      }
    }
  }
}

// Callback function for when handpose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
  // Check if the left hand is detected
  leftHandDetected = hands[0] && hands[0].handedness == "Left" && hands[0].score > 0.9;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

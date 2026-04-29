var font;
var points = [];

function preload() {
  font = loadFont("HeavenText/Suba-Display.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeTextPoints();
}
function makeTextPoints() {
   let fontSize= 80;
  
 let line1 = font.textToPoints(
   "EITHER WAY", 120, height * 0.45, fontSize, {
    sampleFactor: 0.45,
    simplifyThreshold:0,
   });
  
  let line2= font.textToPoints (
    "I WILL SEE YOU AT EVERY", 120, height * 0.55, fontSize, {
      sampleFactor :0.45,
      simplifyThreshold:0,
   });
   let line3= font.textToPoints (
    "BEGINNING AND EVERY END" , 120, height * 0.65, fontSize, {
      sampleFactor :0.45,
      simplifyThreshold:0,
   });
  points = line1.concat(line2,line3);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  makeTextPoints();
}

function draw() {
  clear();

  let angel = document.getElementById("angel");
  let angelBox = angel.getBoundingClientRect();

  let angelX = angelBox.left + angelBox.width/ 2;
  let angelY= angelBox.top + angelBox.height / 2;

  stroke(255);
  strokeWeight (3);
  fill(255);

  points.forEach((point) => {
   
    let distance = createVector(point.x - angelX, point.y - angelY);
    let d = distance.mag();

    let distortionAmount = 0
    
    if (d <220) {
      distortionAmount = map(d, 0, 220, 160, 0);
    }
     let distortion = distance.copy().setMag(distortionAmount);

    circle(point.x + distortion.x, point.y + distortion.y, 8);
  });
}

document.addEventListener("mousemove", function(event) {
  let angel = document.getElementById("angel");
  angel.style.left = mouseX - angel.offsetWidth / 2 + "px";
  angel.style.top = mouseY -angel.offsetHeight / 2 + "px";
  });


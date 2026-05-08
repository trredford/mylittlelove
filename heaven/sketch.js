var font;
var points = [];
let letterSpacing= 40;

function preload() {
  font = loadFont("HeavenText/Suba-Display.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeTextPoints();
}
function makeTextPoints() {
  points = [];
   let fontSize= 80;
  
  drawSpacedLine(
   "EITHER W AY", 150, height * 0.45, fontSize);
  
  drawSpacedLine(
    "I W ILL SEE YOU AT EVERY", 150, height * 0.55, fontSize);

   drawSpacedLine(
    "BEGINNING AND EVERY END" , 150, height * 0.65, fontSize);
  
}

function drawSpacedLine(str, x, y, fontSize){
  let currentX= x;
  for (let i = 0; i <str.length; i++) {
    let char = str[i];
    let pts =font.textToPoints(char, currentX, y, fontSize,{
      sampleFactor: 0.45,
      simplifyThreshould: 0
    });
    points = points.concat(pts);
    currentX += textWidth(char)+ letterSpacing;
  }
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
  strokeWeight (0.5);
  fill(255);

  points.forEach((point) => {
   
    let distance = createVector(point.x - angelX, point.y - angelY);
    let d = distance.mag();

    let distortionAmount = 0
    
    if (d <180) {
      distortionAmount = map(d, 0, 160, 40, 0);
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


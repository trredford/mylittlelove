
// inspired by on maddireyes TabiTabPO
// I utilized chat gpt to fix coding errors like stray brackets
// I utilized Chat GPT to help me get the text to be a little bit more clear looking in my design

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
   let fontSize= 75;
  
  
   let line1 = "EITHER W AY";
  
  let line2 =
    "I W ILL SEE YOU AT EVERY";

   let line3 =
    "BEGINNING AND EVERY END";

    let line1Width =textWidth(line1)+(line1.length * letterSpacing);
    let line2Width =textWidth(line2)+(line2.length * letterSpacing);
    let line3Width =textWidth(line3)+(line3.length * letterSpacing);

    drawSpacedLine(line1, width / 2 -line1Width / 2, height * 0.40,
      fontSize);

      drawSpacedLine(line2, width / 2 -line2Width / 2, height * 0.50,
        fontSize);

        drawSpacedLine(line3, width / 2 -line3Width / 2, height * 0.60,
          fontSize);
  
}

function drawSpacedLine(str, x, y, fontSize){
  let currentX= x;
  for (let i = 0; i <str.length; i++) {
    let char = str[i];
    let pts =font.textToPoints(char, currentX, y, fontSize,{
      sampleFactor: 0.7,
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
    
    if (d <260) {
      distortionAmount = map(d, 0, 260, 40, 0);
    }
     let distortion = distance.copy().setMag(distortionAmount);

    circle(point.x + distortion.x, point.y + distortion.y, 11);
  });
}

document.addEventListener("mousemove", function(event) {
  let angel = document.getElementById("angel");
  angel.style.left = mouseX - angel.offsetWidth / 2 + "px";
  angel.style.top = mouseY -angel.offsetHeight / 2 + "px";
  });


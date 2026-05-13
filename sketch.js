// based on maddireyes FINALPO 
// tried to ask Chat to help me calculate some of my coding to change it's original position to center aligned after the 2 layers of text weren't lining up
// that was a failure, I had to calculate through trial and error to shift the different lines of text on the star text layer to the left by specific amounts
// Asked chat GPT how to ensure by stars stopped clustering in a left angle on the page and around the text

let galaxy;
var font;
var points = [];
var b = [];
var starLight = 255;


function preload() {
  font = loadFont("Suba-Display.ttf");
  galaxy = loadImage("galaxy.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeText();
  

 function makeText(){
   points = [];
   b = [];
   
      let fontSize = 70;

      let line1Text= "WHEN IT IS ALL OVER JUST KNOW";
      let line2Text= "I WILL SEE YOU AGAIN MY LITTLE LOVE";
      let line3Text= "IN WHATEVER HAPPENS NEXT";
      let line4Text= "I WILL FIND YOU";

      let startY =height/2-70;
      let spacing = 70;


      let line1Bounds = font.textBounds (line1Text, 0, 0, fontSize);
      let line2Bounds = font.textBounds (line2Text, 0, 0, fontSize);
      let line3Bounds = font.textBounds (line3Text, 0, 0, fontSize);
      let line4Bounds = font.textBounds (line4Text, 0, 0, fontSize);


      let line1ShiftLeft = 1
      let line2ShiftLeft = 272;
      let line3ShiftLeft = 1;
      let line4ShiftLeft = 1;

      let line1X =width/2 - line1Bounds.w/2- line1ShiftLeft;
      let line2X =width/2 - line2Bounds.w/2- line2ShiftLeft;
      let line3X =width/2 - line3Bounds.w/2- line3ShiftLeft;
      let line4X =width/2 - line4Bounds.w/2-  line4ShiftLeft;



let line1 = font.textToPoints 
(line1Text, line1X, startY, fontSize,
  {
  sampleFactor: 0.12, simplifyThreshold: 0
  });
  let line2 = font.textToPoints 
  (line2Text, line2X, startY+ spacing, fontSize,
  {
  sampleFactor: 0.12, simplifyThreshold: 0
  });
  let line3 = font.textToPoints 
  (line3Text, line3X, startY+ spacing * 2, fontSize,
    {
    sampleFactor: 0.12, simplifyThreshold: 0
    });
    let line4 = font.textToPoints 
    (line4Text, line4X, startY+ spacing * 3, fontSize,
      {
      sampleFactor: 0.12, simplifyThreshold: 0
      });

  
  points = line1.concat(line2,line3,line4);

    for (let i= 0; i < points.length; i++) {
       b [i] = new Star(points[i].x, points [i].y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}

function draw() {
  image (galaxy, 0, 0, width, height);
  let anyStarScattered = false;
  

  
  let touchedText= false;
  for( let i = 0; i < b.length; i++){
    if (b[i].scattered === true){
      touchedText = true
    }
  }
  if (touchedText === true){
    starLight -= 0.005;
  }
    
  starLight = max(starLight,0);
  fill (255, 127);
  noStroke();
  textFont(font)
  textSize(70)
  textAlign(CENTER);
  
  let startY = height / 2-70;
  let spacing =70;
  
  text("WHEN IT IS ALL OVER JUST KNOW", width/2, startY);
  text("I WILL SEE YOU AGAIN MY LITTLE LOVE", width/2, startY + spacing);
  text("IN WHATEVER HAPPENS NEXT", width/2, startY+spacing * 2);
  text("I WILL FIND YOU", width/2, startY + spacing * 3);
  
  
  for (let i = 0; i < b.length; i++) {
    b[i].move();
    b[i].display(); 
  }
  
  let moving = false;
  
  for (let i = 0; i < b.length; i++){
    if (b[i].scattered === true){
    moving = true;
  }
  }
  
  if (moving === true && starLight > 0){
    
  }
  
}

class Star  {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.size = random (1.5,3);
    this.angle= random (TWO_PI);
    this.spin = random ( -0.05, 0.05);
    this.scattered = false;
    this.leaveScreen = random (1) <0.75;
    this.settled = false;
    this.twinkleOffset= random (1000)
    this.targetX = random (width * 0.25, width * 0.95);
    this.targetY = random (height * 0.10, height* 0.90);
  }

  // methods aka functions
  move() {
    if (dist(mouseX, mouseY, this.x, this.y) < 45 && this.scattered === false) {
      this.scattered = true;
      
      if (this.leaveScreen === true){
        let angle = random (TWO_PI);
        let speed = random (20,35);
        this.xspeed = cos(angle) * speed;
        this.yspeed = sin(angle) * speed;
    } else {
       
        this.xspeed = (this.targetX- this.x) * 0.04;
        this.yspeed = (this.targetY- this.y) * 0.04;
      
    }
  }
      if (this.scattered === true && this.settled === false){
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.angle += this.spin;
    
      if(this.leaveScreen === false){
        this.x = lerp (this.x, this.targetX, 0.04);
        this.y = lerp (this.y, this.targetY, 0.04);
          
          if (dist(this.x, this.y, this.targetX, this.targetY) <2){
            this.x = this.targetX;
            this.y = this.targetY;
            this.xspeed *= 0;
            this.yspeed *= 0;
            this.spin *= 0;
            this.settled = true;
          }
        
        if (abs(this.xspeed) < 0.3 && abs (this.yspeed) < 0.03){
          this.xspeed = 0;
          this.yspeed = 0;
          this.spin = 0;
          this.settled = true;
        }
      }
    }
  }

  bounce() {
    if (this.x > width || this.x < 0) {
      this.xspeed = this.xspeed * -1;
    }

    if (this.y > height || this.y < 0) {
      this.yspeed = this.yspeed * -1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate (this.angle);
    
    let twinkle = map (sin(frameCount * 0.25 + this.twinkleOffset), -1, 1, 30, 255);
    fill (255,twinkle);
    noStroke();
    
     if (this.scattered === false){
       ellipse (0,0,3,3);
     }else{
    beginShape();
    vertex(0, -this.size * 2);
    vertex(this.size * 0.45, -this.size * 0.45);
    vertex(this.size * 2, 0);
    vertex(this.size * 0.45, this.size * 0.45);
    vertex(0, this.size * 2);
    vertex(-this.size * 0.45, this.size * 0.45);
    vertex(-this.size * 2, 0);
    vertex(-this.size * 0.45, -this.size * 0.45);
    endShape (CLOSE);
      
    }
    
    pop();
  }}
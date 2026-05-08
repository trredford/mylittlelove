// based on maddireyes FINALPO 


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
 }  
let fontSize = 70;
  let x = 40;
  
  let line1 = font.textToPoints (
  "WHEN IT'S ALL OVER JUST KNOW",
    x, height*0.35, fontSize, 
    {
    sampleFactor: 0.12, simplifyThreshold: 0,
    }
  );
  let line2 = font.textToPoints (
  "I'LL SEE YOU AGAIN MY LITTLE LOVE",
  x, height * 0.50, fontSize, 
    {
    sampleFactor: 0.12, simplifyThreshold: 0,
    });

let line3 = font.textToPoints(
  "IN WHATEVER HAPPENS NEXT",
    x, height * 0.65, fontSize, 
    {
    sampleFactor: 0.12, simplifyThreshold: 0,
    });
  
  let line4 = font.textToPoints(
  "I'LL FIND YOU",
    x, height * 0.80, fontSize, 
    {
    sampleFactor: 0.12, simplifyThreshold: 0,
    });
  
  points = line1.concat(line2,line3, line4);

  for (let i= 0; i < points.length; i++) {
    b [i] = new Star (points [i].x, points [i].y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}

function draw() {
  image (galaxy, 0, 0, width, height);
  let anyStarScattered = false;
  
  starLight -= 2;
  
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
  fill (255, starLight);
  noStroke();
  textFont(font)
  textSize(70)
  
  let centerY = height / 2 ;
  
  text("WHEN IT'S ALL OVER JUST KNOW", 40, height * 0.35);
  text("I'LL SEE YOU AGAIN MY LITTLE LOVE", 40, height * 0.50);
  text("IN WHATEVER HAPPENS NEXT", 40, height * 0.65);
  text("I'LL FIND YOU", 40, height * 0.80);
  
  
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
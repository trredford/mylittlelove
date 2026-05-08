 var font;
let selectedAnimal = null;
let reincarnated = false;
let gifs ={}
let startTime;

function preload() {
  font = loadFont("Suba-Display.ttf");
}

function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  document.body.style.backgroundColor= "#79A7D1";
  startTime = millis();
  
  gifs["KOI FISH"]= createImg ("reincarnation_img/koi1.gif", "KOI");
  gifs["BIRD"]= createImg ("reincarnation_img/bird.gif", "BIRD");
  gifs["RABBIT"]= createImg ("reincarnation_img/bunnyrabbit.gif", "RABBIT");
  gifs["TURTLE"]= createImg ("reincarnation_img/turtle.gif", "TURTLE");
  gifs["BUTTERFLY"]= createImg ("reincarnation_img/butterfly.gif", "BUTTERFLY");
  gifs["CAT"]= createImg ("reincarnation_img/catt.gif", "CAT")
  
  for (let key in gifs){
    gifs[key].hide();
    gifs[key].position (0.0);
    gifs[key].style("z-index", "10");
    gifs[key].style("position", "absolute")
  }
}

function draw() {
  background('#79A7D1');
  
  
  
  let centerX = width / 2;
  
  let elapsed = millis() - startTime;
  
  let firsttext = 255
  
  textFont(font);
  textAlign (CENTER,CENTER);
  
  if (elapsed < 7000){
  if (elapsed > 5000){
    firsttext = map(elapsed, 5000, 7000,255, 0);
    firsttext = constrain (firsttext,0, 255);
  }
    
    textSize(50);
    textAlign(CENTER,CENTER);
    fill(244, 248, 130, firsttext);
   
  text("MAYBE WE'LL BE YOUR FAVORITE FISH IN OUR NEXT LIFE  ", centerX, 225);
  text("UNBURDENED BY CONCEPTS OF LIFE AND DEATH", centerX, 325)
  text(" OR MAYBE, IN THE NEXT LIFE YOU'll BE MY MOTHER.", centerX, 425);  
}
  
  else {
  if(reincarnated=== false) {
    showReincarnateButton();
  }
  if (reincarnated=== true && selectedAnimal !== null){
    showSelectedAnimal();
    
    function showSelectedAnimal(){
      let gifSize = 600;
      
      gifs [selectedAnimal].show();
      gifs[selectedAnimal].size(gifSize, gifSize);
      gifs[selectedAnimal].position(
      width / 2 - gifSize / 2,
      height / 2 - gifSize / 2
      );
      }
    }
  }
} 
function showReincarnateButton(){
  textFont(font);
  textAlign(CENTER,CENTER);
  
  let pulse = 90 + sin (frameCount * 0.2) * 10;
  textSize(pulse);
  fill(244, 248, 130);
  text("REINCARNATE", width / 2, height / 2);
}

function showSelectedAnimal(){
  let gifSize= 600;
  
  gifs[selectedAnimal].show();
  gifs[selectedAnimal].style("pointer-events", "none")
  gifs[selectedAnimal].size(gifSize, gifSize);
    gifs[selectedAnimal].position(
    width / 2 - gifSize / 2,
      height / 2 -gifSize / 2
    );
}

function mousePressed() {
  
  let elapsed =millis() - startTime;
  
  if (elapsed< 7000){
    return;
  }
  
  let animalNames =["KOI FISH", "BIRD", "RABBIT", "TURTLE", "BUTTERFLY", "CAT"];
  
  for (let key in gifs){
    gifs[key]. hide();
  }
  
  selectedAnimal = random (animalNames);
  reincarnated = true;
  console.log ("clicked:", selectedAnimal);
}

function windowResized (){
  resizeCanvas (windowWidth, windowHeight);
}

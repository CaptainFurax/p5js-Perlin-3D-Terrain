/*
Based on Coding Train 3D Terrain by D. Shiffman
*/
p5.disableFriendlyErrors = true;
var cols, rows;
var w = 2000; var h = 1600;
var scl = 20;
var yMove = 0; var xMove = 0;
var terrain; var swap = true;
//
function setup() {
  pixelDensity(1);
  frameRate(30);
  cvSiz = createVector(800,600);
  createCanvas(cvSiz.x, cvSiz.y, WEBGL).id( "mainCanvas" );
  cam = createCamera();
  cols = w / scl;
  rows = h / scl;
  terrain = Array.from( new Array(cols), () => new Array(rows) );
  windowResized();
}
//
function windowResized(){
  let ratio  = createVector( windowWidth / cvSiz.x, windowHeight / cvSiz.y );
  if ( windowWidth > windowHeight && ratio.x > ratio.y )
  {
    select("#mainCanvas").style("width", round(cvSiz.x * ratio.y) + "px");
    select("#mainCanvas").style("height", windowHeight + "px");
  } else
  {
    select("#mainCanvas").style("width", windowWidth  + "px");
    select("#mainCanvas").style("height", round(cvSiz.y * ratio.x) + "px");
  }
}
//
function draw() {
  (swap)?background('rgb(128,32,128)'):background('rgb(0,0,96)');
  cam.lookAt(0,0,0);
  cam.setPosition(0,700,160);
  translate( -w/2, -h/2 );
  
  var yOff = yMove;
  for ( var y = 0; y < rows; y++ ){
    var xOff = xMove;
    for ( var x = 0; x < cols; x++ ) {
      terrain[x][y] = map( noise(xOff,yOff), 0, 1, -150, 200);
      xOff += 0.1;
    }
    yOff += 0.1;
  }
  yMove -= 0.1;
  (swap)?noStroke():noFill();
  for ( var y = 0; y < rows-1; y++ ){
    beginShape(TRIANGLE_STRIP);
    for ( var x = 0; x < cols; x++ ) {
      (swap)?fill( map( terrain[x][y],-150,200,224,32),0,128 ):stroke(map( terrain[x][y],-150,200,32,224),0,128 );
      vertex( x * scl, y * scl, terrain[x][y] );
      vertex( x * scl, ( y+1) * scl, terrain[x][y+1] );
    }
    endShape();
  }
  if (keyIsDown(LEFT_ARROW)) xMove -= 0.1;
  
  if (keyIsDown(RIGHT_ARROW)) xMove += 0.1;
  
}
//
function keyPressed()
{
  if ( keyIsDown(32) ) swap = !swap;
}

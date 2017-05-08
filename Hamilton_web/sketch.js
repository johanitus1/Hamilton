var frameLastFall = 0;
var frameLastMove = 0;
var fallDelay = 30;
var moveDelay = 5;

var FILES = 20;
var COLS = 10;
var SIZE = 30;

//var pesa;

var grid = Array(200);
var pesa;

var direccio = "stoped";

function setup() {
    frameRate(60);

    var canvas;
    canvas = createCanvas(COLS*SIZE+1, FILES*SIZE);
    canvas.parent('container');
    background(255, 255, 255);
    var canvas;
    canvas = createCanvas(COLS*SIZE+1, FILES*SIZE);
    canvas.parent('container');
    background(255, 255, 255);
    for (var j = 0; j < FILES; ++j){
      for (var i = 0; i < COLS; ++i){
        var position = pos(i, j);
        grid[position] = new quadraditu(i*SIZE, j*SIZE);
        grid[position].show();
      }
    }

    pesa = new piece();


/**
    for(var i = 0; i<FILES; ++i){
        for(var j = 0; j<COLS; ++j){
            var position = pos(i, j);
            grid[position] = new quadraditu(j*SIZE, i*SIZE);
            grid[position].show();
        }
    }
*/
}

function draw() {
    update();
    addFrame();
}

var update = function(){
  console.log("Delay: " + fallDelay);
    if (frameLastFall + fallDelay < frameCount) {
      pesa.update(true);
      frameLastFall = frameCount;
    }
    if (frameLastMove + moveDelay < frameCount) {
      if (direccio == "left")pesa.moure(-1);
      else if (direccio == "rigth")pesa.moure(1);
      frameLastMove = frameCount;
    }
}

var addFrame = function() {
  for(var x = 0; x < 200; ++x){
    grid[x].show();
  }
}

var checkLines = function(){
  console.log("Checking lines");
  var i = FILES-2;
  var checked = line_state(FILES-1);
  while(!checked.x){
    console.log(checked.x + " " + checked.y);
    if (checked.y) delete_line(i);
    checked = line_state(i);
    i--;
  }
}

var line_state = function(x){
  var empty = createVector(true, true);
  var limit = COLS*(x+1);
  for (var i = COLS*x;i < limit; ++i){
    if (grid[i].is_default()) empty.y = false;
    else  empty.x = false;
  }
  return empty;
}

var delete_line = function(line){
  console.log("deleting");
  line++;
  for (var i = line*COLS -1; i >= 0; --i) {
    grid[i+COLS].COLOR = grid[i].COLOR;
    grid[i+COLS].state = grid[i].state;
    grid[i].COLOR = -1;
    grid[i].state = "default";
  }
}

var pos = function(x, y){
    return x + y * COLS;
}

function keyPressed(){
  console.log("Key Presed: " + keyCode);
  switch(keyCode){
		case LEFT_ARROW: 	direccio = "left";  break;
		case RIGHT_ARROW:	direccio = "rigth";	break;
		case UP_ARROW: 		rotar = true;				break;
		case DOWN_ARROW: 	fallDelay = 5;			break;
	}
}

function keyReleased() {
  console.log("Key Released: " + keyCode);
  if (keyCode == DOWN_ARROW) fallDelay = 45;
  if ((keyCode == LEFT_ARROW) || (keyCode == RIGHT_ARROW)) (direccio = "stoped");
}

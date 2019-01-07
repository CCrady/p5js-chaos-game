
var bgColor;
var dotColor;
var pointColor;
var dotSize;
var pointSize;

// the "dot" is the thing that moves randomly
var dot;
// the "points" are the locations that the dot moves towards
var points;
// the index of the point picked last
var prevPointIndex;


// this function defines the rules of the game
function nextDot(thisDot) {
	// choose a random point which is not the previous point
	var pointChoiceIndex;
	
	do {
		pointChoiceIndex = Math.floor(Math.random() * points.length);
	} while (pointChoiceIndex === prevPointIndex);
	
	var pointChoice = points[pointChoiceIndex];
	prevPointIndex = pointChoiceIndex;
	var newDot = p5.Vector.lerp(thisDot, pointChoice, 0.5);
	
	return newDot;
}

function resetCanvas() {
	// don't draw the dot
	dot = null;
	
	background(bgColor);
	
	stroke(pointColor);
	strokeWeight(pointSize);
	
	points.forEach(function(e) {
		point(e.x, e.y);
	});
	
	// set these now so that we don't have to do so in every draw() call
	stroke(dotColor);
	strokeWeight(dotSize);
}

function setup() {
	bgColor = color(255, 255, 255);
	dotColor = color(0, 0, 0);
	pointColor = color(255, 50, 75);
	dotSize = 3;
	pointSize = 14;
	points = [];
	
	createCanvas(windowWidth, windowHeight - 5);
	// set the framerate really high so that the dots are drawn really quickly
	frameRate(120);
	
	var minDimension = Math.min(windowWidth, windowHeight);
	points = [
		createVector(1/6 * minDimension, 1/6 * minDimension),
		createVector(5/6 * minDimension, 1/6 * minDimension),
		createVector(1/6 * minDimension, 5/6 * minDimension),
		createVector(5/6 * minDimension, 5/6 * minDimension),
	];
	
	resetCanvas();
}

function draw() {
	if (dot && points.length > 0) {
		point(dot.x, dot.y);
		dot = nextDot(dot);
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		points.push(createVector(mouseX, mouseY));
		
		resetCanvas();
	} else if (keyCode === DOWN_ARROW && points.length > 0) {
		let mousePos = createVector(mouseX, mouseY);
		
		// find the first point the mouse is touching
		let touchingPoint = false;
		
		for (var i = 0; i < points.length; i++) {
			let e = points[i];
			
			if (e.dist(mousePos) < pointSize) {
				touchingPoint = true;
				break;
			}
		}
		// i is now the index of the point to remove (if we are removing a point)
		
		if (touchingPoint) {
			points.splice(i, 1);
			resetCanvas();
		}
	}
}

function mouseClicked() {
	resetCanvas();
	
	dot = createVector(mouseX, mouseY);
}
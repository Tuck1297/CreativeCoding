/**
 * Tucker Johnson
 * Creative Coding Spring 2022
 * 
 * Figure out how to remove old data - fix bug
 */
// Variables that were needed by entire scope
let ultArray = [];
let tail;
let paths = 100;
let width = innerWidth - 20;
let height = innerHeight - 20;
let screenPrompt = true; 

// Class that defines and handles operations of all firework tails. 
class Shape {
    constructor(coordinates, offset, diameter, col, opacity, move, ease, radius, gravity) {
        this.coor = coordinates;
        this.off = offset;
        this.d = diameter;
        this.c = col;
        this.o = opacity;
        this.m = move;
        this.e = ease;
        this.rai = radius;
        this.grav = gravity;
        this.bool = true;
        this.draw = true;
        // Display each firework tail
        this.display = function () {
            noStroke();
            fill(this.c[0], this.c[1], this.c[2], this.o);
            ellipse(this.coor.x, this.coor.y, this.d, this.d);
        }
        this.update = function () {
            // If the mouse is exactly center of the canvas is when not to update the 
            // x values of each firework tail. Always update the y values of the firework tails. 
            if (mouseX > ((width / 2) + 100) || (mouseX < (width / 2) - 100)) {
                this.coor.x = (this.coor.x) + this.m * Math.cos(this.rai);
                this.coor.x += noise(this.off.x) * this.m;
                this.off.x += 0.01;
            }
            this.coor.y = (this.coor.y) + this.m * Math.sin(this.rai);
            this.coor.y += noise(this.off.y+1) * this.m;
            this.off.y += 0.02;
            this.coor.y -= this.grav;
            this.o -= 1;
            this.m += 0.015;
        }
    }
}

// Setup P5 Class
function setup() {
    frameRate(60);
    noiseSeed(5);
    angleMode(DEGREES);
    createCanvas(innerWidth - 20, innerHeight - 20);
}
// Draw P5 Class
function draw() {
    background(0, 10);
    if (screenPrompt == true) {
        textSize(32); 
        fill('white'); 
        text('Click anywhere to begin', width/2.7, height/2);
        text('Scroll to the center of the screen to see the animation change.', width/4.5, (height/2)+64);
    }

    // Only draw if there is at least one firework in the ultimate array
    if (ultArray.length != 0) {
        // Select i firework array
        for (let i = 0; i < ultArray.length; i++) {
            // Select j tail within i firework array
            for (let j = 0; j < paths; j++) {
                ultArray[i][j].display();
                ultArray[i][j].update();
            }
        }
    }
    // Remove fireworks that are not visible on the canvas from the ultimate array
    removeOldFireworkData();
}
// When the mouse is released then create one firework instance
function mouseReleased() {
    createFirework();
    screenPrompt = false; 
}
// Create one unique instance of a firework
function createFirework() {
    tail = [];
    let rai = 0; let randCol1 = random(0, 255);
    let randCol2 = random(0, 255);
    let randCol3 = random(0, 255);
    for (let i = 0; i < paths; i++) {
        rai = rai + (360 / paths) * Math.PI / 180;
        let vect = createVector(mouseX, mouseY);
        let off = createVector(random(-500, 500), random(-500, 500));
        let diameter = random(3, 7);
        let color = [randCol1, randCol2, randCol3];
        let opac = 255;
        let grav = random(1, 1.5);
        // coordinates(vector), offset, diameter, color, opacity, move, ease, radii, gravity
        tail.push(new Shape(vect, off, diameter, color, opac, 0, 0.01, rai, grav));
    }
    ultArray.push(tail);
}
// Clear ultArray of any non-visible fireworks
function removeOldFireworkData() {
    tempArray = [];
    for (let i = 0; i < ultArray.length; i++) {
        if (ultArray[i][1].o >= -50) {
            tempArray.push(ultArray[i]);
        }
    }
    // reassign array from temp
    ultArray = tempArray;
    //console.log(ultArray.length);
}


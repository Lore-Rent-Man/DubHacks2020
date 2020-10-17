/* global createCanvas, colorMode, HSB, width, height, random, background, fill, noFill, color, random,
          rect, circle, ellipse, stroke, image, loadImage, frameRate, collideRectRect, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop */

          let backgroundColor, player, trap1, score;
          function setup() {
            // Canvas & color settings
            createCanvas(400, 400);
            colorMode(HSB, 360, 100, 100);
            backgroundColor = 95;
            frameRate(12);
            player = new Player();
            trap1 = new Trap();
            score = 0;
          }
          
          function draw() {
            background(backgroundColor);
            // The player performs the following four methods:
            player.moveSelf();
            player.showSelf();
            player.checkTraps();
            // The trap needs fewer methods to show up on screen.
            trap1.showSelf();
            // We put the score in its own function for readability.
            displayScore();
          }
          
          function displayScore() {
            fill(0);
            text(`Score: ${score}`, 20, 20);
          }
          
          class Player {
            constructor() {
              this.size = 10;
              this.x = width / 2;
              this.y = height - 10;
              this.direction = "N";
              this.speed = 5;
            }
          
            moveSelf() {
              if (this.direction === "N") {
                this.y -= this.speed;
              } else if (this.direction === "S") {
                this.y += this.speed;
              } else if (this.direction === "E") {
                this.x += this.speed;
              } else if (this.direction === "W") {
                this.x -= this.speed;
              } else {
                console.log("Error: invalid direction");
              }
            }
          
            showSelf() {
              stroke(240, 100, 100);
              fill(0);
              rect(this.x, this.y, this.size, this.size);
              noStroke();
            }
          
            checkTraps() {
              // If the player fail in the trap...
              if (
                collideRectCircle(
                  this.x,
                  this.y,
                  this.size,
                  this.size,
                  trap1.x,
                  trap1.y,
                  (trap1.size/2)
                )
              ) {
                // the player died
                this.speed = 0;
              }
            }
          }
          
          
          class Trap {
            constructor() {
              this.size = 20;
              this.x = random(10, width - 10);
              this.y = random(10, height - 10);
            }
          
            showSelf() {
              stroke(240, 100, 100);
              noFill();
              circle(this.x, this.y, this.size);
              noStroke();
            }
          }
          
          function keyPressed() {
            console.log("key pressed: ", keyCode);
            if (keyCode === UP_ARROW && player.direction != "S") {
              player.direction = "N";
            } else if (keyCode === DOWN_ARROW && player.direction != "N") {
              player.direction = "S";
            } else if (keyCode === RIGHT_ARROW && player.direction != "W") {
              player.direction = "E";
            } else if (keyCode === LEFT_ARROW && player.direction != "E") {
              player.direction = "W";
            } else {
              console.log("wrong key");
            }
          }
          
          
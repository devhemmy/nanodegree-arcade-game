// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    //The enemy intial location
    this.x =Math.floor((Math.random() * -100) + -300);
    this.y = 60;
    //the enemy in tial speed
    this.speed = Math.floor((Math.random() * 300) + 100);


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;

    // chosing a random location and a random speed for an enemy
    if (this.x > 505) {
      this.x = Math.floor((Math.random() * -100) + -300);
      this.speed = Math.floor((Math.random() * 500) + 200);
    }

    // the collosion makes a played get back to his intial location and i also made to for the winning event
    if ( (player.x - 80 )< this.x && ( player.x +80 ) > this.x && player.y == this.y ){
      player.y = 300;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// the player object
var player = function(){

  //the intial properties for a player

  this.sprite = 'images/char-boy.png';
  this.x = 300;
  this.y = 300;

};

//the update method kinda doing nothing the rest handles most of the job

//the render method to draw the player
player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// the handleInput method to make him move and not allow him to move off screen

player.prototype.handleInput = function(code){
  if (code == "left" && this.x > 0  ){
    this.x -=100 ;
  }
  if (code == "right" && this.x < 400 ){
    this.x +=100 ;
  }
  if (code == "up" && this.y  > 0){
    this.y -=80 ;
  }
  if (code == "down" && this.y < 380 ){
    this.y +=80 ;
  }
}

// the girls object

var girl = function (){
  //intial properties for the girl object like the player
  this.sprite = 'images/char-princess-girl.png';
  this.x = 200 ;
  this.y = -20 ;
}

//the update method for the girls objects handles the winning event when then player reachs the princess
girl.prototype.update = function(dt){
  if (this.x == player.x && this.y == player.y){
    this.y = 300;
    this.x = 200;
    player.y =300;
    player.x = 300;
    //display the Congratulation msg
    ul.style.display = "block"
  }

}

//the render method for the girls objects
girl.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// the objects.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var player = new player();
var girl = new girl();

 // the intial location for all of  the enemies
enemy1.y = 60;
enemy2.y = 140;
enemy3.y = 220;

// all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3];
// the player and the girl objects in a variable called player and girl
var player = player;
var girl = girl;


// the play again button
function reset() {
  girl.x = 200 ;
  girl.y = -20 ;
}

const button = document.querySelector("button");
const ul = document.querySelector("ul");

button.addEventListener("click",function(){
  //remove the Congratulation msg to play again
  ul.style.display = "none"
  reset();
})

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// size of canvas
var WIDTH = 505;
var HEIGHT = 606;

// size of each block
var BLOCK_WIDTH = 101;
var BLOCK_HEIGHT = 83;

// initial position of the player
var PLAYER_X = BLOCK_WIDTH * 2;
var PLAYER_Y = BLOCK_HEIGHT * 5;

// enemys' offset on y-axis for them to stay middle vertically with a block
var ENEMY_Y_OFFSET = - 20;

// Enemies our currentPlayer must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // initialize position of a Enemy
    // x: set the Enemy to be out of the canvas
    // y: set the Enemy to be in a random row of 3 stone rows
    this.x = - BLOCK_WIDTH - WIDTH * Math.random()/ 2;
    this.y = ENEMY_Y_OFFSET + BLOCK_HEIGHT * (Math.floor(3 * Math.random()) + 2);

    // set speed for a Enemy within [30, 70)
    this.speed = 250 + 300 * (Math.random() - 0.5);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if the bug crawls out of canvas, innitialize its position and speed again
    if (this.x > WIDTH) {
        Enemy.call(this);
    }
    else {
        this.x += this.speed * dt;
    }

    // check collipse
    // width of the player is 20px shorter than BLOCK_WIDTH
    if ( Math.abs(this.x - currentPlayer.x) < BLOCK_WIDTH - 20 &&
        Math.abs(this.y - currentPlayer.y) < BLOCK_HEIGHT + ENEMY_Y_OFFSET) {
        // Player.call(Player);
        currentPlayer.x = PLAYER_X;
        currentPlayer.y = PLAYER_Y;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(char) {
    // set sprite for the Player according to its character set
    this.sprite = 'images/char-' + char + '.png';

    // initialize position of the Player
    this.x = PLAYER_X;
    this.y = PLAYER_Y;

    // move values for updating the position, acquired in .handleInput()
    this.xMove = 0;
    this.yMove = 0;
}

// Update the currentPlayer's position
Player.prototype.update = function() {
    this.x += this.xMove;
    this.y += this.yMove;

    // reset move values
    this.xMove = 0;
    this.yMove = 0;
}

// Draw the player(s) on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// set move values according to user's keyboard input
// check if the input counts for a move according to currentPlayer's position
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (currentPlayer.x > 0) {
                this.xMove = - BLOCK_WIDTH;
            }
            break;
        case 'up':
            if (currentPlayer.y > 0) {
                this.yMove = - BLOCK_HEIGHT;
            }
            break;
        case 'right':
            if (currentPlayer.x < BLOCK_WIDTH *4) {
                this.xMove = BLOCK_WIDTH;
            }
            break;
        case 'down':
            if (currentPlayer.y < BLOCK_HEIGHT *5) {
                this.yMove = BLOCK_HEIGHT;
            }
            break;
        default:
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place all player object in an array called allPlayers
// Initialize the currentPlayer object to be the first in allPlayers array
var allEnemies = [new Enemy, new Enemy, new Enemy, new Enemy];
var allPlayers = [new Player('boy'), new Player('pink-girl'), new Player('cat-girl'),
                  new Player('horn-girl'), new Player('princess-girl')];
var currentPlayer = allPlayers[0];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    currentPlayer.handleInput(allowedKeys[e.keyCode]);
});

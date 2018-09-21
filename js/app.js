// Enemies our player must avoid
class Enemy {
    constructor(sprite, x, y, speed){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        if(this.x >= 505) this.x = -101;
        this.x = this.x + 0.3 * this.speed * dt;
        
        // Axis-aligned rectangle collision detection from: 
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if ( this.x < (player.x + 72)  && 
            (this.x + 101) > player.x     &&
             this.y < (player.y + 82) && 
            (this.y + 77) > player.y) {
            // The objects are touching
            console.log("collision!")
        }
    }

    render() {
        // console.log(Resources.get(this.sprite));
        // console.log(this.x, this.y)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};
class Player extends Enemy {
    constructor(sprite, x, y){
        super(sprite, x, y);
    }

    update(){
        this.x > 432  ? this.x = 432 :
        this.y > 470  ? this.y = 470 :
        this.x < 0    ? this.x = 0 :
        this.y < 65   ? this.y = 65 :
        null
    }

    handleInput(keyPressed){
        keyPressed === 'left'  ? this.x -= 50.5 :
        keyPressed === 'right' ? this.x += 50.5 :
        keyPressed === 'up'    ? this.y -= 42 :
        keyPressed === 'down'  ? this.y += 42 : 
        null
    }
}

function makeEnemies(num){
    const enemiesArray = [];
    for(let i = 0; i < num;  i++){
        let y = Math.floor(Math.random() * (315 - 142) + 142);
        let speed = Math.floor(Math.random() * (1500 - 1) + 1);
        enemiesArray[i]  = new Enemy('images/enemy-bug2.png', 0, y, speed);
    }
    return enemiesArray;
}
const allEnemies = makeEnemies(5);

const player = new Player('images/char-boy2.png', (252-36), 475);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(allowedKeys[e.keyCode])
    player.handleInput(allowedKeys[e.keyCode]);
});

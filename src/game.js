let game;
window.onload = function() {

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update

    }
};
game = new Phaser.Game(config);
window.focus();
resize();
window.addEventListener("resize", resize, false);
}


// class stars extends Phaser.Scene{
//     constructor(){
//         super("stars");
//     }

 function preload() {
    this.load.image('sky', '../src/assets/sky.png');
    this.load.image('ground', '../src/assets/platform.png');
    this.load.image('star', '../src/assets/star.png');
    this.load.image('bomb', '../src/assets/bomb.png');
    this.load.spritesheet('dude',
        '../src/assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        })
}

function create() {
    this.add.image(400, 300, 'sky');

    this.input.keyboard.on('keyup',function(e){
        if(e.key=='2'){
            this.scene.start("PlayGame")
        }
    },this)

    // SCENE

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    
    // MOVEMENT
    player = this.physics.add.sprite(100, 0, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(500)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });
    
    // OBJECTS

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    var score = 0;
var scoreText;
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
        if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
    }

    bombs = this.physics.add.group();

this.physics.add.collider(bombs, platforms);

this.physics.add.collider(player, bombs, hitBomb, null, this);
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
}


function update() {
    cursors = this.input.keyboard.createCursorKeys();


    if (cursors.left.isDown || this.key_A.isDown) 
    {
        player.setVelocityX(-200);
    
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || this.key_D.isDown) 
    {
        player.setVelocityX(200);
    
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
    
        player.anims.play('turn');
    }
    
     const jumped = Phaser.Input.Keyboard.JustDown(cursors.up);
     const jumpedW = Phaser.Input.Keyboard.JustDown(this.key_W);

  
     if (jumped || jumpedW) {
        if (player.body.touching.down) {
          this.canJump = true;
          player.setVelocityY(-380);
        } else if (this.canJump) {
          this.canJump = false;
          player.setVelocityY(-380);
        }
      }


        

}
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

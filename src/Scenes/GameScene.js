import "phaser";
import config from "../Config/config";

let platforms, stars, bombs, player, cursors;
let created = true
let gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [150, 150],
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [90, 300],

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],
};
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
    
  }
  preload() {
    
    this.load.image("sky", "../src/assets/sky.png");
    this.load.image("ground", "../src/assets/platform.png");
    this.load.image("platform", "../src/assets/plattexture.png");
    this.load.image("star", "../src/assets/star.png");
    this.load.image("bomb", "../src/assets/bomb.png");
    this.load.spritesheet("dude", "../src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.resize()

  }
  create() {
    this.add.image(config.width / 2, config.height / 2, "sky");
    this.addedPlatforms = 0;

    platforms = this.physics.add.staticGroup();

     // group with all active platforms.
     this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback: function(platform1){
          platform1.scene.platformPool.add(platform1)
      }
  });

  // platform pool
  this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function(platform1){
          platform1.scene.platformGroup.add(platform1)
      }
  });

  this.addPlatform(game.config.width/3, game.config.width / 2, game.config.height*2/3);
  this.addPlatform(game.config.width/2, game.config.width, game.config.height*1/3);


    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    // platforms.create(600, 400, "ground");
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(0, game.config.height-220, "dude");

    player.setBounce(0.1);

    // player.setCollideWorldBounds(true);
    // player.checkCollision = { up: true, down: true, left: false, right: false };
    //  this.game.world.setBounds(0, 0, 1920, 1920); 
    player.body.setGravityY(500);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, this.platformGroup);
  
    // var cam2 = this.cameras.add(400, 0, 400, 300);
    // cam2.startFollow(clown, player, 0.5, 0.5);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "dude",
          frame: 4,
        },
      ],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform1;

    
    if (this.platformPool.getLength()) {
      
      platform1 = this.platformPool.getFirst();
      platform1.x = posX;
      platform1.y = posY;
      platform1.active = true;
      platform1.visible = true;
      this.platformPool.remove(platform1);
      let newRatio = platformWidth / platform1.displayWidth;
      platform1.displayWidth = platformWidth;
      platform1.tileScaleX = 1 / platform1.scaleX;
      console.log("AA")
    } else {
      console.log("BB")

      platform1 = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
      this.physics.add.existing(platform1);
      platform1.body.setImmovable(true);
      platform1.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1]
        ) * -1
      );
      platform1.setDepth(2);
      this.platformGroup.add(platform1);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );

  }

  update() {
    cursors = this.input.keyboard.createCursorKeys();
    const jumped = Phaser.Input.Keyboard.JustDown(cursors.up);
    const jumpedW = Phaser.Input.Keyboard.JustDown(this.key_W);
    
    if (cursors.left.isDown || this.key_A.isDown) {
      player.setVelocityX(-200);
      
      player.anims.play("left", true);
    } else if (cursors.right.isDown || this.key_D.isDown) {
      player.setVelocityX(200);
      
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      
      player.anims.play("turn");
    }
    if (jumped || jumpedW) {
      if (player.body.touching.down) {
        this.canJump = true;
        player.setVelocityY(-380);
      } else if (this.canJump) {
        this.canJump = false;
        player.setVelocityY(-380);
      }
    }


    let minDistance = game.config.width;
    // let rightmostPlatformHeight = 0;
    
    this.platformGroup.getChildren().forEach(function(platform){
      let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
      let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      
      if(platform.x - platform.displayWidth / 2 < 0 && created){
        created = false
        this.addPlatform(nextPlatformWidth,game.config.width+nextPlatformWidth/2,platform.y)
      }
      if(platform.x + platform.displayWidth / 2 < 0 ){
        created = true
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }

    }, this);
    if(player.x <0){
      player.x = game.config.width
    }else if (player.x >=game.config.width) {
      player.x = 0;

    }
    
  }
  
  resize(){
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

}

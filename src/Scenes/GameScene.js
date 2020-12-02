import "phaser";
import config from "../Config/config";

let platforms, stars, bombs, player, cursors;

let gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [300, 300],
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [90, 300],

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

    platforms = this.physics.add.staticGroup();

     // group with all active platforms.
     this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback: function(platform){
          platform.scene.platformPool.add(platform)
      }
  });

  // platform pool
  this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function(platform){
          platform.scene.platformGroup.add(platform)
      }
  });

  this.addPlatform(0,0,0)


    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 0, "dude");

    player.setBounce(0.1);

    player.setCollideWorldBounds(true);
    player.body.setGravityY(500);
    this.physics.add.collider(player, platforms);

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
    // this.addedPlatforms++;
    // let platform;
    // if (this.platformPool.getLength()) {
    //   platform = this.platformPool.getFirst();
    //   platform.x = posX;
    //   platform.y = posY;
    //   platform.active = true;
    //   platform.visible = true;
    //   this.platformPool.remove(platform);
    //   let newRatio = platformWidth / platform.displayWidth;
    //   platform.displayWidth = platformWidth;
    //   platform.tileScaleX = 1 / platform.scaleX;
    // } else {
    //   platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
    //   this.physics.add.existing(platform);
    //   platform.body.setImmovable(true);
    //   platform.body.setVelocityX(
    //     Phaser.Math.Between(
    //       gameOptions.platformSpeedRange[0],
    //       gameOptions.platformSpeedRange[1]
    //     ) * -1
    //   );
    //   platform.setDepth(2);
    //   this.platformGroup.add(platform);
    // }
    // this.nextPlatformDistance = Phaser.Math.Between(
    //   gameOptions.spawnRange[0],
    //   gameOptions.spawnRange[1]
    // );
    console.log('aaa')

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

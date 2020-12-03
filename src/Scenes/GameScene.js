import "phaser";
import { Game } from "phaser";
import config from "../Config/config";
import Player from '../Entities/Player';

let platforms, stars, bombs, cursors;
let created = true;
let create2 = true;
let gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [150, 300],
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 200],

  // platform width range, in pixels
  platformSizeRange: [90, 180],

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

    this.resize1();
  }
  create() {

    
    this.add.image(config.width / 2, config.height / 2, "sky");
    this.addedPlatforms = 0;

    platforms = this.physics.add.staticGroup();
console.log(this.anims)
    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform1) {
        platform1.scene.platformPool.add(platform1);
      },
    });

    // platform pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform1) {
        platform1.scene.platformGroup.add(platform1);
      },
    });

    this.addPlatform(
      game.config.width / 3,
      game.config.width / 2,
      (game.config.height * 2) / 3
    );
    this.addPlatform(
      game.config.width / 2,
      game.config.width,
      (game.config.height * 1) / 3
    );

    platforms
      .create(400, game.config.height, "ground")
      .setScale(2)
      .refreshBody();

    // player = this.physics.add.sprite(game.config.width/2, game.config.height-120, "dude");
    this.player = new Player(
      this,
      game.config.width / 2,
      game.config.height - 120,
      "dude"
    );
    
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, this.platformGroup);

    // .cameras.main.setBounds(0, 0, 4000, 4000);

    
    // this.physics.world.bounds.height=6000
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
    } else {
      platform1 = this.add.tileSprite(
        posX,
        posY,
        platformWidth,
        32,
        "platform"
      );
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
    this.player.movements();

    let minDistance = game.config.width;
    // let rightmostPlatformHeight = 0;
    let nextPlatformWidth = Phaser.Math.Between(
      gameOptions.platformSizeRange[0],
      gameOptions.platformSizeRange[1]
    );

    this.platformGroup.getChildren().forEach(function (platform) {
      if (platform.x - platform.displayWidth / 2 < 0 && created) {
        created = false;
        this.addPlatform(
          nextPlatformWidth,
          game.config.width + nextPlatformWidth / 2,
          platform.y
        );
      }
      if (platform.x + platform.displayWidth / 2 < 0) {
        created = true;
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);
    if (this.player.x < 0) {
      this.player.x = game.config.width;
    } else if (this.player.x >= game.config.width) {
      this.player.x = 0;
    }
    if (this.player.y < game.config.height / 3 && create2) {
      this.addPlatform(
        nextPlatformWidth,
        game.config.width + nextPlatformWidth / 2,
        this.player.y
      );
      create2 = false;
    }
    this.cameras.main.centerOn(
      game.config.width / 2,
      this.player.y - this.game.config.height / 6
    );
  }

  resize1() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + "px";
      canvas.style.height = windowWidth / gameRatio + "px";
    } else {
      canvas.style.width = windowHeight * gameRatio + "px";
      canvas.style.height = windowHeight + "px";
    }
  }
}

import "phaser";
import { Game } from "phaser";
import config from "../Config/config";
import Player from '../Entities/Player';
import Platform from '../Entities/Platform';

let ground, stars, bombs, cursors;

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
    this.load.spritesheet("dude", "../src/assets/toast.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    // this.resize();
  }
  create() {

    // this.add.image(config.width / 2, config.height / 2, "sky");
    // console.log(this)
    this.bg_1 = this.add.tileSprite(0, 0, config.width , config.height, 'sky');
    this.bg_1.setOrigin(0)
    this.bg_1.setScrollFactor(0)
    console.log(this.bg_1)

    this.player = new Player(
      this,
      game.config.width / 2,
      game.config.height - 120,
      "dude"
    );

    this.player.setScale(2);

    this.platforms = new Platform(
      this,
      game.config.width / 2,
      game.config.height/2,
      "platform"
    );

    ground = this.physics.add.staticGroup();

    ground
      .create(400, game.config.height, "ground")
      .setScale(2)
      .refreshBody();    
    
    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.player, this.platformGroup);
  }

  update() {
  
    this.resize()
    this.player.movements();
    this.player.update();
    this.platforms.update();
    this.bg_1.tilePositionY=this.scrollY*.3


  }

  resize() {
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

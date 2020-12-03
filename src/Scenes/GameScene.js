import "phaser";
import { Game } from "phaser";
import config from "../Config/config";
import Player from '../Entities/Player';
import Platform from '../Entities/Platform';


let platforms1, stars, bombs, cursors;
let create2 = true;

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

    this.player = new Player(
      this,
      game.config.width / 2,
      game.config.height - 120,
      "dude"
    );

    this.platforms = new Platform(
      this,
      game.config.width / 2,
      game.config.height/2,
      "platform"
    );
    platforms1 = this.physics.add.staticGroup();

    // group with all active platforms.
    
    this.platforms.addPlatform(
      game.config.width / 3,
      game.config.width / 2,
      (game.config.height * 2) / 3
    );
    this.platforms.addPlatform(
      game.config.width / 2,
      game.config.width,
      (game.config.height * 1) / 3
    );

    platforms1
      .create(400, game.config.height, "ground")
      .setScale(2)
      .refreshBody();    
    
    this.physics.add.collider(this.player, platforms1);
    this.physics.add.collider(this.player, this.platformGroup);
  }

  update() {
    this.player.movements();
    this.platforms.update();

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

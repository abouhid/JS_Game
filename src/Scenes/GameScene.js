import "phaser";
import { Game } from "phaser";
import config from "../Config/config";
import Player from '../Entities/Player';
import Platform from '../Entities/Platform';
import Item from '../Entities/Item';

let ground;
let player;
let CoinLayer;
let coins,coin;
let text;

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

  }
  create() {

    this.bg_1 = this.add.tileSprite(0, 0, config.width , config.height, 'sky');
    this.bg_1.setOrigin(0)
    this.bg_1.setScrollFactor(0)

    this.player = new Player(
      this,
      game.config.width / 2,
      game.config.height - 120,
      "dude"
    );

    this.platforms = new Platform(
      this,
      0,
      2000,
      "platform"
    );

    
    this.item = new Item(
      this,
      300,
      300,
      "star"
    );
    // this.item2 = new Item(
    //   this,
    //   300,
    //   300,
    //   "star"
    // );
    
    ground = this.physics.add.staticGroup();

    ground
      .create(400, game.config.height, "ground")
      .setScale(4)
      .refreshBody();    

  

      
    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.collider(this.item.coins, ground);
    this.physics.add.collider(this.item.coins, this.platformGroup);

    this.physics.add.overlap(this.player, this.item.coins, this.item.collectCoin, null, this);
    
  }

  update() {
  
    this.resize()
    this.player.movements();
    this.player.update();
    this.item.update();
    this.bg_1.tilePositionY=this.scrollY

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

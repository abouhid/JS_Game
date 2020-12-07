import Phaser from 'phaser';

import config from '../Config/config';
import Player from '../Entities/Player';
import Platform from '../Entities/Platform';
import Item from '../Entities/Item';
import Enemy from '../Entities/Enemy';

let ground;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('sky', '../src/assets/bg.png');
    this.load.image('ground', '../src/assets/platform.png');
    this.load.image('platform', '../src/assets/plattexture.png');

    this.load.spritesheet('coin', '../src/assets/coin.png', {
      frameWidth: 40,
      frameHeight: 44,
      startFrame: 0,
      endFrame: 3
    });
    this.load.spritesheet('orbs', '../src/assets/orbs.png', {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 5,
      endFrame: 9
    });
    this.load.spritesheet('explosion', '../src/assets/explosion3.png', {
      frameWidth: 90,
      frameHeight: 90,
      startFrame: 0,
      endFrame: 9
    });
    this.load.image('star', '../src/assets/star.png');
    this.load.image('heart', '../src/assets/food.png');

    this.load.image('bomb', '../src/assets/bomb.png');
    this.load.spritesheet('dude', '../src/assets/chicken.png', {
      frameWidth: 32,
      frameHeight: 32,

    });
  }

  create() {
    this.bg_1 = this.add.tileSprite(0, 0, config.width, config.height, 'sky');
    this.bg_1.setOrigin(0);
    this.bg_1.setScrollFactor(0);

    this.player = new Player(this, game.config.width / 2, game.config.height - 120, 'dude');

    this.player.setScale(2);

    this.platforms = new Platform(this, 0, 2000, 'platform');
    this.item = new Item(this, 0, 2000, 'star');
    this.enemy = new Enemy(this, 0, 2000, 'bomb');

    this.numEnemies = 0;

    ground = this.physics.add.staticGroup();
    ground.create(400, game.config.height, 'ground').setScale(4).refreshBody();

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.collider(this.item.coins, ground);
    this.physics.add.collider(this.item.coins, this.platformGroup);

    this.coinScore = 0;

    this.score = this.add.text(630, 50, `Coins: ${this.coinScore}`, {
      fontSize: '20px',
      fill: '#ffffff',
    });
    this.health = this.add.text(50, 50, `Health: ${this.player.health}`, {
      fontSize: '20px',
      fill: '#ffffff',
    });

    this.score.setScrollFactor(0);
    this.health.setScrollFactor(0);

    this.physics.add.overlap(this.player, this.item.orbs, this.collectOrb, null, this);
    this.physics.add.overlap(this.player, this.item.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.item.hearts, this.collectHeart, null, this);

    this.physics.add.overlap(this.player, this.enemy.baddies, this.hit, null, this);      

  }

  collectOrb(player, orb) {
    this.player.body.setVelocityY(-380);
    orb.destroy(orb.x, orb.y);
    this.player.canJump = true;
  }

  collectCoin(player, coin) {
    coin.destroy(coin.x, coin.y);
    this.coinScore++;

    this.numEnemies++
    this.score.setText(`Coins: ${this.coinScore}`);

    // console.log(this.item.coins.children.entries.length)
    if (this.item.coins.children.entries.length===0) {
      this.enemy.createEnemy()
      this.item.createOrb()
      this.item.createCoin()
      this.item.createHeart()

    }

  }
  
  collectHeart(player, heart) {
    this.cameras.main.flash();
    this.player.health += 20;
    heart.destroy(heart.x, heart.y);
    this.health.setText(`Health: ${this.player.health}`);

  }

  hit(player, baddie) {
    this.player.body.setVelocityY(380);
    this.cameras.main.flash();
    this.player.health -= 150;
    baddie.destroy(baddie.x, baddie.y);

    this.health.setText(`Health: ${this.player.health}`);
    if (this.player.health <= 0) {
      this.cameras.main.once('camerafadeincomplete', (camera) => {
        camera.fadeOut(4000);
      });
      this.player.setTint(0xff0000);
      this.player.anims.play('turn');
      this.physics.pause();
      this.input.disabled = true;
      this.cameras.main.fadeOut(1000);

     const self = this;

      this.time.addEvent({
        delay: 1500,
        callback() {
          self.gameOver();
        },
      });
    }
  }

  update() {
    this.resize();
    this.player.movements();
    this.player.update();
    this.enemy.update();
    this.item.update();
    this.bg_1.tilePositionY = this.scrollY;
  }

  gameOver() {
    this.scene.start('GameOver');
  }

  resize() {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      canvas.style.width = `${windowHeight * gameRatio}px`;
      canvas.style.height = `${windowHeight}px`;
    }
  }
}

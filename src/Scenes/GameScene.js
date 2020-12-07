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
    this.load.image('sky', '../src/assets/farm.jpg');
    this.load.image('ground', '../src/assets/platform.png');
    this.load.image('platform', '../src/assets/plattexture.png');

    this.load.spritesheet('coin', '../src/assets/coin.png', {
      frameWidth: 40,
      frameHeight: 44,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet('orbs', '../src/assets/orbs.png', {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 5,
      endFrame: 9,
    });
    this.load.spritesheet('chick', '../src/assets/chick.png', {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.image('star', '../src/assets/star.png');
    this.load.image('food', '../src/assets/food.png');
    this.load.image('egg', '../src/assets/egg.png');

    this.load.spritesheet('dude', '../src/assets/chicken.png', {
      frameWidth: 32,
      frameHeight: 32,

    });
  }

  create() {
    this.bg_1 = this.add.image(-100, -100, 'sky')
    this.bg_1.setScale(2)
    this.bg_1.setOrigin(0);
    this.bg_1.setScrollFactor(0);

    this.player = new Player(this, game.config.width / 2, game.config.height - 120, 'dude');

    this.player.setScale(2);

    this.platforms = new Platform(this, 0, 2000, 'platform');
    this.item = new Item(this, 0, 2000, 'star');
    this.enemy = new Enemy(this, 0, 2000, 'chick');

    this.numEnemies = 0;
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.collider(this.item.coins, this.ground);
    this.physics.add.collider(this.item.coins, this.platformGroup);

    this.coinScore = 0;

    this.score = this.add.text(630, 50, `Coins: ${this.coinScore}`, {
      fontSize: '20px',
      fill: 'black',
    });
    this.health = this.add.text(50, 50, `Health: ${this.player.health}`, {
      fontSize: '20px',
      fill: 'black',
    });

    this.score.setScrollFactor(0);
    this.health.setScrollFactor(0);

    this.physics.add.overlap(this.player, this.item.orbs, this.collectOrb, null, this);
    this.physics.add.overlap(this.player, this.item.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.item.foods, this.collectFood, null, this);

    this.physics.add.overlap(this.player, this.enemy.baddies, this.hit, null, this);
    this.enemy.createEnemy();
  }

  collectOrb(player, orb) {
    this.player.body.setVelocityY(-380);
    orb.destroy(orb.x, orb.y);
    this.player.canJump = true;
  }

  collectCoin(player, coin) {
    coin.destroy(coin.x, coin.y);
    this.coinScore++;

    this.numEnemies++;
    this.score.setText(`Coins: ${this.coinScore}`);

    if (this.item.coins.children.entries.length === 0) {
      this.enemy.createEnemy();
      this.item.createOrb();
      this.item.createCoin();
      this.item.createFood();
    }
  }

  collectFood(player, food) {
    this.cameras.main.flash();
    this.player.health += 20;
    food.destroy(food.x, food.y);
    this.health.setText(`Health: ${this.player.health}`);
  }

  hit(player, baddie) {
    this.player.body.setVelocityY(380);
    this.cameras.main.flash();
    this.player.health -= 40;
    baddie.destroy(baddie.x, baddie.y);

    this.health.setText(`Health: ${this.player.health}`);

    if (this.player.health <= 0) {
      this.gameOver();
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
        self.scene.start('GameOver');
      },
    });
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

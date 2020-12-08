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

  create() {
    this.bg_1 = this.add.image(-100, -100, 'sky').setScale(0.5).setOrigin(0).setScrollFactor(0);
    this.player = new Player(this, game.config.width / 2, game.config.height - 120, 'dude').setScale(2);

    this.platforms = new Platform(this, 0, 2000, 'platform');
    this.item = new Item(this, 0, 2000, 'star');
    this.enemy = new Enemy(this, 0, 2000, 'raffa');

    this.numEnemies = 0;
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.collider(this.item.bananas, this.ground);
    this.physics.add.collider(this.item.bananas, this.platformGroup);
   

    this.bananaScore = 0;

    this.score = this.add.text(630, 50, `Bananas: ${this.bananaScore}`, {
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
    this.physics.add.overlap(this.player, this.item.bananas, this.collectBanana, null, this);
    this.physics.add.overlap(this.player, this.item.foods, this.collectFood, null, this);

    this.physics.add.overlap(this.player, this.enemy.baddies, this.hit, null, this);
    this.enemy.createEnemy();
  }

  collectOrb(player, orb) {
    this.player.body.setVelocityY(-380);
    orb.destroy(orb.x, orb.y);
    this.player.canJump = true;
  }

  collectBanana(player, banana) {
    banana.destroy(banana.x, banana.y);
    this.bananaScore++;

    this.numEnemies++;
    this.score.setText(`Bananas: ${this.bananaScore}`);

    if (this.item.bananas.children.entries.length === 0) {
      this.enemy.createEnemy();
      this.item.createOrb();
      this.item.createBanana();
      this.item.createFood();
    }
  }

  collectFood(player, food) {
      this.player.health += 20;
    this.player.setTint(0x79D670)
    const self = this;

    this.time.addEvent({
      delay: 200,
      callback() {
        self.player.setTint(0xFFFFFF)
      },
    });
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

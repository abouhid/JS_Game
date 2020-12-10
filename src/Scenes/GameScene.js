import Phaser from 'phaser';

import Player from '../Entities/Player';
import Platform from '../Entities/Platform';
import Item from '../Entities/Item';
import Enemy from '../Entities/Enemy';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.game = window;
  }

  create() {
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 120, 'dude').setScale(2);

    this.platforms = new Platform(this, 0, 2000, 'platform');
    this.item = new Item(this, 0, 2000, 'star');
    this.enemy = new Enemy(this, 0, 2000, 'raffa');

    this.numEnemies = 0;
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platformGroup);
    this.physics.add.collider(this.item.bananas, this.ground);
    this.physics.add.collider(this.item.bananas, this.platformGroup);

    this.score = this.add.text(630, 50, `Bananas: ${this.sys.game.globals.bananaScore}`, {
      fontSize: '20px',
      fill: 'black',
    });
    this.health = this.add.text(50, 50, `Health: ${this.player.health}`, {
      fontSize: '20px',
      fill: 'black',
    });

    this.score.setScrollFactor(0);
    this.health.setScrollFactor(0);

    this.physics.add.overlap(this.player, this.item.pierogis, this.collectPierogi, null, this);
    this.physics.add.overlap(this.player, this.item.bananas, this.collectBanana, null, this);
    this.physics.add.overlap(this.player, this.item.foods, this.collectFood, null, this);

    this.physics.add.overlap(this.player, this.enemy.baddies, this.hit, null, this);
    this.enemy.createEnemy();
  }

  collectPierogi(player, pierogi) {
    this.player.body.setVelocityY(-380);
    pierogi.destroy(pierogi.x, pierogi.y);
    this.player.canJump = true;
  }

  collectBanana(player, banana) {
    banana.destroy(banana.x, banana.y);
    this.sys.game.globals.bananaScore += 10;

    this.numEnemies += 1;
    this.score.setText(`Bananas: ${this.sys.game.globals.bananaScore}`);

    if (this.item.bananas.children.entries.length === 0) {
      this.enemy.createEnemy();
      this.enemy.createEnemy();
      this.item.createPierogi();
      this.item.createBanana();
      this.item.createFood();
    }
  }

  collectFood(player, food) {
    this.player.health += 10;
    this.player.setTint(0x79D670);
    const self = this;

    this.time.addEvent({
      delay: 200,
      callback() {
        self.player.setTint(0xFFFFFF);
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
    this.sys.game.globals.bgMusic.stop();
    this.mariodeath = this.sound.add('mariodeath', { volume: 0.15, loop: false });
    this.mariodeath.play();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.physics.pause();
    this.input.disabled = true;
    this.cameras.main.fadeOut(2000);


    const self = this;

    this.time.addEvent({
      delay: 3500,
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
    const gameRatio = this.game.config.width / this.game.config.height;
    if (windowRatio < gameRatio) {
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      canvas.style.width = `${windowHeight * gameRatio}px`;
      canvas.style.height = `${windowHeight}px`;
    }
  }
}

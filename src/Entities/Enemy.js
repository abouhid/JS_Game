import Phaser from 'phaser';

import Entity from './Entity';

export default class Enemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'raffa');
    this.baddies = this.scene.physics.add.group();
    this.scene.anims.create({
      key: 'raffa',
      frames: this.scene.anims.generateFrameNumbers('raffa', { start: 21, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createEnemy() {
    const gameOptions = {
      intervalY: [(this.scene.game.config.height * (2 / 3)) - 1
        * (this.scene.game.config.height / 3) * (this.scene.numPlat),
      (this.scene.game.config.height * 1.8) / 3],
    };
    const velocity = 100;
    this.baddie = this.scene.add.sprite(this.scene.game.config.width,
      Phaser.Math.Between(gameOptions.intervalY[0], gameOptions.intervalY[1]), 'raffa');
    this.baddies.add(this.baddie);
    this.baddie.body.setVelocityX(-velocity);
    this.baddies.children.iterate(baddie => {
      baddie.play('raffa');
    });
  }

  update() {
    this.baddies.children.each((enemy) => {
      if (enemy.x < 0) {
        enemy.x = this.scene.game.config.width;
      }
    });
  }
}
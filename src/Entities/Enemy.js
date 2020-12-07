import Phaser from 'phaser';

import Entity from './Entity';

export default class Enemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'bomb');
    this.baddies = this.scene.physics.add.group();

  }

  createEnemy() {

    const gameOptions = {
      intervalX: [(game.config.width * 0.2), (game.config.width * 0.8)],
      intervalY: [(game.config.height * 2 / 3) - 1 * (game.config.height / 3) * (this.scene.numPlat), (game.config.height * 1.8) / 3],
      repeat: [-8, 2],
    };

      const velocity = 100;

      this.baddie = this.scene.add.sprite(Phaser.Math.Between(gameOptions.intervalX[0], gameOptions.intervalX[1]),
        Phaser.Math.Between(gameOptions.intervalY[0], gameOptions.intervalY[1]), 'bomb');
      this.baddies.add(this.baddie);
      this.baddie.body.setVelocityX(-velocity);
  }

    update() {
      this.baddies.children.each(function (enemy) {
        if (enemy.x < 0) {
          enemy.x = game.config.width
        }
      })
    }
  
}
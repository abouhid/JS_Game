import Phaser from 'phaser';

import Entity from './Entity';

export default class Item extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'item');


    const gameOptions = {
      intervalX: [(game.config.width * 0.2), (game.config.width * 0.8)],
      intervalY: [(game.config.height * 2 / 3) - 1 * (game.config.height / 3) * (this.scene.numPlat), (game.config.height * 1.8) / 3],
      repeat: [-8, 2],
    };

    this.body.setSize(28, 47);
    this.body.setGravityY(800);
    this.body.setBounceY(0.5);

    this.coins = this.scene.physics.add.group();
    this.stars = this.scene.physics.add.group();


    for (let i = 0; i < this.scene.numPlat; i++) {
      // console.log(this.scene.platformGroup.children.entries[i].y)

      this.coin = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 40, 'coin');
      this.star = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 40, 'star');
      this.coins.add(this.coin);
      this.coin.body.setSize(28, 47);
      this.coin.body.setGravityY(500);
      this.coin.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }

    for (let i = 0; i < this.scene.numPlat; i++) {
      this.coin = this.scene.add.sprite(Phaser.Math.Between(gameOptions.intervalX[0], gameOptions.intervalX[1]),
        Phaser.Math.Between(gameOptions.intervalY[0], gameOptions.intervalY[1]), 'dude');
      this.coins.add(this.coin);
    }
  }


  update() {
    if (this.x < 0) {
      this.x = game.config.width;
    } else if (this.x >= game.config.width) {
      this.x = 0;
    }
  }
}

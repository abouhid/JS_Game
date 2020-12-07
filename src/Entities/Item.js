import Phaser from 'phaser';

import Entity from './Entity';

export default class Item extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'item');
    this.scene.anims.create({
      key: 'rotate',
      frames: this.scene.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    this.coins = this.scene.physics.add.group();
    this.stars = this.scene.physics.add.group();
    this.hearts = this.scene.physics.add.group();

    this.createCoin()
    this.createStar()
    this.createHeart()
 
  }

  createStar() {
    const gameOptions = {
      intervalX: [(game.config.width * 0.2), (game.config.width * 0.8)],
      intervalY: [(game.config.height * 2 / 3) - 1 * (game.config.height / 3) * (this.scene.numPlat), (game.config.height * 1.8) / 3],
      repeat: [-8, 2],
    };
    for (let i = 0; i < this.scene.numPlat; i++) {
      // this.star = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 40, 'star');
      
      this.star = this.scene.add.sprite(Phaser.Math.Between(gameOptions.intervalX[0], gameOptions.intervalX[1]),
        Phaser.Math.Between(gameOptions.intervalY[0], gameOptions.intervalY[1]), 'star');
        this.stars.add(this.star);

      this.stars.add(this.star);
    }
  }

  createHeart() {
    this.heart = this.scene.add.sprite(300,300, 'heart');
    this.hearts.add(this.heart);

  }

  createCoin() {
    for (let i = 0; i < this.scene.numPlat; i++) {
      // console.log(this.scene.platformGroup.children.entries[i].y)

      this.coin = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 40, 'coin');
      this.coins.add(this.coin);

      this.coin.body.setSize(28, 47);
      this.coin.body.setGravityY(500);
      this.coin.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
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

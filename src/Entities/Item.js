import Phaser from 'phaser';

import Entity from './Entity';

export default class Item extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'item');
   
    this.scene.anims.create({
      key: 'spin',
      frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
  });
  this.scene.anims.create({
    key: 'orbs',
    frames: this.scene.anims.generateFrameNumbers('orbs', { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1
});
  
    this.coins = this.scene.physics.add.group();

  this.orbs = this.scene.physics.add.group();
  this.hearts = this.scene.physics.add.group();
  
    this.createCoin()
    for (let i = 0; i < this.scene.numPlat/2; i++) {
    this.createOrb()
    }
    this.createHeart()
    
 
  }

  createOrb() {
    const gameOptions = {
      intervalX: [(game.config.width * 0.2), (game.config.width * 0.8)],
      intervalY: [(game.config.height * 2 / 3) - 1 * (game.config.height / 3) * (this.scene.numPlat), (game.config.height * 1.8) / 3],
      repeat: [-8, 2],
    };
      // this.star = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 40, 'star');

      this.orb = this.scene.add.sprite(Phaser.Math.Between(gameOptions.intervalX[0], gameOptions.intervalX[1]),
        Phaser.Math.Between(gameOptions.intervalY[0], gameOptions.intervalY[1]), 'orbs');
      this.orbs.add(this.orb);
      this.orbs.children.iterate(coin => {
        coin.play('orbs')
        coin.setScale(1.5);
      })
    
  }

  createHeart() {
    this.heart = this.scene.add.sprite(300,300, 'heart');
    this.hearts.add(this.heart);

  }

  createCoin() {
    for (let i = 0; i < this.scene.numPlat; i++) {
      // console.log(this.scene.platformGroup.children.entries[i].y)

      this.coin = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 30, 'coin');
      this.coins.add(this.coin);
      this.coin.body.setSize(28, 47);
      this.coin.body.setGravityY(500);
      this.coin.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      this.coins.children.iterate(coin => {
        coin.play('spin')
        coin.setScale(0.7);
      })
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

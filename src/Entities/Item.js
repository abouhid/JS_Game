import Phaser from 'phaser';

import Entity from './Entity';

export default class Item extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'item');

    this.gameOptions = {
      intervalX: [(this.scene.game.config.width * 0.2), (this.scene.game.config.width * 0.8)],
      intervalY: [(this.scene.game.config.height * (2 / 3)) - 1
        * (this.scene.game.config.height / 3)
        * (this.scene.numPlat), (this.scene.game.config.height * 1.8) / 3],
    };

    this.scene.anims.create({
      key: 'drink',
      frames: this.scene.anims.generateFrameNumbers('drink', { start: 98, end: 98 }),
      frameRate: 5,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'spin',
      frames: this.scene.anims.generateFrameNumbers('banana', { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'orbs',
      frames: this.scene.anims.generateFrameNumbers('orbs', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.bananas = this.scene.physics.add.group();

    this.orbs = this.scene.physics.add.group();
    this.foods = this.scene.physics.add.group();

    this.createBanana();
    for (let i = 0; i < this.scene.numPlat / 2; i += 1) {
      this.createOrb();
    }
    this.createFood();
  }

  createOrb() {
    this.orb = this.scene.add.sprite(Phaser.Math.Between(this.gameOptions.intervalX[0],
      this.gameOptions.intervalX[1]),
    Phaser.Math.Between(this.gameOptions.intervalY[0], this.gameOptions.intervalY[1]), 'orbs');
    this.orbs.add(this.orb);
    this.orbs.children.iterate(orb => {
      orb.play('orbs');
    });
  }

  createFood() {
    const healthItem = ['beer', 'pizza', 'heart','drink'];
    this.food = this.scene.add.sprite(Phaser.Math.Between(this.gameOptions.intervalX[0],
      this.gameOptions.intervalX[1]),
    Phaser.Math.Between(this.gameOptions.intervalY[0], this.gameOptions.intervalY[1]),
    (healthItem[Math.floor(Math.random()*healthItem.length)]));
    console.log()
    if(this.food.texture.key === 'drink') {
    this.food.play('drink')
    }
    if(this.food.texture.key === 'beer') {
      this.food.setScale(2)
      }
    this.foods.add(this.food);
  }

  createBanana() {
    for (let i = 0; i < this.scene.numPlat; i += 1) {
      this.banana = this.scene.add.sprite(this.scene.platformGroup.children.entries[i].x,
        this.scene.platformGroup.children.entries[i].y - 30, 'banana');
      this.bananas.add(this.banana);
      this.banana.body.setSize(28, 47);
      this.banana.body.setGravityY(500);
      this.banana.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      this.bananas.children.iterate(banana => {
        banana.play('spin');
        banana.setScale(0.7);
      });
    }
  }

  update() {
    if (this.x < 0) {
      this.x = this.scene.game.config.width;
    } else if (this.x >= this.scene.game.config.width) {
      this.x = 0;
    }
  }
}

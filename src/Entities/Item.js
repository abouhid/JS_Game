import 'phaser';
import Entity from '../Entities/Entity';

export default class Item extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'item');

    let gameOptions = {
      interval : [ (game.config.height * 0.8) / 3, (game.config.height * 1.8) / 3],
      repeat:[-8,2]
    };
     
    this.scene.starGroup = this.scene.physics.add.group();
   
    this.body.setSize(28, 47);
    this.body.setGravityY(800);
    this.body.setBounceY(0.5);
  

    this.coins = this.scene.physics.add.group();
    console.log(this.scene.numPlat)
    for(let i=0;i<this.scene.numPlat;i++) {
      // console.log(this.scene.platformGroup.children.entries[i].y)

      this.coin = this.scene.add.sprite( this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 10, 'star');
      this.coins.add(this.coin)
      this.coin.body.setSize(28, 47);
      this.coin.body.setGravityY(500);
      // this.coin.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));    
    }

    for(let i=0;i<this.scene.numPlat;i++) {
      this.coin = this.scene.add.sprite( this.scene.platformGroup.children.entries[i].x, this.scene.platformGroup.children.entries[i].y - 10, 'star');
      this.coins.add(this.coin)
    }
    
  }
 

update() {

  if (this.x < 0) {
    this.x = game.config.width;
  } else if (this.x >= game.config.width) {
    this.x = 0;
  }
};
}




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
    this.scene.coinScore = 0;
    this.scene.score = this.scene.add.text(570, 70, `Coins: ${this.scene.coinScore}x`, {
      fontSize: '20px',
      fill: '#ffffff'
    });
    console.log(this.scene)

    this.scene.score.setScrollFactor(0);

    this.coins = this.scene.physics.add.group();
    this.coin = this.scene.add.sprite( game.config.width / 2, game.config.height - 170, 'star');
    this.coins.add(this.coin)
    this.coin.body.setSize(28, 47);
    this.coin.body.setGravityY(500);
    this.coin.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    console.log(this.scene.coinScore )

  }
  collectCoin(player, coin) {
    this.player.body.setVelocityY(-380);
     coin.destroy(coin.x, coin.y); // remove the tile/coin
     this.scene.coinScore ++; // increment the score
     console.log(this.scene.coinScore )

    //  this.scene.score.setText(`Coins: ${this.scene.coinScore}`); // set the text to show the current score
    // return false;
}

update() {

  if (this.x < 0) {
    this.x = game.config.width;
  } else if (this.x >= game.config.width) {
    this.x = 0;
  }
};
}




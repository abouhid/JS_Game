import Phaser from 'phaser';
import Button from '../Objects/Button';
import Player from '../Entities/Player';


export default class Instructions extends Phaser.Scene {
  constructor() {
    super('Instructions');
    this.game = window;
  }

  create() {
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    this.player = new Player(this, 50,100, 'dude').setScale(2);
    this.player.body.setGravityY(0);
    let banana = this.add.sprite(50,180, 'banana');
    let platform = this.add.sprite(50,240, 'platform');
    let pierogi = this.add.sprite(50, 290, 'pierogi').setScale(1.5);
    let beer = this.add.sprite(40, 335, 'beer');
    let heart = this.add.sprite(70, 335, 'heart');
    let pizza = this.add.sprite(70, 365, 'pizza');
    let drink = this.add.sprite(40, 365, 'drink');
    let raffa = this.add.sprite(55, 410, 'raffa');




    this.text1 = this.add.text(95, 80,
      'Twelve got lost in a polish farm while travelling around Europe \nand he needs your help to get back to his home country: Brazil!\n(Move around with W,A,S,D or arrows)', { fontSize: '18px', fill: 'black' });
    this.text2 = this.add.text(95, 160,
      'He needs to grab as many bananas as possible to trade for \nhis plane ticket to Rio (First Class, of course).', { fontSize: '18px', fill: 'black' });

    this.text3 = this.add.text(95,220,
      'There are 8 platforms in which each one have a banana, \nonce you get all 8 bananas, the other ones will be reset', { fontSize: '18px', fill: 'black' });
      this.text4 = this.add.text(95, 275,
        'Pierogis will push you up and give you and recharge your \nmidair jump', { fontSize: '18px', fill: 'black' });
  
      this.text5 = this.add.text(95, 330,
      'There are special items that will appear everytime you collect \nall bananas to heal you (yes, he likes drinking)', { fontSize: '18px', fill: 'black' });
    
      this.text6 = this.add.text(95, 390,
        'Watch out for Raffas, as they want to steal your \nbananas because they want to go to Brazil \nas well (-40 of health and push you down)', { fontSize: '18px', fill: 'black' });
  
    this.menuButton = new Button(this, 250, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.start = new Button(this, 500, 500, 'blueButton1', 'blueButton2', 'Start', 'Game');


    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('banana', { start: 6, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: 'food',
      frames: this.anims.generateFrameNumbers('pierogi', { start: 57, end: 57 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: 'drink',
      frames: this.anims.generateFrameNumbers('drink', { start: 98, end: 98 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: 'raffa',
      frames: this.anims.generateFrameNumbers('raffa', { start: 21, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
    banana.play('spin');
    raffa.play('raffa');
    pierogi.play('food');
    drink.play('drink');



  }

  update() {
    this.resize();
    this.player.movements()
    if (this.player.x < 0) {
      this.player.x = this.game.config.width;
    } else if (this.player.x  >= this.game.config.width) {
      this.player.x = 0;
    }
  }

  resize() {
    this.canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = this.game.config.width / this.game.config.height;
    if (windowRatio < gameRatio) {
      this.canvas.style.width = `${windowWidth}px`;
      this.canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      this.canvas.style.width = `${windowHeight * gameRatio}px`;
      this.canvas.style.height = `${windowHeight}px`;
    }
  }
}
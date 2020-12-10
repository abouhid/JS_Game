import Phaser from 'phaser';
import Button from '../Objects/Button';


export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
    this.game = window;
  }

  create() {
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);
    this.add.image(150, 500, 'frog').setScale(0.5);


    this.text1 = this.add.text(this.game.config.width / 9,
      this.game.config.height / 2 - 100,
      'Credits', { fontSize: '32px', fill: 'black' });
    this.text2 = this.add.text(this.game.config.width / 9,
      this.game.config.height / 2 - 50,
      'Created By: Alexandre Bouhid', { fontSize: '32px', fill: 'black' });

    this.check = this.add.text(this.game.config.width / 9, this.game.config.height / 2,
      'Check me up on: https://github.com/abouhid/', { fontSize: '26px', fill: 'black' });
      this.check = this.add.text(this.game.config.width / 9, this.game.config.height / 2 + 50,
     "I'd like to dedicate this game to my \nspecial friends from Wroclaw ❤️", { fontSize: '30px', fill: 'black' });


    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }

  update() {
    this.resize();
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
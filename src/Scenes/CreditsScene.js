import Phaser from 'phaser';
import Button from '../Objects/Button';


export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
    this.game = window;
  }

  create() {
    this.creditsText = this.add.text(this.scene.game.config.width / 7,
      this.scene.game.config.height / 2 - 200,
      'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(this.scene.game.config.width / 7,
      this.scene.game.config.height / 2 - 100,
      'Created By: Alexandre Bouhid', { fontSize: '32px', fill: '#fff' });

    this.check = this.add.text(this.scene.game.config.width / 7, this.scene.game.config.height / 2,
      'Check me up on: https://github.com/abouhid/', { fontSize: '26px', fill: '#fff' });

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
    const gameRatio = this.scene.game.config.width / this.scene.game.config.height;
    if (windowRatio < gameRatio) {
      this.canvas.style.width = `${windowWidth}px`;
      this.canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      this.canvas.style.width = `${windowHeight * gameRatio}px`;
      this.canvas.style.height = `${windowHeight}px`;
    }
  }
}
import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }    

    create() {

      this.creditsText = this.add.text(game.config.width / 7, game.config.height / 2 - 200,
        'Credits', { fontSize: '32px', fill: '#fff' });
      this.madeByText = this.add.text(game.config.width / 7, game.config.height / 2 - 100,
        `Created By: Alexandre Bouhid`, { fontSize: '32px', fill: '#fff' });
  
      this.check = this.add.text(game.config.width / 7, game.config.height / 2,
        'Check me up on: https://github.com/abouhid/', { fontSize: '26px', fill: '#fff' });

        this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    }
  
    update() {
      this.resize();
    }
  
    resize() {
      const canvas = document.querySelector('canvas');
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const gameRatio = game.config.width / game.config.height;
      if (windowRatio < gameRatio) {
        canvas.style.width = `${windowWidth}px`;
        canvas.style.height = `${windowWidth / gameRatio}px`;
      } else {
        canvas.style.width = `${windowHeight * gameRatio}px`;
        canvas.style.height = `${windowHeight}px`;
      }
    }
}
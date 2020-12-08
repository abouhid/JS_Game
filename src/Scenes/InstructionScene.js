import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {

    this.text1 = this.add.text(60, game.config.height / 2 - 200,
      "Twelve is a monkey that got lost in Europe and he needs \nyour help toget back to his home country: Brazil!\n  ", { fontSize: '18px', fill: '#fff' });
    this.text2 = this.add.text(60, game.config.height / 2 - 150,
      `He needs to grab as many bananas as possible to trade for \nhis flight to Rio (First Class, of course).`, { fontSize: '18px', fill: '#fff' });

    this.text3 = this.add.text(60, game.config.height / 2 -100,
      'There are 8 platforms in which each one have a banana, \nonce you get all 8 bananas, the other ones are reset', { fontSize: '18px', fill: '#fff' });
    this.text3 = this.add.text(60, game.config.height / 2-50,
      'There are special items that will appear everytime you collect \nall bananas to heal you (yes, he likes drinking):', { fontSize: '18px', fill: '#fff' });
    this.text3 = this.add.text(60, game.config.height / 2,
      'Watch out for Raffas, as they want to steal your bananas because\nthey want to go to Brazil as well (-40 of health)', { fontSize: '18px', fill: '#fff' });

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
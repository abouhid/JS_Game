import Phaser from 'phaser';
import config from '../Config/config';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.died = this.add.text(game.config.width / 3, game.config.height / 2 - 200,
      'You died!', { fontSize: '32px', fill: '#fff' });
    this.showScore = this.add.text(game.config.width / 3, game.config.height / 2 - 100,
      `Score: ${this.bananaScore}`, { fontSize: '32px', fill: '#fff' });

    this.madeByText = this.add.text(game.config.width / 3, game.config.height / 2,
      'Insert your name:', { fontSize: '26px', fill: '#fff' });
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

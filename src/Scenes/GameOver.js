import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
    this.game = window;
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.died = this.add.text(this.game.config.width / 3, this.game.config.height / 2 - 200,
      'You died!', { fontSize: '32px', fill: '#fff' });
    this.showScore = this.add.text(this.game.config.width / 3, this.game.config.height / 2 - 100,
      `Score: ${this.bananaScore}`, { fontSize: '32px', fill: '#fff' });

    this.madeByText = this.add.text(this.game.config.width / 3, this.game.config.height / 2,
      'Insert your name:', { fontSize: '26px', fill: '#fff' });
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

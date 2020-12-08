import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
    this.game = window;
  }

  create() {
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    const video = this.add.video(0, 0, 'gameover').setOrigin(0).setScrollFactor(0).setScale(2.5);

    
    this.cameras.main.fadeIn(1000);
    this.died = this.add.text(this.game.config.width / 3, this.game.config.height / 2 - 200,
      'You died', { fontSize: '32px', fill: '#fff' });
    this.showScore = this.add.text(this.game.config.width / 3, this.game.config.height / 2 - 100,
      `Your Score: ${this.sys.game.globals.bananaScore}`, { fontSize: '32px', fill: '#fff' });

    this.madeByText = this.add.text(this.game.config.width / 3, this.game.config.height / 2,
      'Insert your name to submit your score:', { fontSize: '26px', fill: '#fff' });


     this.form = this.add.dom(400,400).createFromCache('nameForm');

    this.submitBtn = this.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 100, 'blueButton1').setInteractive();
    this.submitBtn.on('pointerdown', () => {
      const usrInput = document.getElementById('nameField');
      this.name.setText(usrInput.value);
      usrInput.value = '';
    });

    // video.play(true);

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

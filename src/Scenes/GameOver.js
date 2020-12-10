import Phaser from 'phaser';
import API from '../Tools/api';
import form from '../Forms/form';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
    this.game = window;
  }

  create() {
    const self = this;
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    this.cameras.main.fadeIn(1000);

    this.showScore = this.add.text(70, 100,
      `Your Score: ${this.sys.game.globals.bananaScore}`, { fontSize: '36px', fill: 'black' });

    this.plane = this.add.image(125, 330, 'plane').setScale(0.2);
    this.physics.add.existing(this.plane);
    this.plane.body.setVelocityX(-200);

    this.raffa = this.add.sprite(100, 325, 'raffa');
    this.physics.add.existing(this.raffa);

    this.raffa.body.setVelocityX(-200);

    if (this.sys.game.globals.bananaScore >= 500) {
      this.ff = this.sound.add('ff', { volume: 0.15, loop: false });
      this.ff.play();
      this.speech = this.add.text(125, 190,
        '          CONTRATULATIONS!\nTwelve managed to buy his plane ticket!\n          See you in Ipanema!',
        { fontSize: '26px', fill: 'black' });
    } else {
      this.mariogo = this.sound.add('mariogo', { volume: 0.15, loop: false });
      this.mariogo.play();
      this.speech = this.add.text(125, 190,
        '                OH NO!\nTwelve did not get the bananas needed (500 B$) \n         and missed the flight!\n    I guess he will need to try again!',
        { fontSize: '22px', fill: 'black' });
      this.raffa.visible = false;
    }


    this.submitBtn = document.getElementById('submit_name');
    this.formInput = document.getElementById('username');
    this.showScore = this.add.text(150, 380,
      'You can submit your Score:', { fontSize: '32px', fill: 'black' });

    this.button = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.text = this.add.text(360, 480, 'Menu', { fontSize: '32px', fill: '#fff' });

    this.button.on('pointerdown', () => {
      if (this.ff) {
        this.ff.stop();
      }
      if (this.mariogo) {
        this.mariogo.stop();
      }

      this.submitBtn.style.display = 'none';
      this.formInput.style.display = 'none';
      this.sys.game.globals.bananaScore = 0;

      self.scene.start('Title');
    });
    this.form = form;
    this.submitBtn.style.display = 'inline';
    this.formInput.style.display = 'inline';

    this.submitBtn.addEventListener('click', () => {
      if (this.ff) {
        this.ff.stop();
      }
      if (this.mariogo) {
        this.mariogo.stop();
      }

      const playerName = this.formInput.value;

      const score = `${this.sys.game.globals.bananaScore}`;

      const loadMessage = this.add.text(100, 200,
        'Saving your score...', { fontSize: '32px', fill: 'black' });


      API.writeScore(playerName, score).then(() => {

      }).catch(() => {
        alert('Unable to get the leaderboard'); // eslint-disable-line no-alert
      });

      loadMessage.destroy();
      this.submitBtn.style.display = 'none';
      this.formInput.style.display = 'none';
      document.getElementById('username').value = '';
      this.sys.game.globals.bananaScore = 0;
      self.scene.start('Title');
    });
  }

  update() {
    this.resize();
    if (this.plane.x <= 0) {
      this.plane.x = this.game.config.width;
    }
    if (this.raffa.x <= 0) {
      this.raffa.x = this.game.config.width;
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

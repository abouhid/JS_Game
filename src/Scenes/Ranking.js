import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import API from '../Tools/api'

class Ranking extends Phaser.Scene {
  constructor() {
    super('Ranking');
  }

  create() {
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    this.menuButton = new Button(this, 500, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');
        this.add.image(150,500,'frog').setScale(0.5)


    const loadMessage = this.add.text(100, 100, 'Loading highest scores...', { fontSize: '32px', fill: 'black' });
    API.readScore().then((scores) => {
       const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 12);
      loadMessage.destroy();
       this.add.text(240, 95, 'TOP12   NAME  SCORE', { fontSize: '26px', fill: 'black' });
      topScores.forEach((playerScore, line) => {
        this.add.text(250, 110+30 * (line + 1), ` ${line + 1}      ${playerScore.user}     ${playerScore.score}   `, { fontSize: '22px', fill: 'black' });
      });
    }).catch(() => {
      alert('Unable to get the Ranking');
    });
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

export default Ranking;
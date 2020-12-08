import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
// import api from '../src/Tools/api.js';



class Ranking extends Phaser.Scene {
  constructor() {
    super('Ranking');
  }

  create() {
    this.menuButton = new Button(this, 500, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    const loadMessage = this.add.text(100, 100, 'Fetching highest scores...', { fontSize: '32px', fill: '#fff' });
    api.readScore().then((scores) => {
      const highestValues = scores.sort((a, b) => b.score - a.score).slice(0, 5);
      loadMessage.destroy();
      this.add.text(100, 50, 'RANK  SCORE   NAME', { fontSize: '32px', fill: '#fff' });
      highestValues.forEach((currentScore, index) => {
        this.add.text(100, 90 * (index + 1), ` ${index + 1}     ${currentScore.score}   ${currentScore.user}`, { fontSize: '32px', fill: '#fff' });
      });
    }).catch(() => {
      alert('Unable to get the Ranking');
    });
  }
}

export default Ranking;
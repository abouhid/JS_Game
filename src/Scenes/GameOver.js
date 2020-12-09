import Phaser from 'phaser';
import Button from '../Objects/Button';
import API from '../Tools/api'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
    this.game = window;
  }

  create() {
    let self = this
    this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    this.cameras.main.fadeIn(1000);
    this.died = this.add.text(100, 100,
      'You died', { fontSize: '32px', fill: 'black' });
    this.showScore = this.add.text(100, 200,
      `Your Score: ${this.sys.game.globals.bananaScore}`, { fontSize: '32px', fill: 'black' });

    //  let el = document.createElement('form');

    //  this.form = this.add.dom(200, 200).createFromCache('form');
    // console.log(this.form.cache.entries.entries.form)
    


    // console.log(this.sys.game.globals.bananaScore)
    
    
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.submitBtn = document.getElementById('submit_name')
    
    // this.submitBtn = this.add.image(300, 300, 'blueButton1').setInteractive();
    
    this.submitBtn.addEventListener('click', () => {
      let playerName = document.getElementById('username').value;
      let score = `${this.sys.game.globals.bananaScore}`;

      const loadMessage = this.add.text(100, 200,
        'Saving your score...', { fontSize: '32px', fill: 'black' });
       

        API.writeScore(playerName,score).then((scores) => { 
         console.log(scores); 
      }).catch(() => {
        alert('Unable to get the leaderboard');
      });
      loadMessage.destroy();  
    })
    
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



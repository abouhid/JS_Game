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

    this.form = this.add.dom(200, 400).createFromCache('form');

    // console.log(this.sys.game.globals.bananaScore)
    let playerName = 'Test2'
    let score = this.sys.game.globals.bananaScore


    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');


    this.submitBtn = this.add.image(300, 300, 'blueButton1').setInteractive();
    this.submitBtn.on('pointerdown', () => {
      const loadMessage = this.add.text(100, 200,
        'Saving your score...', { fontSize: '32px', fill: 'black' });


        API.writeScore(playerName,score).then((scores) => { 
         console.log(scores); 
      }).catch(() => {
        alert('Unable to get the leaderboard');
      });

      API.readScore().then((scores) => { 
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

      // API.writeScore(playerName, score).then(() => {
      //           loadMessage.destroy();
      //           // self.scene.start('Title');
      //         }).catch(() => {
      //           alert('Error. Unable to save your score');
      //         });
          //  loadMessage.destroy();
    // });
    // element.setPerspective(800);
    // element.addListener('click');
    // element.on('click', (event) => {
    //   if (event.target.name === 'confirm') {
    //     const username = element.getChildByName('username');
    //     if (username.value !== '') {
    //       localStorage.setItem('username', username.value);
    //       const loadMessage = this.add.bitmapText(100, 100, 'arcade', 'Saving your score...').setTint(0x000000);
    //       ApiModule.writeScore(username.value, localStorage.getItem('score')).then(() => {
    //         loadMessage.destroy();
    //         element.scene.scene.start('Title');
    //       }).catch(() => {
    //         alert('Error. Unable to save your score');
    //       });
    //     } else {
    //       element.scene.tweens.add({
    //         targets: submitLabel,
    //         alpha: 0.1,
    //         duration: 300,
    //         ease: 'Power2',
    //         yoyo: true,
    //       });
    //     }
    //   }
    // });

    // this.tweens.add({
    //   targets: element,
    //   y: 300,
    //   duration: 3000,
    //   ease: 'Power3',
    // });











    // // const video = this.add.video(0, 0, 'gameover').setOrigin(0).setScrollFactor(0).setScale(2.5);
    // // this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);

    // // this.cameras.main.fadeIn(1000);
    // this.died = this.add.text(this.game.config.width / 3, this.game.config.height / 2 - 200,
    //   'You died', { fontSize: '32px', fill: '#fff' });
    // this.showScore = this.add.text(this.game.config.width / 3, this.game.config.height / 2 - 100,
    //   `Your Score: ${this.sys.game.globals.bananaScore}`, { fontSize: '32px', fill: '#fff' });

    // this.madeByText = this.add.text(200,300,
    //   'Insert your name to submit \nyour score:', { fontSize: '26px', fill: '#fff' });

    //  const element = this.add.dom(400, 600).createFromCache('nameform');

    // this.form = this.add.dom(200, 400).createFromCache('nameform');

    // this.submitBtn = this.add.image(this.game.config.width / 2, (this.game.config.height / 2) + 100, 'blueButton1').setInteractive();
    // this.submitBtn.on('pointerdown', () => {
    //   const usrInput = document.getElementById('nameField');
    //   console.log(usrInput)
    //   // this.name.setText(usrInput.value);
    //   // usrInput.value = '';
    // });

    // // video.play(true);

    // this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');



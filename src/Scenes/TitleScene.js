import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
       this.bg_1 = this.add.image(-100, -150, 'farm').setOrigin(0).setScrollFactor(0);


    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 140, 'blueButton1', 'blueButton2', 'Start', 'Instructions');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 - 70, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Instructions
    this.instructionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'About', 'Instructions');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 70, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    // Input
    this.InputButton = new Button(this, config.width / 2, config.height / 2 + 140, 'blueButton1', 'blueButton2', 'Ranking', 'UserInput');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100,
        config.width, config.height),
    );
  }
}

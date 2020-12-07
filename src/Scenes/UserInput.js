import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class UserInput extends Phaser.Scene {
  constructor() {
    super('UserInput');
  }

  preload() {
    this.sys.scene.load.bitmapFont('carrier_command', '../src/assets/fonts/bitmapFonts/carrier_command.png', '../src/assets/fonts/bitmapFonts/carrier_command.xml');
  }

  create() {
    this.name = this.add.text(50, 20, 'Your name', {
      font: '40px Arial',
      fill: '#ffffff',
      align: 'center',
    });

    this.form = this.add.dom(config.width / 2, config.height / 2).createFromCache('nameForm');
    this.button = this.add.image(config.width / 2, (config.height / 2) + 100, 'blueButton1').setInteractive();

    this.text = this.sys.scene.add.text(0, 0, 'Add Name', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.button.on('pointerover', () => {
      this.button.setTexture('blueButton2');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('blueButton1');
    });

    this.button.on('pointerdown', () => {
      const usrInput = document.getElementById('nameField');
      this.name.setText(usrInput.value);
      usrInput.value = '';
    });
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
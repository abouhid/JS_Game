import Phaser from 'phaser';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', '/src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', '/src/assets/ui/blue_button03.png');
    this.load.image('logo', '/src/assets/logo.png');
    this.load.image('box', '/src/assets/ui/grey_box.png');
    this.load.image('checkedBox', '/src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['/src/assets/jj.mp3']);

    // load html
    this.load.html('nameForm', '/src/Forms/NameForm.html');

    // gamescene
    this.load.image('farm', '../src/assets/farm.jpg');
    this.load.image('platform', '../src/assets/plattexture.png');

    this.load.spritesheet('banana', '../src/assets/banana.png', {
      frameWidth: 31,
      frameHeight: 58,
    });
    this.load.spritesheet('pierogi', '../src/assets/pierogi.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('raffa', '../src/assets/monk.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('heart', '../src/assets/heart.png');
    this.load.image('pizza', '../src/assets/pizza.png');

    this.load.image('beer', '../src/assets/beer.png');
    this.load.spritesheet('drink', '../src/assets/pierogi.jpg', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('dude', '../src/assets/monk.png', {
      frameWidth: 32,
      frameHeight: 32.5,
    });

    this.load.video('gameover', '../src/assets/gameover.mp4');
  }

  ready() {
    this.scene.start('GameOver');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}

import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Ranking from './Scenes/Ranking';
import GameOver from './Scenes/GameOver';
import Instructions from './Scenes/InstructionScene';


import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    const bananaScore = 0;
    const playerName = '';
    this.globals = {
      model, bgMusic: null, bananaScore, playerName,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOver);

    this.scene.add('Instructions', Instructions);
    this.scene.add('Ranking', Ranking);

    this.scene.start('Boot');
  }
}

window.game = new Game();
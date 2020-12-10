import Phaser from 'phaser';


export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.scene.start('Preloader');
  }
}
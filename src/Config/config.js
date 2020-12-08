/* eslint-disable no-undef */
import 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  dom: {
    createContainer: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },

    },
  },
};

export default config;
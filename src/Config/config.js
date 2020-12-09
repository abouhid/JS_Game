/* eslint-disable no-undef */
import 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },

    },
    dom: {
      createContainer: true,
    },
  },
};

export default config;
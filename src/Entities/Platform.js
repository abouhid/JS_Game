import Phaser from 'phaser';
import Entity from './Entity';

const gameOptions = {

  numPlat: 12,

  platformSpeedRange: [200, 500],

  spawnRange: [100, 700],

  platformSizeRange: [140, 420],
};

export default class Platform extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Platform');
    this.visible = false;

    this.scene.numPlat = gameOptions.numPlat;

    this.scene.platformGroup = this.scene.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.scene.platformPool = this.scene.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    const dPlat = (this.scene.game.config.height * 1) / 3;
    let platHeight = (this.scene.game.config.height * 2) / 3;
    this.scene.distPlat = platHeight - dPlat;

    const times = x => f => {
      if (x > 0) {
        f();
        times(x - 1)(f);
      }
    };

    this.scene.ground = this.scene.add.tileSprite(this.scene.game.config.width / 2,
      this.scene.game.config.height + 100,
      this.scene.game.config.width,
      32,
      'platform');
    this.scene.physics.add.existing(this.scene.ground);
    this.scene.ground.body.setImmovable(true);
    this.scene.ground.displayHeight = 300;


    times(this.scene.numPlat)(() => {
      this.addPlatform(
        Phaser.Math.Between(
          gameOptions.platformSizeRange[0],
          gameOptions.platformSizeRange[1],
        ),
        Phaser.Math.Between(
          gameOptions.spawnRange[0],
          gameOptions.spawnRange[1],
        ),
        platHeight,
      );

      platHeight -= dPlat;
    });
  }

  addPlatform(platformWidth, posX, posY) {
    const platform = this.scene.add.tileSprite(
      posX,
      posY,
      platformWidth,
      32,
      'platform',
    );
    this.scene.physics.add.existing(platform);
    platform.body.setImmovable(true);
    platform.body.setVelocityX(
      Phaser.Math.Between(
        gameOptions.platformSpeedRange[0],
        gameOptions.platformSpeedRange[1],
      ) * -1,
    );
    this.scene.platformGroup.add(platform);
    this.scene.time.addEvent({
      delay: 500,
      callback() {
        const velocity = Phaser.Math.FloatBetween(gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1]);
        if (platform.x < 0) {
          platform.body.setVelocityX(velocity);
        }
        if (platform.x > this.scene.game.config.width) {
          platform.body.setVelocityX(velocity * -1);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}

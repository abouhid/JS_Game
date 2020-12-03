import 'phaser';
import Entity from '../Entities/Entity';
let gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [150, 300],
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 200],

  // platform width range, in pixels
  platformSizeRange: [90, 180],

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],
};
let created = true;

export default class Platform extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.scene.addedPlatforms = 0;

    this.scene.platformGroup = this.scene.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.scene.platformPool = this.scene.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

  }

  addPlatform(platformWidth, posX, posY) {
    this.scene.addedPlatforms++;
    let platform1;

    if (this.scene.platformPool.getLength()) {
      platform1 = this.scene.platformPool.getFirst();
      platform1.x = posX;
      platform1.y = posY;
      platform1.active = true;
      platform1.visible = true;
      this.scene.platformPool.remove(platform1);
      let newRatio = platformWidth / platform1.displayWidth;
      platform1.displayWidth = platformWidth;
      platform1.tileScaleX = 1 / platform1.scaleX;
    } else {
      platform1 = this.scene.add.tileSprite(
        posX,
        posY,
        platformWidth,
        32,
        "platform"
      );
      this.scene.physics.add.existing(platform1);
      platform1.body.setImmovable(true);
      platform1.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1]
        ) * -1
      );
      platform1.setDepth(2);
      this.scene.platformGroup.add(platform1);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );
  }

  update() {
    let nextPlatformWidth = Phaser.Math.Between(
      gameOptions.platformSizeRange[0],
      gameOptions.platformSizeRange[1]
    );
    this.scene.platformGroup.getChildren().forEach(function (platform) {
      if (platform.x - platform.displayWidth / 2 < 0 && created) {
        created = false;
        this.addPlatform(
          nextPlatformWidth,
          game.config.width + nextPlatformWidth / 2,
          platform.y
        );
      }
      if (platform.x + platform.displayWidth / 2 < 0) {
        created = true;
        this.scene.platformGroup.killAndHide(platform);
        this.scene.platformGroup.remove(platform);
      }
    }, this);
  }

}



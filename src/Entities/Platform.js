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
    super(scene, x, y, key, 'Platform');
    this.scene.addedPlatforms = 0;
    this.visible = false;

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


    this.addPlatform(
      game.config.width / 3,
      game.config.width / 2,
      (game.config.height * 2) / 3
    );
    this.addPlatform(
      game.config.width / 2,
      game.config.width,
      (game.config.height * 1) / 3
    );


  }

  addPlatform(platformWidth, posX, posY) {
    this.scene.addedPlatforms++;
    let platform;

    if (this.scene.platformPool.getLength()) {
      platform = this.scene.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.scene.platformPool.remove(platform);

      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.scene.add.tileSprite(
        posX,
        posY,
        platformWidth,
        32,
        "platform"
      );
      this.scene.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1]
        ) * -1
      );
      platform.setDepth(2);
      this.scene.platformGroup.add(platform);
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



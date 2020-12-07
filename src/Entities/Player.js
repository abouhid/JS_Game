import Phaser from 'phaser';
import Entity from './Entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.health = 100;

    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: this.scene.anims.generateFrameNumbers('dude',
        {
          start: 7,
          end: 8,
        }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.key_W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.body.setGravityY(500);
  }

  movements() {
    const jumped = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    const jumpedW = Phaser.Input.Keyboard.JustDown(this.key_W);
    if (this.cursors.left.isDown || this.key_A.isDown) {
      this.body.setVelocityX(-200);

      this.anims.play('left', true);
    } else if (this.cursors.right.isDown || this.key_D.isDown) {
      this.body.setVelocityX(200);

      this.anims.play('right', true);
    } else {
      this.body.setVelocityX(0);
      if (this.body.touching.down) {
        this.anims.play('turn');
      }
    }

    if (jumped || jumpedW) {
      if (this.body.touching.down) {
        this.canJump = true;
        this.body.setVelocityY(-380);
      } else if (this.canJump) {
        this.canJump = false;
        this.body.setVelocityY(-380);
      }
    }
  }

  update() {
    this.scene.cameras.main.centerOn(
      game.config.width / 2,
      this.y - this.scene.game.config.height / 10,
    );
    if (this.x < 0) {
      this.x = game.config.width;
    } else if (this.x >= game.config.width) {
      this.x = 0;
    }
  }
}

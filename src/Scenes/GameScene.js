import 'phaser';
import config from '../Config/config';

let platforms,stars,bombs,player,cursors;

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
  preload() {
    this.load.image('sky', '../src/assets/sky.png');
    this.load.image('ground', '../src/assets/platform.png');
    this.load.image('star', '../src/assets/star.png');
    this.load.image('bomb', '../src/assets/bomb.png');
    this.load.spritesheet('dude',
    '../src/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }
  create () {

    this.add.image(config.width / 2, config.height / 2, 'sky');

    platforms = this.physics.add.staticGroup();
    
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    console.log(this.physics)
    
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    
    this.physics.add.collider(player, platforms);
    player = this.physics.add.sprite(100, 0, 'dude');

    player.setBounce(0.1);
    
    player.setCollideWorldBounds(true);
    player.body.setGravityX(30)

    player.body.setGravityY(50)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
          start: 0,
          end: 3
      }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [{
          key: 'dude',
          frame: 4
      }],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
          start: 5,
          end: 8
      }),
      frameRate: 10,
      repeat: -1
  });

  }

  update () {

    cursors = this.input.keyboard.createCursorKeys();


    if (cursors.left.isDown || this.key_A.isDown) 
    {
        player.setVelocityX(-200);
    
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || this.key_D.isDown) 
    {
        player.setVelocityX(200);
    
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
    
        player.anims.play('turn');
    }
    
    //  const jumped = Phaser.Input.Keyboard.JustDown(cursors.up);
    //  const jumpedW = Phaser.Input.Keyboard.JustDown(this.key_W);

  
    //  if (jumped || jumpedW) {
    //     if (player.body.touching.down) {
    //       this.canJump = true;
    //       player.setVelocityY(-380);
    //     } else if (this.canJump) {
    //       this.canJump = false;
    //       player.setVelocityY(-380);
    //     }
    //   }

  }
};
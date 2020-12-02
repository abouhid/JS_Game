class Example1 extends Phaser.Scene {
    constructor() {
        super({key:"runner"})
    }
    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('eu', 'assets/profile1.jpg');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        this.image = this.add.image(400, 300, 'bomb');
        this.input.keyboard.on('keyup-D',function(event) {
            this.image.x +=10;
        },this);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.input.on('pointerdown',function(event) {
            this.image.x =event.x;
            this.image.y =event.y;
        },this);
        this.input.keyboard.on('keyup-P',function(event) {
            var physicsImage = this.physics.add.image(this.image.x,this.image.y,'eu')
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100,100),-300)
        },this);
        this.input.keyboard.on('keyup',function(e){
            if(e.key=='1'){
                            // this.scene.start("runner")

                console.log('oi')
            }
        },this)

        
    }
    update(){

        if(this.key_A.isDown){
            this.image.x--;
        }

    }
}
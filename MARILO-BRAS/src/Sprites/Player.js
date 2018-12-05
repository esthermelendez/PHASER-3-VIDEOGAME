import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'player');
        this.scene = scene;
        this.hitDelay = false;
        this.victoria = false;

        // enable physics
        this.scene.physics.world.enable(this);

        // add our player to the scene
        this.scene.add.existing(this);
        
        // scale our player
        this.setScale(0.3);

        this.setBounce(0.3);

        this.setCollideWorldBounds(true);
        

        // this.body.gravity.y = 600;
    }
    

    update (cursors) {
        if (cursors.left.isDown)
        {
            this.body.setVelocityX(-200);
            this.anims.play('left', true);
            this.flipX = true;
        }
        else if (cursors.right.isDown)
        {
            this.body.setVelocityX(200);
            this.anims.play('right', true);
            this.flipX = false;
            
        } else {
            this.body.setVelocityX(0);
            // this.anims.play('turn', true);
            // this.flipX = false;
        }
        // jump 
        if (cursors.up.isDown && this.body.onFloor())
        {
            this.anims.play('up', true);
            this.body.setVelocityY(-500);        
        }
    }

    enemyCollision (player, puerta) {
        if (!this.hitDelay) {
          this.hitDelay = true;
          this.victoria = true;
          this.scene.events.emit('win', this.victoria);
        }
      }
}
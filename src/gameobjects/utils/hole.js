import PARAMETERS from "../../parameters";

export default class Hole extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, isBossHole=false) {
        super(scene, x, y, isBossHole ? 'hole_filled' : 'hole');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setSize(PARAMETERS.HOLE.HITBOX_X, PARAMETERS.HOLE.HITBOX_Y);

        if(isBossHole){
            this.setScale(PARAMETERS.HOLE.RATIO_START_BOSS, PARAMETERS.HOLE.RATIO_START_BOSS);
            this.scene.tweens.add({
                targets: this,
                scaleX: 1, 
                scaleY: 1,
                duration: PARAMETERS.HOLE.SPEED_BOSS, // 1 second
                ease: 'Sine'
            });
        }  
        else{
            this.setOrigin(0, 0);
        }
    }
}

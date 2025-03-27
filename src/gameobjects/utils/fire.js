import PARAMETERS from "../../parameters";

export default class Fire extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fire');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        //THIS SHOULD BE REMOVED WHEN ADDED A GOOD SPRITE
        this.setScale(32/260, 32/360);

        this.setOrigin(0, 0);
        //THIS SHOULD BE ADDED WHEN ADDED A GOOD SPRITE
        //this.setSize(PARAMETERS.FIRE.HITBOX_X, PARAMETERS.FIRE.HITBOX_Y);
    }
}

import PARAMETERS from "../../parameters";

export default class Fire extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fire');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.setScale(PARAMETERS.FIRE.SCALE, PARAMETERS.FIRE.SCALE);

        this.setOrigin(0, 0);
        this.setSize(PARAMETERS.FIRE.HITBOX_X, PARAMETERS.FIRE.HITBOX_Y);
    }
}

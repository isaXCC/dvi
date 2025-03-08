import PARAMETERS from "../../parameters";

export default class Hole extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'hole');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0, 0);
        this.setSize(PARAMETERS.HOLE.HITBOX_X, PARAMETERS.HOLE.HITBOX_Y);
    }
}

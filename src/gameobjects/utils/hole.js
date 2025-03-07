
export default class Hole extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'hole');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        //64x64
        this.setSize(64*0.7, 64*0.7);
    }
}

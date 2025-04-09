import PARAMETERS from "../../parameters";

export default class Fire extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fire');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.setScale(PARAMETERS.FIRE.SCALE, PARAMETERS.FIRE.SCALE);

        this._i = 2;
        this._called = false;
        this.setOrigin(0, 0);
        this.setSize(PARAMETERS.FIRE.HITBOX_X, PARAMETERS.FIRE.HITBOX_Y);
        this.setFrame(this._i);
    }

    update(){
        if(!this._called){
            this._called = true;
            this.scene.time.delayedCall(PARAMETERS.FIRE.ANIMS_DURATION, () => {
                if (this.active && this.scene) {
                    this._called = false;
                    this._i++;
                    if(this._i > 2)
                        this._i = 0;
                    this.setFrame(this._i);
                }});
        }
    }
}

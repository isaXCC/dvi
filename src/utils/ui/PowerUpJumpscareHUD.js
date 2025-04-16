import PARAMETERS from "../../parameters";

export default class PowerUpJumpscareHUD extends Phaser.GameObjects.Container{
    /**
     * PowerUpJumpscareHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene) {
        super(scene);

        this._scene = scene;

        let cr = PARAMETERS.PLAYER_HUD.POWERUP_JUMPSCARE_CIRCLE_PROPERTIES;
        // circle for powerup and jumpscare bar is created
        this.graphics = this._scene.add.graphics();
        this.graphics.lineStyle(cr.JS_THICKNES, 0xFFFFFF, 1); // border
        this.graphics.fillStyle(0x00CCFF, 0.5);   // fill
        this.graphics.strokeCircle(cr.PUP_X, cr.PUP_Y, cr.JS_RADIUS);
        this.graphics.fillCircle(cr.PUP_X, cr.PUP_Y, cr.PUP_RADIUS);
        this.add(this.graphics);
    }
    
    defaultPowerUpDisplay(){
        this.deletePreviousPowerUpImage();
        this.powerup_image = this.add.image(32, 556, null);
        this.powerup_image.setVisible(false);
    }
    
    newPowerUpDisplay(powerup) {
        this.deletePreviousPowerUpImage();
        // Add the power-up image on top
        this.powerup_image = this.add.image(PARAMETERS.ROOM.PUP_X, PARAMETERS.ROOM.PUP_Y, powerup.sprite);
        this.powerup_image.setAlpha(0.75);
    }

    deletePreviousPowerUpImage(){
        if(this.powerup_image !== undefined){
            this.powerup_image.destroy();
        }
    }
}
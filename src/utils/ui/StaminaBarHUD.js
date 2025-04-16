import PARAMETERS from "../../parameters";

export default class StaminaBarHUD extends Phaser.GameObjects.Sprite{
    /**
     * StaminaBarHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene) {
        super(scene);

        this._scene = scene;
        this._sb = PARAMETERS.PLAYER_HUD.STAMINA_BAR_PROPERTIES;

        this._staminabar = this._scene.add.image(this._scene.player.x + this._scene.player.width/2 + this._sb.X_OFFSET, 
                                                this._scene.player.y + this._sb.Y_OFFSET, 'stamina').setFrame(0);
        this._staminabar.setScale(this._sb.SCALE, this._sb.SCALE);
        this._staminabar.setVisible(false);
    }

    update(){
        // updates stamina
        this._staminabar.setPosition(this._scene.player.x + this._scene.player.width/2 + this._sb.X_OFFSET, 
            this._scene.player.y + this._sb.Y_OFFSET, 'stamina').setFrame(3 - this._scene.player._stamina);

        if(this._scene.player._stamina === 3){
            this._scene.time.delayedCall(this._sb.TIME_TO_DISAPPEAR, () => {
                this._staminabar.setVisible(false);
            });
        } 
        else this._staminabar.setVisible(true);
    }
}
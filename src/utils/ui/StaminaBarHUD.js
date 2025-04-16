import PARAMETERS from "../../parameters";

export default class StaminaBarHUD extends Phaser.GameObjects.Sprite{
    /**
     * StaminaBarHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene) {
        super(scene);

        this._scene = scene;

        this._staminabar = this._scene.add.image(this._scene.player.x + this._scene.player.width/2 - 2, this._scene.player.y + 4, 'stamina').setFrame(0);
        this._staminabar.setScale(PARAMETERS.PLAYER_HUD.STAMINA_BAR_SCALE, PARAMETERS.PLAYER_HUD.STAMINA_BAR_SCALE);
        this._staminabar.setVisible(false);
    }

    update(){
        // updates stamina
        this._staminabar.setPosition(this._scene.player.x + this._scene.player.width/2 - 2, this._scene.player.y + 4, 'stamina').setFrame(3 - this._scene.player._stamina);

        if(this._scene.player._stamina === 3) this._staminabar.setVisible(false);
        else this._staminabar.setVisible(true);
    }
}
import PARAMETERS from "../../parameters";
import FullscreenButton from "./FullscreenButton";
import LifeBulletsHUD from "./lifebulletsHUD";
import PowerUpJumpscareHUD from "./powerupjumpscareHUD";
import StaminaBarHUD from "./StaminaBarHUD";

export default class PlayerHUD extends Phaser.GameObjects.Container{

    /**
     * playerHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene){
        super(scene);
        this._scene = scene;

        // builds life, bullets, powerup and jumpscare display
        this.buildHUD();

        // builds stamina bar
        this.buildStaminaBar();

        // builds fullscreen button
        this.buildFullscreenButton();

        // the container is added to the scene
        this._scene.add.existing(this);
    }

    buildHUD(){
        // builds life and bullets rounded rectangle
        this._lfblrectangle = new LifeBulletsHUD(this._scene);
        
        // builds powerup display and jumpscare circle
        this._pupjscircle = new PowerUpJumpscareHUD(this._scene);

        let cr = PARAMETERS.PLAYER_HUD.POWERUP_JUMPSCARE_CIRCLE_PROPERTIES;
        // mask shape created so the circle hides the rounded rectangle
        const maskShape = this._scene.make.graphics({ x: 0, y: 0, add: false });
        maskShape.fillStyle(0xffffff);                          // what is shown by the mask
        maskShape.fillRoundedRect(cr.HIDING_MASK_X, cr.HIDING_MASK_Y, 
            cr.HIDING_MASK_WIDTH, cr.HIDING_MASK_HEIGHT, cr.HIDING_MASK_RADIUS);          // circular rectangle
        maskShape.fillStyle(0x000000);                          // what is not shown
        maskShape.fillCircle(cr.PUP_X, cr.PUP_Y, cr.JS_RADIUS); // the inside of the hollow circle
        
        // creates the mask
        const mask = maskShape.createGeometryMask();
        mask.invertAlpha = true; // inverted
        
        // applies the mask to the rounded rectangle
        this._lfblrectangle.setMask(mask);

        // both rounded rectangle and circle are added to the container
        this.add(this._lfblrectangle);
        this.add(this._pupjscircle);
    }

    buildStaminaBar(){
        this._staminabar = new StaminaBarHUD(this._scene);
        this.add(this._staminabar);
    }

    buildFullscreenButton(){
        this._fullscreen_button = new FullscreenButton(this._scene);
        this.add(this._fullscreen_button);
    }

    update(){
        this._lfblrectangle.update();
        this._pupjscircle.update();
        this._staminabar.update();
    }
}
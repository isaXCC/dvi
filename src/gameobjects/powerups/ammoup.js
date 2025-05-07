import PowerUp from "./powerup.js";

export default class AmmoUp extends PowerUp {

    constructor(player, scene, x, y){
        super(player, scene, x, y, 'ammoup');
        this._isStored = false;
    }

    effect(){
        this.player.changeMaxAmmo(1);
        this.removePowerUp();
    }

    removePowerUp(){
        super.removePowerUp();
    }

}
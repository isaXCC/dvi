import PowerUp from "./powerup.js";

export default class HeartUp extends PowerUp {

    constructor(player, scene, x, y){
        super(player, scene, x, y, 'hearts');
        this._isStored = false;
        this.setFrame(2);
    }

    effect(){
        this.player.changeMaxLife(2);
        this.removePowerUp();
    }

    removePowerUp(){
        super.removePowerUp();
    }

}
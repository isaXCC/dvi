import CONDITIONS from "../../dungeons/conditions.js";
import PowerUp from "./powerup.js";

export default class Boots extends PowerUp {

    constructor(player, scene, x, y){
        super(player, scene, x, y, 'boots');
        this._isStored = false;
    }

    effect(){
        CONDITIONS.D1.BOOTS = true;
        this.removePowerUp();
    }

    removePowerUp(){
        super.removePowerUp();
    }

}
import PowerUp from "./powerup.js";

export default class SpeedBoost extends PowerUp {

    constructor(player, scene, x, y){
        super(player, scene, x, y, 'speedboost');

        this.original_speed = this.player._speed;
    }

    effect(){
        this.player._speed *= 1.5;
    }

    removePowerUp(){
        super.removePowerUp();
        this.player._speed = this.original_speed;
    }

}
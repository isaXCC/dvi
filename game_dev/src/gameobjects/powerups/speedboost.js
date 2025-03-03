import PowerUp from "./powerup.js";

export default class SpeedBoost extends PowerUp {

    constructor(player, scene, x, y){
        super(player, scene, x, y, 'speedboost');

        this.original_speed = this.player._speed;

        this.player._speed *= 1.3;

        this.player.scene.time.delayedCall(10000, () => this.remove(), [], this);
    }

    remove(){
        this.player._speed = this.original_speed;
    }

}
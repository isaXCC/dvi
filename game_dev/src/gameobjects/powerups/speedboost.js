import PowerUp from "./powerup.js";

export default class SpeedBoost extends PowerUp {

    constructor(player, scene, x, y){
        super(player, scene, x, y, 'hearts');

        this.original_speed = this.player._speed;
    }

    effect(){
        this.player._speed *= 1.75;
        this.player.scene.time.delayedCall(5000, () => this.remove(), [], this);
    }

    remove(){
        this.player._speed = this.original_speed;
    }

}
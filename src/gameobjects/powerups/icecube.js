import PowerUp from "./powerup.js";
import SnowBall from "../utils/snowball.js";

export default class IceCube extends PowerUp {
    constructor(player, scene, x, y){
        super(player, scene, x, y, 'iceCube');
    }

    newBullet(p_x, p_y, b_x, b_y){
            this.player.scene.bullets.addElement(new SnowBall(this.player.scene, p_x, p_y, b_x, b_y));
    }
}
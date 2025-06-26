import PowerUp from "./powerup.js";
import FireBall from "../utils/fireball.js";

export default class Chili extends PowerUp {
    constructor(player, scene, x, y){
        super(player, scene, x, y, 'chili');
    }

    newBullet(p_x, p_y, b_x, b_y){
            this.player.scene.bullets.addElement(new FireBall(this.player.scene, p_x, p_y, b_x, b_y));
    }
}
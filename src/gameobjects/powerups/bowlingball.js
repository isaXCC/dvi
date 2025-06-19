import PowerUp from "./powerup.js";
import BowlingBullet from "../utils/bowlingbullet.js";

export default class BowlingBall extends PowerUp {
    constructor(player, scene, x, y){
        super(player, scene, x, y, 'bowlingBall');
    }

    newBullet(p_x, p_y, b_x, b_y){
            this.player.scene.bullets.addElement(new BowlingBullet(this.player.scene, p_x, p_y, b_x, b_y));
    }
}
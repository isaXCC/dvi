import PowerUp from "./powerup.js";
import BigBullet from "../utils/bigbullet.js";

export default class BigShot extends PowerUp {
    constructor(player, scene, x, y){
        super(player, scene, x, y, 'bigBullet');

        this._count = 0;
    }

    newBullet(p_x, p_y, b_x, b_y){
        if(this._count % 2 == 0){
            this.player.scene.bullets.addElement(new BigBullet(this.player.scene, p_x, p_y, b_x, b_y));
        }
        else {
            //REGULAR
            super.newBullet(p_x, p_y, b_x, b_y);
        }
        this._count = (this._count + 1) % 3;
    }
}
import PowerUp from "./powerup.js";
import {getVectorAngle} from "../../utils/vector.js";

export default class TripleShot extends PowerUp {
    constructor(player, scene, x, y){
        super(player, scene, x, y, 'hearts');

        this._count = 0;
    }

    newBullet(p_x, p_y, b_x, b_y){
        //REGULAR
        super.newBullet(p_x, p_y, b_x, b_y);
        //IN THE THIRD SHOT -> TRIPLE SHOT
        this._count++;
        if(this._count % 3 === 0){
            this._count = 0;
            this.newBullet_aux(p_x, p_y, b_x, b_y, -15);
            this.newBullet_aux(p_x, p_y, b_x, b_y, +15);
        }
    }

    newBullet_aux(p_x, p_y, b_x, b_y, angle){
        let {xNew, yNew} = getVectorAngle(p_x, p_y, b_x, b_y, angle);
        super.newBullet(p_x, p_y, xNew, yNew);
    }
}
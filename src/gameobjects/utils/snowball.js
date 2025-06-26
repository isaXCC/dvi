import PARAMETERS from "../../parameters";
import Bullet from "./bullet";

export default class SnowBall extends Bullet {
    constructor(scene, origX, origY, destX, destY){
        super(scene, origX, origY, destX, destY, false, 'snowBall'); 
        this._damage = 1;
        this._speedReduction = PARAMETERS.SNOWBALL.DURATION;
        this._duration = PARAMETERS.SNOWBALL.SPEED_REDUCTION;
    }

    getReduction(){
        return this._speedReduction;
    }

    getDuration(){
        return this._duration;
    }
}
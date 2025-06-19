import Bullet from "./bullet";

export default class SnowBall extends Bullet {
    constructor(scene, origX, origY, destX, destY){
        super(scene, origX, origY, destX, destY, false, 'snowBall'); 
        this._damage = 1;
        this._speedReduction = 0.4;
        this._duration = 4000;
    }

    getReduction(){
        return this._speedReduction;
    }

    getDuration(){
        return this._duration;
    }
}
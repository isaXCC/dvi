import Bullet from "./bullet";

export default class FireBall extends Bullet {
    constructor(scene, origX, origY, destX, destY){
        super(scene, origX, origY, destX, destY, false, 'fireShot'); 
        this._damage = 1;
        this._maxStacks= 2;
        this._dot= this._damage / 2;
        this._frecuency=500;
    }

    getMaxStacks() {
        return this._maxStacks;
    }

    getDot(){
        return this._dot;
    }

    getFrecuency(){
        return this._frecuency;
    }
}
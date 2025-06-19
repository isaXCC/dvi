import Bullet from "./bullet";

export default class BigBullet extends Bullet {
    constructor(scene, origX, origY, destX, destY){
        super(scene, origX, origY, destX, destY, false, 'bigShot'); 
        this._damage = 2;
    }
}
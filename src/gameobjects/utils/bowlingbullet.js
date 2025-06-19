import Bullet from "./bullet";

export default class BowlingBullet extends Bullet {
    constructor(scene, origX, origY, destX, destY){
        super(scene, origX, origY, destX, destY, false, 'bowlingShot'); 
        this._damage = 1;
        this.hitEnemies = new Set(); // registers enemies hitted by this bullet
    }

    hasHit(enemy) {
        return this.hitEnemies.has(enemy);
    }

    registerHit(enemy) {
        this.hitEnemies.add(enemy);
    }
}
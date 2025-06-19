import DefaultGroup from "./DefaultGroup";
import SnowBall from "../utils/snowball.js";
import BowlingBullet from "../utils/bowlingbullet.js";
import FireBall from "../utils/fireball.js";


export default class BulletGroup extends DefaultGroup {

    constructor(scene) {
        super(scene, false);
    }

    oncCollision(bullet, onc){
        this.scene.bullets.removeElement(bullet);
    }

    enemyOverlap(bullet, enemy) {

        if(bullet._enemyBullet === false){
            console.log('Bullet hit an enemy!');

            if (bullet instanceof BowlingBullet) {
                if (!bullet.hasHit(enemy)) {
                    enemy.takeDamage(bullet.getDamage());
                    bullet.registerHit(enemy);
                }
            }
            else {
                enemy.takeDamage(bullet.getDamage());

                if (bullet instanceof SnowBall) {
                    enemy.getFreezed(bullet.getDuration(), bullet.getReduction());
                }
                else if(bullet instanceof FireBall){
                    enemy.getBurned(bullet.getFrecuency(), bullet.getDot(), bullet.getMaxStacks());
                }

                //bullet.hitTarget();
                this.scene.bullets.removeElement(bullet);
            }
            
        }
    }

    playerOverlap(player, bullet) {
        if(bullet._enemyBullet === true){
            console.log('Bullet hit the CAT!');
            player.takeDamage(bullet, bullet.getDamage());
            this.scene.bullets.removeElement(bullet);
        }
    }

}
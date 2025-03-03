import DefaultGroup from "./DefaultGroup";

export default class BulletGroup extends DefaultGroup {

    constructor(scene) {
        super(scene, false);

    }

    oncCollision(bullet, onc){
        this.scene.bullets.removeElement(bullet);
    }

    enemyOverlap(bullet, enemy) {
        console.log('Bullet hit an enemy!');
        if(bullet._enemyBullet === false){
            enemy.takeDamage();
            //bullet.hitTarget();
            this.scene.bullets.removeElement(bullet);
        }
    }

    playerOverlap(player, bullet) {
        if(bullet._enemyBullet === true){
            console.log('Bullet hit the CAT!');
            player.takeDamage();
            this.scene.bullets.removeElement(bullet);
        }
    }

}
import DefaultGroup from "./DefaultGroup";

export default class BulletGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);

        
    }

    oncCollision(bullet, onc){
        this.scene.bullets.removeElement(bullet);
    }

    enemyOverlap(bullet, enemy) {
        console.log('Bullet hit an enemy!');
        if(bullet._enemyBullet === false)
            enemy.takeDamage();
        this.scene.bullets.removeElement(bullet);
    }

    
}
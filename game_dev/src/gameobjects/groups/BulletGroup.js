import DefaultGroup from "./DefaultGroup";

export default class BulletGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);

        
    }

    onc_collision(bullet, onc){
        this.scene.bullets.remove_element(bullet);
    }

    enemy_overlap(bullet, enemy) {
        console.log('Bullet hit an enemy!');
   
        this.scene.enemies.remove_element(enemy);
        this.scene.bullets.remove_element(bullet);
    }

    
}
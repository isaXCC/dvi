import DefaultGroup from "./DefaultGroup";
import get_norm_dist from "../../utils/vector";

export default class EnemyGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);
    }

    playerCollision(player, enemy) {
        if(enemy.active){
            if (player.isInvulnerable()) return;
            this.scene.physics.world.separate(player, enemy);
    
            console.log('touch damage');
            
            // Decoupled the logic so we can extend it later with
            // different amounts of damage and types of attacks
            player.takeDamage(enemy);
    
            enemy._touch_damage = true;
            let rate = 150;
            let {x_norm, y_norm} = get_norm_dist(player.x, player.y, enemy.x, enemy.y);
            enemy.setVelocity(x_norm*rate, y_norm*rate);
    
            this.scene.time.delayedCall(300, () => {
                if(enemy.active){
                    enemy._touch_damage = false;
                    enemy.body.setVelocity(0, 0); // Stop enemy movement
                }
            });
        }
    }

    getHealed(amount){
        this.group.getChildren().forEach(enemy => enemy.getHealed(amount));
    }

    takeDamage(amount){
        this.group.getChildren().forEach(enemy => enemy.takeDamage(amount));
    }

    removeDead(){
        this.group.getChildren().forEach(enemy => {
            if(!enemy._isAlive) this.removeElement(enemy);
        });
    }
}
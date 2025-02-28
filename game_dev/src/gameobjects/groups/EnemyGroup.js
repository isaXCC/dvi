import DefaultGroup from "./DefaultGroup";
import get_norm_dist from "../../utils/vector";

export default class EnemyGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);
    }

    player_collision(player, enemy) {
        if(enemy.active){
            if (player._invulnerable) return;
    
            console.log('touch damage');
    
            player._invulnerable = true;
            player._life--;
            console.log(player._life);
    
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
    
            this.scene.time.delayedCall(500, () => {
                player._invulnerable = false;
            });
        }
    }
}
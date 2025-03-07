import DefaultGroup from "./DefaultGroup";
import getNormDist from "../../utils/vector";
import PARAMETERS from "../../parameters";

export default class HoleGroup extends DefaultGroup {

    constructor(scene) {
        super(scene, true, true);
        this.falling = false;
    }
    
    playerOverlap(player, hole) {
        if(!this.falling){
            this.scene.sound.play('fallingSound', { volume: 2 });
            this.falling = true;
            let prev_x =  player.x, prev_y = player.y;
            let speed = player._speed;
            player._speed = 0;
            player.setPosition((player.x+hole.x)/2, (player.y+hole.y)/2)
            this.scene.tweens.add({
                targets: player,
                scaleX: 0, 
                scaleY: 0,
                duration: PARAMETERS.HOLE.DURATION, // 1 second
                ease: 'Sine',
                onComplete: () => {
                    player.setScale(58/38, 58/38);
                    let {x_norm, y_norm} = getNormDist(hole.x, hole.y, prev_x, prev_y);
                    player.setPosition((x_norm*2)+prev_x, (y_norm*2)+prev_y);
                    player.setSize(24, 25).setOffset(20, 22.5);
                    this.scene.time.delayedCall(PARAMETERS.HOLE.DELAY, () => {
                        player._speed = speed;
                        this.falling = false;
                    });
                }
            });
        }
        
    }

}
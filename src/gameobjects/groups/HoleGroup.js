import DefaultGroup from "./DefaultGroup";
import getNormDist from "../../utils/vector";
import PARAMETERS from "../../parameters";
import CONDITIONS from "../../dungeons/conditions";

export default class HoleGroup extends DefaultGroup {

    constructor(scene) {
        super(scene, true, true);
        this.falling = false;
    }
    
    playerOverlap(player, hole) {
        if(!this.falling){
            let time_falling = PARAMETERS.HOLE.DURATION;
            if(this.scene.scene.key === "d1_pit"){
                if(!CONDITIONS.D1.BOOTS){
                    player.fallHole();
                }
                else{
                    time_falling = PARAMETERS.HOLE.DURATION_BOSS;
                }
            }
            else{
                player.fallHole();
            }
            this.scene.sound.play('fallingSound', { volume: 2 });
            this.falling = true;
            player._isFalling = true;
            let prev_x =  player.x, prev_y = player.y;
            let hole_x = hole.x + 32, hole_y = hole.y + 32;
            let speed = player._speed;
            player._speed = 0;
            player.setPosition((player.x+hole_x)/2, (player.y+hole_y)/2);
            this.scene.tweens.add({
                targets: player,
                scaleX: 0, 
                scaleY: 0,
                duration: time_falling, // 1 second
                ease: 'Sine',
                onComplete: () => {
                    // Special condition for D_PIT
                    if(this.scene.scene.key === "d1_pit"){
                        CONDITIONS.D1.PIT = true;
                        if(CONDITIONS.D1.BOOTS){
                            this.scene.nextRoom("d1_boss");
                            return;
                        }
                        else{
                            this.scene.enterDialogue('d1_pit');
                        }
                    }
                    player.setScale(58/38, 58/38);
                    let {x_norm, y_norm} = getNormDist(hole_x, hole_y, prev_x, prev_y);
                    player.setPosition((x_norm*PARAMETERS.HOLE.RESPAWN_DISTANCE)+prev_x, (y_norm*PARAMETERS.HOLE.RESPAWN_DISTANCE)+prev_y);
                    player.setSize(24, 25).setOffset(20, 22.5);
                    this.scene.time.delayedCall(PARAMETERS.HOLE.DELAY, () => {
                        player._speed = speed;
                        this.falling = false;
                        player._isFalling = false;
                    });
                }
            });
        }
        
    }

}
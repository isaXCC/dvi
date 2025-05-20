import DefaultGroup from "./DefaultGroup";
import getNormDist from "../../utils/vector";
import PARAMETERS from "../../parameters";

export default class FireGroup extends DefaultGroup {

    constructor(scene) {
        super(scene, true, true);
        this.took_damage = false;
    }
    
    playerOverlap(player, fire) {
        //console.log(this.took_damage);
        //console.log(player._isDashing);
        if(!this.took_damage && !player._isDashing){
            console.log("player is taking damage")
            player.takeDamage(fire);
            this.took_damage = true;
            this.scene.time.delayedCall(3000, () => {
                console.log("player can take damage again");
                this.took_damage = false;
            });
        }
        
        
    }

}
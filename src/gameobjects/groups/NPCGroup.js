import DefaultGroup from "./DefaultGroup";
import CONDITIONS from "../../dungeons/conditions"

export default class NPCGroup extends DefaultGroup {

    constructor(scene) {
        super(scene, true, true);
    }
    
    playerCollision(player, npc) {

    }

    playerOverlap(ghost_hitbox, npc) {
        if(npc.active && npc._dialoguePending){
            this.scene.enterDialogue();
            npc._dialoguePending = false;
            ghost_hitbox.destroy();
            if(npc.nameNPC === "mice_kid"){CONDITIONS.D1.MICE_FAMILY = true;
                                        CONDITIONS.D1.MICE_KID = true;
                                        npc.destroy();
            };
        }
    }

}
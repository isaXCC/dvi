import DefaultGroup from "./DefaultGroup";

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
        }
    }

}
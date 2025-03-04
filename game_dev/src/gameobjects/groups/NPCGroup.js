import DefaultGroup from "./DefaultGroup";

export default class NPCGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);
    }

    dontMove(){
        this.group.getChildren().forEach(element => element.setImmovable(true));
    }
    
    playerCollision(player, npc) {
        if(npc.active && npc._dialoguePending){
            this.scene.enterDialogue();
            npc._dialoguePending = false;
        }
    }

}
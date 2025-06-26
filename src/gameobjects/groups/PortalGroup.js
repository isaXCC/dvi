import StrongBox from "../utils/strongBox";
import DefaultGroup from "./DefaultGroup";
import CONDITIONS from "../../dungeons/conditions"

export default class PortalGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerOverlap(ghost_hitbox, portal) {
        if(!portal.isBlocked){
            portal.transitionRoom();
        }
        // the portal is a blocked strongbox
        else if(portal instanceof StrongBox){
            this.scene.enterDialogue('strongbox');
        }
        ghost_hitbox.destroy();
    }
}
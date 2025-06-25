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
            ghost_hitbox.destroy();
        }
        // the portal is a blocked strongbox
        else if(portal instanceof StrongBox){
            this.scene.enterDialogue('strongbox');
            ghost_hitbox.destroy();
            this.scene.scene.get(this.scene.key).events.once('resume', () => {
                CONDITIONS.D2.STRONGBOX_OPEN = true;
            });
        }
    }
}
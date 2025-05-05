import DefaultGroup from "./DefaultGroup";

export default class PortalGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerOverlap(ghost_hitbox, portal) {
        if(!portal.isBlocked){
            portal.transitionRoom();
        }
        ghost_hitbox.destroy();
    }
}
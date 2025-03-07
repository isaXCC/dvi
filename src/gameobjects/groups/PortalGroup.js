import DefaultGroup from "./DefaultGroup";

export default class PortalGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerOverlap(ghost_hitbox, portal) {
        console.log(`Player is on a portal!`);
        portal.transitionRoom();
        ghost_hitbox.destroy();
    }
}
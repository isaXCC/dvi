import DefaultGroup from "./DefaultGroup";

export default class PortalGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerOverlap(player, portal) {
        console.log(`Player is on a portal!`);
        portal.activate();
    }

    transitionRoom(){
        this.group.getChildren().forEach(portal => portal.transitionRoom());
    }

    deactivate(){
        this.group.getChildren().forEach(portal => portal.deactivate());
    }
}
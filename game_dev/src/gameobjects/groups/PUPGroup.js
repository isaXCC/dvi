import DefaultGroup from "./DefaultGroup";

export default class PUPGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerOverlap(player, powerup) {
        player.pickPowerUp(powerup);
    }
}
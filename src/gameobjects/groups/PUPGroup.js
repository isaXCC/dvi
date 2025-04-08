import DefaultGroup from "./DefaultGroup";

export default class PUPGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerOverlap(player, powerup) {
        if(powerup.isStored()){
            player.pickPowerUp(powerup);
        }
        else{
            player.pickItem(powerup);
        }
    }
}
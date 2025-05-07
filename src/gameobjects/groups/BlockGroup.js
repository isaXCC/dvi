import DefaultGroup from "./DefaultGroup";

export default class BlockGroup extends DefaultGroup {

    constructor(scene) {
        super(scene);        
    }

    playerCollision(player, block) {

    }

    removeDead(){
        this.group.getChildren().forEach(block => {
            if(!block._isAlive) this.removeElement(block);
        });
    }

}
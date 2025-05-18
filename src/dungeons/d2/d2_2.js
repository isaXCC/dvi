import Room from '../room.js'
import CONDITIONS from '../conditions.js';

export default class D2_2 extends Room {

    constructor() {
        super('d2_2');
    }

    create() {
        super.generateTiled('d2_2'); 
        super.create();
        if(!CONDITIONS.D2.D2_2_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D2.D2_2_KILLED && this.enemies.isEmpty()){
            CONDITIONS.D2.D2_2_KILLED = true;
            super.destroyBlocks();
        }
    }

}
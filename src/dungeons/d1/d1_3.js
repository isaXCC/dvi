import Room from '../room.js'
import CONDITIONS from '../conditions.js';

export default class D1_3 extends Room {

    constructor() {
        super('d1_3');
    }

    create() {
        super.generateTiled('d1_3'); 
        super.create();
        if(!CONDITIONS.D1.D1_3_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D1.D1_3_KILLED && this.enemies.isEmpty()){
            CONDITIONS.D1.D1_3_KILLED = true;
            super.destroyBlocks();
        }
    }

}
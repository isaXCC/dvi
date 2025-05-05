import CONDITIONS from '../conditions.js';
import Room from '../room.js'

export default class D1_10 extends Room {

    constructor() {
        super('d1_10');
    }

    create() {
        super.generateTiled('d1_10'); 
        super.create();
        if(!CONDITIONS.D1.D1_10_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D1.D1_10_KILLED && this.enemies.isEmpty()){
            CONDITIONS.D1.D1_10_KILLED = true;
            super.destroyBlocks();
        }
    }

}
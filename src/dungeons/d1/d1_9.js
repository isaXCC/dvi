import CONDITIONS from '../conditions.js';
import Room from '../room.js'

export default class D1_9 extends Room {

    constructor() {
        super('d1_9');
    }

    create() {
        super.generateTiled('d1_9'); 
        super.create();
        if(!CONDITIONS.D1.D1_9_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D1.D1_9_KILLED && this.enemies.isEmpty()){
            CONDITIONS.D1.D1_9_KILLED = true;
            super.destroyBlocks();
        }
    }

}
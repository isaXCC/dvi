import CONDITIONS from '../conditions.js';
import Room from '../room.js'

export default class D2_4 extends Room {

    constructor() {
        super('d2_4');
    }

    create() {
        super.generateTiled('d2_4'); 
        super.create();
        if(!CONDITIONS.D2.D2_4_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D2.D2_4_KILLED && this.enemies.isEmpty()){
            CONDITIONS.D2.D2_4_KILLED = true;
            super.destroyBlocks();
        }
    }

}
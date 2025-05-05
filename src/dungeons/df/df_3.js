import CONDITIONS from '../conditions.js';
import Room from '../room.js'

export default class DF_3 extends Room {

    constructor() {
        super('df_3');
    }

    create() {
        super.generateTiled('df_3'); 
        super.create();
        if(!CONDITIONS.DF.DF_3_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.DF.DF_3_KILLED && this.enemies.isEmpty()){
            CONDITIONS.DF.DF_3_KILLED = true;
            super.destroyBlocks();
        }
    }
}
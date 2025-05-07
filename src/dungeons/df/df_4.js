import CONDITIONS from '../conditions.js';
import Room from '../room.js'

export default class DF_4 extends Room {

    constructor() {
        super('df_4');
    }

    create() {
        super.generateTiled('df_4'); 
        super.create();
        if(!CONDITIONS.DF.DF_4_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.DF.DF_4_KILLED && this.enemies.isEmpty()){
            CONDITIONS.DF.DF_4_KILLED = true;
            super.destroyBlocks();
        }
    }

}
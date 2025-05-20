import CONDITIONS from '../conditions.js';
import Room from '../room.js'

export default class DF_5 extends Room {

    constructor() {
        super('df_5');
    }

    create() {
        super.generateTiled('df_5'); 
        super.create();
        if(!CONDITIONS.DF.DF_5_KILLED)
            super.generateBlocks();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.DF.DF_5_KILLED && this.enemies.isEmpty()){
            CONDITIONS.DF.DF_5_KILLED = true;
            super.destroyBlocks();
        }
    }

}
import Room from '../room.js'
import CONDITIONS from '../conditions.js';

export default class D2_10 extends Room {

    constructor() {
        super('d2_10');
    }

    create() {
        super.generateTiled('d2_10'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
          if(!CONDITIONS.D2.D2_10_KILLED && this.enemies.isEmpty()){
             CONDITIONS.D2.D2_10_KILLED = true;
        }
    }

}
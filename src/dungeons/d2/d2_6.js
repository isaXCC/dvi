import Room from '../room.js'
import CONDITIONS from '../conditions.js';

export default class D2_6 extends Room {

    constructor() {
        super('d2_6');
    }

    create() {
        super.generateTiled('d2_6'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        this.npcs;
        if(!CONDITIONS.D2.D2_6_KILLED && this.enemies.isEmpty()){
             CONDITIONS.D2.D2_6_KILLED = true;
        }
    }

}
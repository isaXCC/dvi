import Room from '../room.js'
import DummyAngel from '../../gameobjects/enemies/dummy_angel.js';
import CONDITIONS from '../conditions.js';

export default class D1_MID extends Room {

    constructor() {
        super('d1_mid');
    }

    create() {
        super.generateTiled('d1_mid'); 
        super.create();
        if(!CONDITIONS.D1.KILLED_ANGEL){
            this.enemies.addElement(new DummyAngel(this, 225, 160));
        }
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
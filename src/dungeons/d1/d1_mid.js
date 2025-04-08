import Room from '../room.js'
import DummyAngel from '../../gameobjects/enemies/dummy_angel.js';

export default class D1_MID extends Room {

    constructor() {
        super('d1_mid');
    }

    create() {
        super.generateTiled('d1_mid'); 
        super.create();
        this.enemies.addElement(new DummyAngel(this, 225, 160));
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
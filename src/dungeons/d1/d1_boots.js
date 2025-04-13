import Room from '../room.js'
import Boots from '../../gameobjects/powerups/boots.js';

export default class D1_BOOTS extends Room {

    constructor() {
        super('d1_boots');
    }

    create() {
        super.generateTiled('d1_boots'); 
        super.create();
        this.powerups.addElement(new Boots(this.player, this, 14*64 +32, 2*64 +32));
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
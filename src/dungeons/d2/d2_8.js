import Room from '../room.js'
import Chili from '../../gameobjects/powerups/chili.js';

export default class D2_8 extends Room {

    constructor() {
        super('d2_8');
    }

    create() {
        super.generateTiled('d2_8'); 
        super.create();;
        this.powerups.addElement(new Chili(this.player, this.player.scene, 510, 160));
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
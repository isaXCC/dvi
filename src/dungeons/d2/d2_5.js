import Room from '../room.js'
import IceCube from '../../gameobjects/powerups/icecube.js';

export default class D2_5 extends Room {

    constructor() {
        super('d2_5');
    }

    create() {
        super.generateTiled('d2_5'); 
        super.create();;
        this.powerups.addElement(new IceCube(this.player, this.player.scene, 800, 290));
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
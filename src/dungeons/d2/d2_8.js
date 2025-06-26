import Room from '../room.js'
import Chili from '../../gameobjects/powerups/chili.js';
import CONDITIONS from '../conditions.js';

export default class D2_8 extends Room {

    constructor() {
        super('d2_8');
    }

    create() {
        super.generateTiled('d2_8'); 
        super.create();
        if(!CONDITIONS.D2.D2_8_KILLED){
            this.powerups.addElement(new Chili(this.player, this.player.scene, 510, 160));
            this.generateBlocks();
        }
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D2.D2_8_KILLED && this.enemies.isEmpty()){
            CONDITIONS.D2.D2_8_KILLED = true;
            this.destroyBlocks();
        }
    }

}
import Room from '../room.js'
import IceCube from '../../gameobjects/powerups/icecube.js';
import CONDITIONS from '../conditions.js';

export default class D2_5 extends Room {

    constructor() {
        super('d2_5');
    }

    create() {
        super.generateTiled('d2_5'); 
        super.create();

        if(!CONDITIONS.D2.D2_5_KILLED){
            this.powerups.addElement(new IceCube(this.player, this.player.scene, 800, 290));
            this.generateBlocks();
        }
 
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(!CONDITIONS.D2.D2_5_KILLED && this.enemies.isEmpty()){
             CONDITIONS.D2.D2_5_KILLED = true;
            this.destroyBlocks();
        }
    }

}
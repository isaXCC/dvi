import Room from '../room.js'
import CONDITIONS from '../conditions.js'
import HeartUp from '../../gameobjects/powerups/heartup.js';
import PARAMETERS from '../../parameters.js';

export default class D1_8 extends Room {

    constructor() {
        super('d1_8');
    }

    create() {
        super.generateTiled('d1_8'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        if(CONDITIONS.D1.MICE_KID){
            CONDITIONS.D1.MICE_KID = false;
            this.powerups.addElement(new HeartUp(this.player, this, PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2));
        }
    }

}
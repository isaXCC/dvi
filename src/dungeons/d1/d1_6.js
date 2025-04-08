import AllEnemiesKilledCondition from '../timeattack/conditions/AllEnemiesKilledCondition.js';
import Room from '../room.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';
import PARAMETERS from '../../parameters.js';

export default class D1_6 extends Room {

    constructor() {
        super('d1_6');
    }

    create() {
        super.generateTiled('d1_6'); 
        super.create();        
        // this room have a TIME ATK
        this.time_attack_room = new TimeAttackRoom(this, 30, new AllEnemiesKilledCondition(this), 'TripleShot', 
        7*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 4*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET);
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
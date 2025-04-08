import AllEnemiesKilledCondition from '../timeattack/conditions/AllEnemiesKilledCondition.js';
import Room from '../room.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';
import PARAMETERS from '../../parameters.js';

export default class D1_11 extends Room {

    constructor() {
        super('d1_11');
    }

    create() {
        super.generateTiled('d1_11'); 
        super.create();
        // this room have a TIME ATK
        this.time_attack_room = new TimeAttackRoom(this, 60, new AllEnemiesKilledCondition(this), 'HeartUp', 
        7*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 4*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET);
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
import AllEnemiesKilledCondition from '../timeattack/conditions/AllEnemiesKilledCondition.js';
import Room from '../room.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';
import PARAMETERS from '../../parameters.js';
import CONDITIONS from '../conditions.js';

export default class D1_11 extends Room {

    constructor() {
        super('d1_11');
    }

    create() {
        super.generateTiled('d1_11'); 
        super.create();
        // this room have a TIME ATK
        if(!CONDITIONS.D1.TIMEATK2){
            this.enterDialogue('d1_11');
            this.time_attack_room = new TimeAttackRoom(this, 60, new AllEnemiesKilledCondition(this), 'HeartUp', 
            7*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 4*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 'd1_11');        }
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
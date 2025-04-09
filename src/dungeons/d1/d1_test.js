import AllEnemiesKilledCondition from '../timeattack/conditions/AllEnemiesKilledCondition.js';
import Room from '../room.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';
import PARAMETERS from '../../parameters.js';

export default class D1_Test extends Room {

    constructor() {
        super('d1_test');
    }

    init(player_state) {
        super.init(player_state);
    }

    create() {
        super.generateTiled('d1_test'); 
        super.create();
        this.enterDialogue('d1_test');
    }

    update(){
        super.update();
    }
}
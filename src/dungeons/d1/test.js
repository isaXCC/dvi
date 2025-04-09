import AllEnemiesKilledCondition from '../timeattack/conditions/AllEnemiesKilledCondition.js';
import Room from '../room.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';
import PARAMETERS from '../../parameters.js';

export default class test extends Room {

    constructor() {
        super('test');
    }

    init(player_state) {
        super.init(player_state);
    }

    create() {
        super.generateTiled('test'); 
        super.create();
        this.enterDialogue('test');
    }

    update(){
        super.update();
    }
}
import CONDITIONS from '../conditions.js';
import PARAMETERS from '../../parameters.js';
import Room from '../room.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';
import AllEnemiesKilledCondition from '../timeattack/conditions/AllEnemiesKilledCondition.js';
import BowlingBall from '../../gameobjects/powerups/bowlingball.js';

export default class D2_4 extends Room {

    constructor() {
        super('d2_4');
    }

    create() {
        super.generateTiled('d2_4'); 
        super.create();
        this.powerups.addElement(new BowlingBall(this.player, this.player.scene, 160, 280));
        this.time.delayedCall(450, () => {
            // this room have a TIME ATK
            if(!CONDITIONS.D2.TIMEATK){
                this.enterDialogue('d2_4');
                this.time_attack_room = new TimeAttackRoom(this, 60, new AllEnemiesKilledCondition(this), 'SpeedBoost', 
                6*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 4*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 'd2_4');        
            }
        });
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
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
        super.nextLine = "PRESENTACION HITO 1" +
                        "\n Phat Boi Games apresenta: " +
                        "\n POCO porque falta MUCHO";
    }

    create() {
        super.generateTiled('test'); 
        super.create();

        // this room have a TIME ATK
        this.time_attack_room = new TimeAttackRoom(this, 15, new AllEnemiesKilledCondition(this), 'TripleShot', 
        7*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET, 4*PARAMETERS.GAME.TILE+PARAMETERS.PUP.PUP_OFFSET);
    }

    update(){
        super.update();
    }
}
import Room from '../room.js'
import SpeedBoostPowerUpBenefit from '../timeattack/benefits/SpeedBoostPowerUpBenefit.js';
import SurviveCondition from '../timeattack/conditions/SurviveCondition.js'
import TimeAttackRoom from '../timeattack/timeattackroom.js';

export default class DP_3 extends Room {

    constructor() {
        super('dp_3');
    }

    create() {

        super.generateTiled('dp_3'); 

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();

        // this room is a time attack
        this.time_attack_room = new TimeAttackRoom(this, 25, new SurviveCondition(this, 25), new SpeedBoostPowerUpBenefit(this));
    }

    init(player_state) {
        super.init(player_state);        
        super.nextLine = "This is fine...";
    }

    update(){
        super.update();
    }
}
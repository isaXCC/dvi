import Room from '../room.js'
import CONDITIONS from '../conditions.js';

export default class D2_3 extends Room {

    constructor() {
        super('d2_3');
    }

    create() {
        super.generateTiled('d2_3'); 
        super.create();

        CONDITIONS.D2.BUNNY_2 = true;
        this.events.on('shutdown', () => {
            console.log('Scene shut down');
            CONDITIONS.D2.BUNNY_2 = false;
        });
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
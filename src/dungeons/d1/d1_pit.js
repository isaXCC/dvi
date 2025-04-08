import Room from '../room.js'

export default class D1_PIT extends Room {

    constructor() {
        super('d1_pit');
    }

    create() {
        super.generateTiled('d1_pit'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
        console.log()
    }

}
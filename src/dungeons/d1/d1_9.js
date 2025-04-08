import Room from '../room.js'

export default class D1_9 extends Room {

    constructor() {
        super('d1_9');
    }

    create() {
        super.generateTiled('d1_9'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
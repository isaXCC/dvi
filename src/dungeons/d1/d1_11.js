import Room from '../room.js'

export default class D1_11 extends Room {

    constructor() {
        super('d1_11');
    }

    create() {
        super.generateTiled('d1_11'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
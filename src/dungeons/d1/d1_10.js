import Room from '../room.js'

export default class D1_10 extends Room {

    constructor() {
        super('d1_10');
    }

    create() {
        super.generateTiled('d1_10'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
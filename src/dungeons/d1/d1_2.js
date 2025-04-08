import Room from '../room.js'

export default class D1_2 extends Room {

    constructor() {
        super('d1_2');
    }

    create() {
        super.generateTiled('d1_2'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
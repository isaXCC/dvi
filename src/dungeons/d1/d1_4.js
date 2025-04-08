import Room from '../room.js'

export default class D1_4 extends Room {

    constructor() {
        super('d1_4');
    }

    create() {
        super.generateTiled('d1_4'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
import Room from '../room.js'

export default class D1_7 extends Room {

    constructor() {
        super('d1_7');
    }

    create() {
        super.generateTiled('d1_7'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
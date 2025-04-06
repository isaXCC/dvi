import Room from '../room.js'

export default class D1_6 extends Room {

    constructor() {
        super('d1_6');
    }

    create() {
        super.generateTiled('d1_6'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
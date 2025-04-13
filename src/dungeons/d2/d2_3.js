import Room from '../room.js'

export default class D2_3 extends Room {

    constructor() {
        super('d2_3');
    }

    create() {
        super.generateTiled('d2_3'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
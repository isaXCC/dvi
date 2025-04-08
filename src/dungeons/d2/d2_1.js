import Room from '../room.js'

export default class D2_1 extends Room {

    constructor() {
        super('d2_1');
    }

    create() {
        super.generateTiled('d2_1'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
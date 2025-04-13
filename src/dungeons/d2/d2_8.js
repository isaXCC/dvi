import Room from '../room.js'

export default class D2_8 extends Room {

    constructor() {
        super('d2_8');
    }

    create() {
        super.generateTiled('d2_8'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
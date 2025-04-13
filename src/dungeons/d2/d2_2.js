import Room from '../room.js'

export default class D2_2 extends Room {

    constructor() {
        super('d2_2');
    }

    create() {
        super.generateTiled('d2_2'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
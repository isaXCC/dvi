import Room from '../room.js'

export default class D2_5 extends Room {

    constructor() {
        super('d2_5');
    }

    create() {
        super.generateTiled('d2_5'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
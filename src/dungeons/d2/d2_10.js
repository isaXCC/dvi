import Room from '../room.js'

export default class D2_10 extends Room {

    constructor() {
        super('d2_10');
    }

    create() {
        super.generateTiled('d2_10'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
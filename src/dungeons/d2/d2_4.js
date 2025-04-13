import Room from '../room.js'

export default class D2_4 extends Room {

    constructor() {
        super('d2_4');
    }

    create() {
        super.generateTiled('d2_4'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
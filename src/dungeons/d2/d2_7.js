import Room from '../room.js'

export default class D2_7 extends Room {

    constructor() {
        super('d2_7');
    }

    create() {
        super.generateTiled('d2_7'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
import Room from '../room.js'

export default class D2_6 extends Room {

    constructor() {
        super('d2_6');
    }

    create() {
        super.generateTiled('d2_6'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
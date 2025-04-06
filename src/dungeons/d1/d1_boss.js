import Room from '../room.js'

export default class D1_BOSS extends Room {

    constructor() {
        super('d1_boss');
    }

    create() {
        super.generateTiled('d1_boss'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
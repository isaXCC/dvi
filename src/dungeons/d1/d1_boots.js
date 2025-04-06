import Room from '../room.js'

export default class D1_BOOTS extends Room {

    constructor() {
        super('d1_boots');
    }

    create() {
        super.generateTiled('d1_boots'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
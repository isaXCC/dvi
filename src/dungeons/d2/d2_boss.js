import Room from '../room.js'

export default class D2_BOSS extends Room {

    constructor() {
        super('d2_boss');
    }

    create() {
        super.generateTiled('d2_boss'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
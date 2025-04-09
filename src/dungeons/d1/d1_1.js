import Room from '../room.js'

export default class D1_1 extends Room {

    constructor() {
        super('d1_1');
    }

    create() {
        super.generateTiled('d1_1'); 
        super.create();
        this.enterDialogue('d1_1');
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
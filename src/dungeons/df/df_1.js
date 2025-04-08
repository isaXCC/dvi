import Room from '../room.js'

export default class DF_1 extends Room {

    constructor() {
        super('df_1');
    }

    create() {
        super.generateTiled('df_1'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
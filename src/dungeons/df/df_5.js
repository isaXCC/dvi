import Room from '../room.js'

export default class DF_5 extends Room {

    constructor() {
        super('df_5');
    }

    create() {
        super.generateTiled('df_5'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
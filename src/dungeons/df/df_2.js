import Room from '../room.js'

export default class DF_2 extends Room {

    constructor() {
        super('df_2');
    }

    create() {
        super.generateTiled('df_2'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
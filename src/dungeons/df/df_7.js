import Room from '../room.js'

export default class DF_7 extends Room {

    constructor() {
        super('df_7');
    }

    create() {
        super.generateTiled('df_7'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
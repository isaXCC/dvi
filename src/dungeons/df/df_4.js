import Room from '../room.js'

export default class DF_4 extends Room {

    constructor() {
        super('df_4');
    }

    create() {
        super.generateTiled('df_4'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
import Room from '../room.js'

export default class DF_6 extends Room {

    constructor() {
        super('df_6');
    }

    create() {
        super.generateTiled('df_6'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
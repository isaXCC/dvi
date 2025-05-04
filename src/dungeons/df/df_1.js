import Room from '../room.js'

export default class DF_1 extends Room {

    constructor() {
        super('df_1');
    }

    create() {
        super.generateTiled('df_1'); 
        super.create();
        this.time.delayedCall(450, () => {
            this.enterDialogue('df_1');
        });
    }

    init(player_state) {
        super.init(player_state);
    }

    update(){
        super.update();
    }

}
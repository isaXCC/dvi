import Room from '../room.js'

export default class D1_MID extends Room {

    constructor() {
        super('d1_mid');
    }

    create() {
        super.generateTiled('d1_mid'); 
        super.create();
    }

    init(player_state) {
        super.init(player_state);
        super.nextLine = "There's a stranger creature with wings and no cheese threatening my nest. " 
        + "\nCan you, I don't know, kill it for me?" +
        "\n Try shooting in its face with your left CLICKing";
    }

    update(){
        super.update();
    }

}
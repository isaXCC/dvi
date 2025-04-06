import Room from '../room.js'

export default class D1_1 extends Room {

    constructor() {
        super('d1_1');
    }

    create() {
        super.generateTiled('d1_1'); 
        super.create();;
    }

    init(player_state) {
        super.init(player_state);
        super.nextLine = "Maybe WASD move lil' Cat, this is a Dungeon Crawler after all. " 
                + "\nI think... Therefore:" +
                "\nBARK BARK!";
    }

    update(){
        super.update();
    }

}
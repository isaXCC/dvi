import Room from '../room.js'

export default class DP_1 extends Room {

    constructor() {
        super('dp_1');
    }

    create() {

        super.generateTiled('dp_1'); 

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    init(player_state) {
        super.init(player_state);        
        super.nextLine = "UP BIG REWARD! I mean... \nWOOF!";
    }

    update(){
        super.update();
    }
}
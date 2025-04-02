import Room from '../room.js'

export default class DP_4 extends Room {

    constructor() {
        super('dp_4');
    }

    create() {

        super.generateTiled('dp_4'); 

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    init(player_state) {
        super.init(player_state);        
        super.nextLine = "THANKS FOR PLAYING!1!!1!!!"
        + "\nWOOF WOOF!!!!!11!!!" ;
    }

    update(){
        super.update();
    }
}
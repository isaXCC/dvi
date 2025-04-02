import Room from '../room.js'

export default class DP_2 extends Room {

    constructor() {
        super('dp_2');
    }

    create() {

        super.generateTiled('dp_2'); 

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    init(player_state) {
        super.init(player_state);        
        super.nextLine = "How the hell did you get this far!?!?!?!?!?! :OOO"
        + "\nMy dog mouth actually can't do that face :("
        + "\n... Keep going left if you wish to finish this playtest x.x";
    }

    update(){
        super.update();
    }
}
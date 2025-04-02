import Room from '../room.js'

export default class DP_0 extends Room {

    constructor() {
        super('dp_0');
    }

    create() {

        super.generateTiled('dp_0'); 

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    init(player_state) {
        super.init(player_state);
        
        super.nextLine = "HAAAALOOOO";

        // The 'tutorial' is shown
        this.scene.launch('dp_0_tutorial', this);
    }

    update(){
        super.update();
    }
}
import Player from '../../gameobjects/player/player.js';
import Angel from '../../gameobjects/enemies/angel.js';
import Ophanim from '../../gameobjects/enemies/ophanim.js';
import Seraph from '../../gameobjects/enemies/seraph.js';
import Portal from '../../gameobjects/utils/portal.js';
import Bullet from '../../gameobjects/utils/bullet.js'
import Room from '../room.js'
import Phaser from 'phaser';

export default class D1_MID extends Room {

    constructor() {
        super('d1_mid');
    }

    create() {

        super.generateTiled('d1_mid'); 

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
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
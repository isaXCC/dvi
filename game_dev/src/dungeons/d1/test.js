import Player from '../../gameobjects/player/player.js';
import Angel from '../../gameobjects/enemies/angel.js';
import Ophanim from '../../gameobjects/enemies/ophanim.js';
import Seraph from '../../gameobjects/enemies/seraph.js';
import Portal from '../../gameobjects/utils/portal.js';
import NPC from '../../gameobjects/utils/npc.js'
import Room from '../room.js'
import Phaser from 'phaser';

export default class test extends Room {

    constructor() {
        super('test');
    }

    init(player_state) {
        if(player_state.life !== undefined)
            console.log('Ping + ' + player_state);
            super.setPlayerInfo(player_state);
    }

    create() {
        super.generateTiled('test'); 
        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }


    update(){
        super.update();
    }
}
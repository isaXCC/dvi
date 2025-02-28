import Player from '../../gameobjects/player/player.js';
import Angel from '../../gameobjects/enemies/angel.js';
import Ophanim from '../../gameobjects/enemies/ophanim.js';
import Seraph from '../../gameobjects/enemies/seraph.js';
import Portal from '../../gameobjects/utils/portal.js';
import Bullet from '../../gameobjects/utils/bullet.js'
import Room from '../room.js'
import Phaser from 'phaser';

export default class D1_2 extends Room {

    constructor() {
        super('d1_2');
    }

    create() {
        this.add.image(320, 256, 'room_d1_2');
        this.enemies.push(new Angel(this, 250, 450));
        this.enemies.push(new Seraph(this, 350, 400));
        this.enemies.push(new Ophanim(this, 250, 400));
        this.portals.push(new Portal(this, 320, 640, 'd1_1'));
        this.player = new Player(this, 200, 300);
        
        // works?
        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    update(){
        super.update();
    }

}
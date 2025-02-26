import Player from '../../gameobjects/player/player.js';
import Angel from '../../gameobjects/enemies/angel.js';
import Ophanim from '../../gameobjects/enemies/ophanim.js';
import Seraph from '../../gameobjects/enemies/seraph.js';
import Portal from '../../gameobjects/utils/portal.js';
import Bullet from '../../gameobjects/utils/bullet.js'
import Room from '../room.js'
import Phaser from 'phaser';

export default class D1_1 extends Room {

    constructor() {
        super('d1_1');
    }

    create() {
        // Load gameobjects
        this.add.image(0, 0, 'room_d1_1').setOrigin(0, 0);
        this.enemies.push(new Angel(this, 250, 400));
        this.portals.push(new Portal(this, 320, 0, 'd1_2'));
        this.player = new Player(this, 200, 300);

        super.create();

        // Play the music
        this.music = this.sound.add('backgroundMusic', { loop: true, volume: 0.2 });
        this.music.play();
    }

    init(pl) {
        //this.player._life = pl;
    }

    update(){
        super.update();
    }

    nextRoom(){
        // console.log('Room ' + nextRoom);
        this.music.stop();
        // this.scene.stop('d1_1');
        this.scene.start('d1_2', {x:20, y:30});
    }

}
import Phaser from 'phaser'

import room_d1_2 from '../assets/sprites/misc/room_d1_2.png'
import room_d1_1 from '../assets/sprites/misc/room_d1_1.png'
import loading from '../assets/sprites/misc/loading.png'
import angel from '../assets/sprites/enemies/angel.png'
import ophanim from '../assets/sprites/enemies/ophanim.png'
import seraph from '../assets/sprites/enemies/seraph.png'
import player from '../assets/sprites/player/player.png'
import bullet from '../assets/sprites/utils/bullet.png'
import portal from '../assets/sprites/utils/portal.png'
import hearts from '../assets/sprites/utils/hearts.png'
import shootSound from '../assets/audio/utils/shoot.wav'
import reloadSound from '../assets/audio/utils/reload.wav'
import backgroundMusic from '../assets/audio/music/backgroundMusic.mp3'


/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */ 
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');
    this.load.image('loading', loading);
    this.load.image('angel', angel);
    this.load.image('seraph', seraph);
    this.load.image('ophanim', ophanim);
    this.load.image('room_d1_2', room_d1_2);
    this.load.image('room_d1_1', room_d1_1);
    this.load.image('player', player);
    this.load.spritesheet('hearts', hearts, {frameWidth:16, frameHeight:16});
    this.load.image('bullet', bullet);
    this.load.image('portal', portal);
    this.load.audio('shootSound', shootSound);
    this.load.audio('reloadSound', reloadSound);
    this.load.audio('backgroundMusic', backgroundMusic);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.add.image(320, 256, 'loading');
    this.scene.start('d1_1');
  }
}
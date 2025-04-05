import Phaser from 'phaser'

import loading from '../assets/sprites/misc/loading.png'
import angel from '../assets/sprites/enemies/angel_spreadsheet.png'
import angel_atlas from '../assets/sprites/enemies/angel_atlas.json'
import ophanim from '../assets/sprites/enemies/ophanim_spreadsheet.png'
import ophanim_atlas from '../assets/sprites/enemies/ophanim_atlas.json'
import seraph from '../assets/sprites/enemies/seraph_spreadsheet.png'
import seraph_atlas from '../assets/sprites/enemies/seraph_atlas.json'
import player from '../assets/sprites/player/player.png'
import player_atlas from '../assets/sprites/player/player_atlas.json'
import bullet from '../assets/sprites/utils/bullet.png'
import fireball from '../assets/sprites/utils/fireball.png'
import portal from '../assets/sprites/utils/portal.png'
import activated_portal from '../assets/sprites/utils/activated_portal.png'
import npcs from '../assets/sprites/utils/NPCs_spreadsheet.png'
import npcs_atlas from '../assets/sprites/utils/npc_atlas.json'
import hearts from '../assets/sprites/utils/hearts.png'
import stamina from '../assets/sprites/utils/stamina.png'
import speedboost from '../assets/sprites/utils/speedboost.png'
import tripleshot from '../assets/sprites/utils/tripleshot.png'
import hole from '../assets/sprites/utils/hole.png'
import fire from '../assets/sprites/utils/fire.png'
// SOUND IMPORTS
import player_shoot from '../assets/audio/utils/player_shoot.wav'
import player_reload from '../assets/audio/utils/player_reload.wav'
import player_falling from '../assets/audio/utils/player_falling.wav'
import player_hurt from '../assets/audio/utils/player_hurt.wav'
import enemy_hurt from '../assets/audio/utils/enemy_hurt.wav'
import enemy_shoot from '../assets/audio/utils/enemy_shoot.wav'
import backgroundMusic from '../assets/audio/music/backgroundMusic.mp3'
import powerup_pick from '../assets/audio/utils/powerup_pick.wav'
import time_attack_succeded from '../assets/audio/utils/time_attack_succeded.wav'
import time_attack_failed from '../assets/audio/utils/time_attack_failed.wav'
// TILED IMPORTS
import test from '../assets/tiled/test.json'
import d1_1 from '../assets/tiled/d1_1.json'
import d1_2 from '../assets/tiled/d1_2.json'
import d1_mid from '../assets/tiled/d1_mid.json'
import room_tiles from '../assets/tiled/room_tileset.png'


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

    // shows the progress
    this.progress_bar();  // HE LITERALMENTE COPIADO LA BARRA DEL EJEMPLO DE ARRIBA, SE PODRÍAN PERSONALIZAR UN POCO (SE PUEDEN HACER COSAS MUY CHULAS)

    // loading each sprite
    this.load.image('loading', loading);
    this.load.atlas('angel', angel, angel_atlas);
    this.load.atlas('seraph', seraph, seraph_atlas);
    this.load.atlas('ophanim', ophanim, ophanim_atlas);
    this.load.atlas('player', player, player_atlas);
    this.load.atlas('npcs', npcs, npcs_atlas);
    this.load.image('bullet', bullet);
    this.load.image('fireball', fireball);
    this.load.image('portal', portal);
    this.load.image('activated_portal', activated_portal);
    this.load.image('tripleshot', tripleshot);
    this.load.image('speedboost', speedboost);
    this.load.image('hole', hole);
    this.load.image('fire', fire);
    this.load.spritesheet('hearts', hearts, {frameWidth: 22, frameHeight: 19});
    this.load.spritesheet('stamina', stamina, {frameWidth: 32, frameHeight: 8});
    // SOUNDS PRELOAD
    this.load.audio('shootSound', player_shoot);
    this.load.audio('reloadSound', player_reload);
    this.load.audio('player_hurt', player_hurt);
    this.load.audio('fallingSound', player_falling);
    this.load.audio('enemy_shoot', enemy_shoot);
    this.load.audio('enemy_hurt', enemy_hurt);
    this.load.audio('backgroundMusic', backgroundMusic);
    this.load.audio('powerup_pick', powerup_pick);
    this.load.audio('time_attack_succeded', time_attack_succeded);
    this.load.audio('time_attack_failed', time_attack_failed);
    // TILED PRELOAD
    this.load.image('room_tiles', room_tiles);
    this.load.tilemapTiledJSON('test', test);
    this.load.tilemapTiledJSON('d1_1', d1_1);
    this.load.tilemapTiledJSON('d1_2', d1_2);
    this.load.tilemapTiledJSON('d1_mid', d1_mid);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.add.image(320, 256, 'loading');
    this.scene.start('test');
  }

  // creates, manages and shows the initial loading progress bar
  progress_bar(){
      // atributes needed
      var width = this.cameras.main.width;
      var height = this.cameras.main.height;

      let progressBoxWidth = 420;
      let progressBoxHeigth = 50;
      let progressBarHeigth = 30;

      // the bar itself: a box as a container and the bar
      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect((width - progressBoxWidth)/2, (height - progressBoxHeigth)/2, progressBoxWidth, progressBoxHeigth);

      // to add loading text
      var loadingText = this.make.text({
          x: width / 2,
          y: height / 2 - progressBoxHeigth,
          text: 'Loading...',
          style: {
              font: '20px monospace',
              fill: '#ffffff'
          }
      });
      loadingText.setOrigin(0.5, 0.5);

      // to add the percentage completion
      var percentText = this.make.text({
          x: width / 2,
          y: height / 2,
          text: '0%',
          style: {
              font: '18px monospace',
              fill: '#ffffff'
          }
      });
      percentText.setOrigin(0.5, 0.5);

      // to add each asset loaded
      var assetText = this.make.text({
          x: width / 2,
          y: height / 2 + progressBoxHeigth,
          text: '',
          style: {
              font: '18px monospace',
              fill: '#ffffff'
          }
      });
      assetText.setOrigin(0.5, 0.5);

      // callback that updates the percentage of completion
      this.load.on('progress', function (value) {
          console.log(value);
          percentText.setText(parseInt(value * 100) + '%');
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect((width - progressBoxWidth)/2, (height - progressBarHeigth)/2, progressBoxWidth * value, progressBarHeigth);
      });
         
      // callback that shows the last asset loaded succesfully
      this.load.on('fileprogress', function (file) {
          console.log(file.src);
          assetText.setText('Loading asset: ' + file.key);
      });

      // callback that completes the operation, destroying all the objects on screen
      this.load.on('complete', function () {
          console.log('complete');
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          percentText.destroy();
          assetText.destroy();
      })
  }
}
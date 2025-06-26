import Phaser from 'phaser'

import loading from '../assets/sprites/misc/loading.png'
// Enemies
import angel from '../assets/sprites/enemies/angel_spreadsheet.png'
import angel_atlas from '../assets/sprites/enemies/angel_atlas.json'
import ophanim from '../assets/sprites/enemies/ophanim_spreadsheet.png'
import ophanim_atlas from '../assets/sprites/enemies/ophanim_atlas.json'
import seraph from '../assets/sprites/enemies/seraph_spreadsheet.png'
import seraph_atlas from '../assets/sprites/enemies/seraph_atlas.json'
import hoarder from '../assets/sprites/enemies/hoarder.png'
import devil from '../assets/sprites/enemies/devil.png'
import richman from '../assets/sprites/enemies/richman.png'
import sword from '../assets/sprites/enemies/sword.png'
// Player
import player from '../assets/sprites/player/player.png'
import player_atlas from '../assets/sprites/player/player_atlas.json'
// Utils
import letters from '../assets/sprites/utils/letter_spreadsheet.png'
import bullet from '../assets/sprites/utils/bullet.png'
import bullet_shot from '../assets/sprites/utils/bullet_shot.png'
import fireball from '../assets/sprites/utils/fireball.png'
import portal from '../assets/sprites/utils/portal.png'
import block from '../assets/sprites/utils/block.png'
import strongBox_open from '../assets/sprites/utils/strongBox_open.png'
import strongBox_closed from '../assets/sprites/utils/strongBox_closed.png'
import activated_portal from '../assets/sprites/utils/activated_portal.png'
import npcs from '../assets/sprites/utils/NPCs_spreadsheet.png'
import npcs_atlas from '../assets/sprites/utils/npc_atlas.json'
import hearts from '../assets/sprites/utils/hearts.png'
import stamina from '../assets/sprites/utils/stamina.png'
import scratch1 from '../assets/sprites/utils/scratch1.png'
import scratch2 from '../assets/sprites/utils/scratch2.png'
import scratch3 from '../assets/sprites/utils/scratch3.png'
import scratch4 from '../assets/sprites/utils/scratch4.png'
import fullscreen from '../assets/sprites/utils/fullscreen.png'
import bigshot from '../assets/sprites/utils/bigShot.png'
import snowball from '../assets/sprites/utils/snowball.png'
import bowlingshot from '../assets/sprites/utils/bowlingShot.png'
import fireshot from '../assets/sprites/utils/fireShot.png'
import note from '../assets/sprites/utils/note.png'
// POWERUPS
import speedboost from '../assets/sprites/utils/speedboost.png'
import tripleshot from '../assets/sprites/utils/tripleshot.png'
import ammoup from '../assets/sprites/utils/ammoup.png'
import boots from '../assets/sprites/utils/boots.png'
import hole from '../assets/sprites/utils/hole.png'
import hole_filled from '../assets/sprites/utils/hole_filled.png'
import fire from '../assets/sprites/utils/fire.png'
import bigbullet from '../assets/sprites/utils/bigBullet.png'
import icecube from '../assets/sprites/utils/iceCube.png'
import bowlingball from '../assets/sprites/utils/bowlingBall.png'
import chili from '../assets/sprites/utils/chili.png'
// SOUND IMPORTS
import player_shoot from '../assets/audio/utils/player_shoot.wav'
import player_dash from '../assets/audio/utils/player_dash.mp3'
import player_reload from '../assets/audio/utils/player_reload.wav'
import player_falling from '../assets/audio/utils/player_falling.wav'
import player_hurt from '../assets/audio/utils/player_hurt.wav'
import enemy_hurt from '../assets/audio/utils/enemy_hurt.wav'
import enemy_shoot from '../assets/audio/utils/enemy_shoot.wav'
import powerup_pick from '../assets/audio/utils/powerup_pick.wav'
import time_attack_succeded from '../assets/audio/utils/time_attack_succeded.wav'
import time_attack_failed from '../assets/audio/utils/time_attack_failed.wav'
import cat_meow1 from '../assets/audio/utils/cat_meow1.wav'
import cat_meow2 from '../assets/audio/utils/cat_meow2.wav'
import cat_meow3 from '../assets/audio/utils/cat_meow3.wav'
import cat_ripping1 from '../assets/audio/utils/cat_ripping1.wav'
import cat_ripping2 from '../assets/audio/utils/cat_ripping2.wav'
import fire_shoot from '../assets/audio/utils/fire_shoot.wav'
import portal_sound from '../assets/audio/utils/portal.wav'
import clock1 from '../assets/audio/utils/clock1.wav'
import clock2 from '../assets/audio/utils/clock2.wav'
import clock3 from '../assets/audio/utils/clock3.wav'
// MUSIC
//import backgroundMusic from '../assets/audio/music/backgroundMusic.mp3'
import d1Music from '../assets/audio/music/d1.mp3'
import d2Music from '../assets/audio/music/d2.mp3'
import dfMusic from '../assets/audio/music/df.mp3'
// TILED IMPORTS
import d1_test from '../assets/tiled/test.json'
import d1_1 from '../assets/tiled/d1_1.json'
import d1_2 from '../assets/tiled/d1_2.json'
import d1_3 from '../assets/tiled/d1_3.json'
import d1_mid from '../assets/tiled/d1_mid.json'
import d1_4 from '../assets/tiled/d1_4.json'
import d1_pit from '../assets/tiled/d1_pit.json'
import d1_5 from '../assets/tiled/d1_5.json'
import d1_6 from '../assets/tiled/d1_6.json'
import d1_7 from '../assets/tiled/d1_7.json'
import d1_8 from '../assets/tiled/d1_8.json'
import d1_9 from '../assets/tiled/d1_9.json'
import d1_10 from '../assets/tiled/d1_10.json'
import d1_11 from '../assets/tiled/d1_11.json'
import d1_boots from '../assets/tiled/d1_boots.json'
import d1_boss from '../assets/tiled/d1_boss.json'
import d2_1 from '../assets/tiled/d2_1.json'
import d2_2 from '../assets/tiled/d2_2.json'
import d2_3 from '../assets/tiled/d2_3.json'
import d2_4 from '../assets/tiled/d2_4.json'
import d2_5 from '../assets/tiled/d2_5.json'
import d2_6 from '../assets/tiled/d2_6.json'
import d2_7 from '../assets/tiled/d2_7.json'
import d2_8 from '../assets/tiled/d2_8.json'
import d2_9 from '../assets/tiled/d2_9.json'
import d2_10 from '../assets/tiled/d2_10.json'
import d2_boss from '../assets/tiled/d2_boss.json'
import df_1 from '../assets/tiled/df_1.json'
import df_2 from '../assets/tiled/df_2.json'
import df_3 from '../assets/tiled/df_3.json'
import df_4 from '../assets/tiled/df_4.json'
import df_5 from '../assets/tiled/df_5.json'
import df_6 from '../assets/tiled/df_6.json'
import df_7 from '../assets/tiled/df_7.json'
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
    // ENEMIES
    this.load.atlas('angel', angel, angel_atlas);
    this.load.atlas('seraph', seraph, seraph_atlas);
    this.load.atlas('ophanim', ophanim, ophanim_atlas);
    this.load.atlas('player', player, player_atlas);
    this.load.atlas('npcs', npcs, npcs_atlas);
    this.load.image('hoarder', hoarder);
    this.load.spritesheet('devil', devil, {frameWidth: 87, frameHeight: 91});
    this.load.spritesheet('richman', richman, {frameWidth: 36, frameHeight: 106})
    this.load.image('bullet', bullet);
    this.load.image('bullet_shot', bullet_shot);
    this.load.image('fireball', fireball);
    this.load.image('block', block);
    this.load.image('portal', portal);
    this.load.image('activated_portal', activated_portal);
    this.load.spritesheet('sword', sword, {frameWidth: 32, frameHeight: 54});
    this.load.image('strongBox_open', strongBox_open);
    this.load.image('strongBox_closed', strongBox_closed);
    // POWERUPS AND ITENS
    this.load.spritesheet('letters', letters, {frameWidth: 16, frameHeight: 18});
    this.load.image('tripleshot', tripleshot);
    this.load.image('ammoup', ammoup);
    this.load.image('speedboost', speedboost);
    this.load.image('boots', boots);
    this.load.image('hole', hole);
    this.load.image('hole_filled', hole_filled);
    this.load.spritesheet('fire', fire, {frameWidth: 41, frameHeight: 47});
    this.load.spritesheet('hearts', hearts, {frameWidth: 22, frameHeight: 19});
    this.load.spritesheet('stamina', stamina, {frameWidth: 6, frameHeight: 24});
    this.load.image('scratch1', scratch1);
    this.load.image('scratch2', scratch2);
    this.load.image('scratch3', scratch3);
    this.load.image('scratch4', scratch4);
    this.load.spritesheet('fullscreen', fullscreen, {frameWidth: 32, frameHeight: 32});
    this.load.image('bigBullet', bigbullet);
    this.load.image('iceCube', icecube);
    this.load.image('bowlingBall', bowlingball);
    this.load.image('chili', chili);
    this.load.image('bigShot', bigshot);
    this.load.image('snowBall', snowball);
    this.load.image('bowlingShot', bowlingshot);
    this.load.image('fireShot', fireshot);
     this.load.image('note', note);
    // SOUNDS PRELOAD
    this.load.audio('shootSound', player_shoot);
    this.load.audio('reloadSound', player_reload);
    this.load.audio('player_hurt', player_hurt);
    this.load.audio('player_dash', player_dash);
    this.load.audio('fallingSound', player_falling);
    this.load.audio('enemy_shoot', enemy_shoot);
    this.load.audio('enemy_hurt', enemy_hurt);
    this.load.audio('powerup_pick', powerup_pick);
    this.load.audio('time_attack_succeded', time_attack_succeded);
    this.load.audio('time_attack_failed', time_attack_failed);
    this.load.audio('cat_meow1', cat_meow1);
    this.load.audio('cat_meow2', cat_meow2);
    this.load.audio('cat_meow3', cat_meow3);
    this.load.audio('cat_ripping1', cat_ripping1);
    this.load.audio('cat_ripping2', cat_ripping2);
    this.load.audio('fire_shoot', fire_shoot);
    this.load.audio('portal', portal_sound);
    this.load.audio('clock1', clock1);
    this.load.audio('clock2', clock2);
    this.load.audio('clock3', clock3);
    // MUSIC
    //this.load.audio('backgroundMusic', backgroundMusic);
    this.load.audio('d1Music', d1Music);
    this.load.audio('d2Music', d2Music);
    this.load.audio('dfMusic', dfMusic);
    // TILED PRELOAD
    this.load.image('room_tiles', room_tiles);
    this.load.tilemapTiledJSON('d1_test', d1_test);
    this.load.tilemapTiledJSON('d1_1', d1_1);
    this.load.tilemapTiledJSON('d1_2', d1_2);
    this.load.tilemapTiledJSON('d1_mid', d1_mid);
    this.load.tilemapTiledJSON('d1_3', d1_3);
    this.load.tilemapTiledJSON('d1_4', d1_4); 
    this.load.tilemapTiledJSON('d1_pit', d1_pit); 
    this.load.tilemapTiledJSON('d1_5', d1_5); 
    this.load.tilemapTiledJSON('d1_6', d1_6); 
    this.load.tilemapTiledJSON('d1_7', d1_7); 
    this.load.tilemapTiledJSON('d1_8', d1_8); 
    this.load.tilemapTiledJSON('d1_9', d1_9); 
    this.load.tilemapTiledJSON('d1_10', d1_10); 
    this.load.tilemapTiledJSON('d1_11', d1_11); 
    this.load.tilemapTiledJSON('d1_boots', d1_boots); 
    this.load.tilemapTiledJSON('d1_boss', d1_boss); 
    this.load.tilemapTiledJSON('d2_1', d2_1);
    this.load.tilemapTiledJSON('d2_2', d2_2);
    this.load.tilemapTiledJSON('d2_3', d2_3);
    this.load.tilemapTiledJSON('d2_4', d2_4);
    this.load.tilemapTiledJSON('d2_5', d2_5);
    this.load.tilemapTiledJSON('d2_6', d2_6);
    this.load.tilemapTiledJSON('d2_7', d2_7);
    this.load.tilemapTiledJSON('d2_8', d2_8);
    this.load.tilemapTiledJSON('d2_9', d2_9);
    this.load.tilemapTiledJSON('d2_10', d2_10);
    this.load.tilemapTiledJSON('d2_boss', d2_boss);
    this.load.tilemapTiledJSON('df_1', df_1);
    this.load.tilemapTiledJSON('df_2', df_2);
    this.load.tilemapTiledJSON('df_3', df_3);
    this.load.tilemapTiledJSON('df_4', df_4);
    this.load.tilemapTiledJSON('df_5', df_5);
    this.load.tilemapTiledJSON('df_6', df_6);
    this.load.tilemapTiledJSON('df_7', df_7);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.add.image(320, 256, 'loading');
    this.scene.start('start_menu');
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

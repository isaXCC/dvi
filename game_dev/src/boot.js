import Phaser from 'phaser'

import room_d1_2 from '../assets/sprites/misc/room_d1_2.png'
import room_d1_1 from '../assets/sprites/misc/room_d1_1.png'
import loading from '../assets/sprites/misc/loading.png'
import angel from '../assets/sprites/enemies/angel.png'
import ophanim from '../assets/sprites/enemies/ophanim.png'
import seraph from '../assets/sprites/enemies/seraph.png'
import player from '../assets/sprites/player/player.png'
import player_atlas from '../assets/sprites/player/player_atlas.json'
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

    // shows the progress
    this.progress_bar();  // HE LITERALMENTE COPIADO LA BARRA DEL EJEMPLO DE ARRIBA, SE PODRÍAN PERSONALIZAR UN POCO (SE PUEDEN HACER COSAS MUY CHULAS)

    // loading each sprite
    this.load.image('loading', loading);
    this.load.image('angel', angel);
    this.load.image('seraph', seraph);
    this.load.image('ophanim', ophanim);
    this.load.image('room_d1_2', room_d1_2);
    this.load.image('room_d1_1', room_d1_1);
    this.load.atlas('player', player, player_atlas);
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
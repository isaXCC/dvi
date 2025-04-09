import Phaser from 'phaser'
import PARAMETERS from "./parameters.js";
import CONDITIONS from './dungeons/conditions.js';

/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'end' });
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
  create() {
    this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2, 'GAME OVER!\nStrike any key to go back to the start')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center')  // Centramos el texto dentro del cuadro de texto
        .setStyle({ fontSize: '36px' }); 

    // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
    // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
    // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
    // añada este listener pasado un segundo
    this.input.keyboard.on('keydown', function (_event) {
      if(CONDITIONS.D1.FIGHT_BOSS){
        this.scene.start('d1_boss', {life: PARAMETERS.PLAYER.MAX_LIFE});
      }
      else{
        this.scene.start('test', {life: PARAMETERS.PLAYER.MAX_LIFE});
      }
    }, this);
  }

}
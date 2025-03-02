import Boot from './boot.js';
import Dialogue from './dialogue.js';
import End from './end.js';
import Test from './dungeons/d1/test.js';
import D1_1 from './dungeons/d1/d1_1.js';
import D1_2 from './dungeons/d1/d1_2.js';
// import D1_3 from './dungeons/d1/d1_3.js';
// import D1_4 from './dungeons/d1/d1_4.js';
// import D1_5 from './dungeons/d1/d1_5.js';
// import D1_6 from './dungeons/d1/d1_6.js';
// import D1_7 from './dungeons/d1/d1_7.js';
// import D1_8 from './dungeons/d1/d1_8.js';
// import D1_9 from './dungeons/d1/d1_9.js';
// import D1_10 from './dungeons/d1/d1_10.js';
// import D1_11 from './dungeons/d1/d1_11.js';
// import D1_12 from './dungeons/d1/d1_12.js';
// import D1_13 from './dungeons/d1/d1_13.js';
// import D1_14 from './dungeons/d1/d1_14.js';
// import D1_15 from './dungeons/d1/d1_15.js';
// import D1_16 from './dungeons/d1/d1_16.js';
import D1_MID from './dungeons/d1/d1_mid.js';
// import D1_BOOTS from './dungeons/d1/d1_boots.js';
// import D1_PIT from './dungeons/d1/d1_pit.js';
// import D1_BOSS from './dungeons/d1/d1_boss.js';
import Phaser from 'phaser';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 512,
    parent: 'juego',
    scale: {
        //mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Test, Dialogue, D1_1, D1_2, D1_MID, End],
    // scene: [Boot, Test, D1_1, D1_2, D1_3, D1_4, D1_5, D1_6, D1_7,
    //         D1_8, D1_9, D1_10, D1_11, D1_12, D1_13, D1_14, D1_15,
    //         D1_16, D1_BOOTS, D1_PIT, D1_BOSS, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

new Phaser.Game(config);

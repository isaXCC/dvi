import Phaser from 'phaser'
import PARAMETERS from "./parameters.js";
import CONDITIONS from './dungeons/conditions.js';

/**
 * End scene. When the player loses all their lives.
 */
export default class End extends Phaser.Scene {

    /**
     * End constructor
     */
    constructor(reason) {
      super({ key: 'end' });
    }

    create(reason) {
        this._reason = reason;

        // death text
        this.create_death_text();

        // death reason text
        this.create_death_reason_text();

        // back to game text
        this.create_back_to_game_text();

        // listener to return to the game  
        this.input.keyboard.on('keydown-P', function (_event) {
            if(CONDITIONS.D1.FIGHT_BOSS){
              this.scene.start('d1_boss', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
            else{
              this.scene.start('d1_1', {life: PARAMETERS.PLAYER.MAX_LIFE});
            }
        }, this);
    }

    create_death_text(){
        // death text
        this.add.text(PARAMETERS.GAME.WIDTH/2 - 106, PARAMETERS.GAME.HEIGHT/2 - 100, 'YOU WERE SENT ',
            { fontFamily: 'font', fontSize: 40})
            .setOrigin(0.5, 0.5)
            .setAlign('center');

        this.add.text(PARAMETERS.GAME.WIDTH/2 + 106, PARAMETERS.GAME.HEIGHT/2 - 100, 'BACK TO HELL!',
            { fontFamily: 'font', fontSize: 40, color: '#FF0000'})
            .setOrigin(0.5, 0.5)
            .setAlign('center');
    }

    create_death_reason_text(){
        // decides text based on reason
        let text = '';
        let dr = PARAMETERS.SCENES.END.DEATH_REASON;

        switch(this._reason){
          case dr.ANGEL:
              text = 'Should\'ve dodge THAT ANGEL';
              break;
          case dr.OPHANIM:
              text = 'Those big eyes... Attractive! BUT DON\'T TOUCH THEM';
              break;
          case dr.SERAPH:
              text = '... That was stupid. Seraph doesn\'t even move.';
              break;
          case dr.FIRE:
              text = 'THIS IS NOT FINE ANYMORE, YOUR TAIL\'S ON FIRE';
              break;
          case dr.FIREBALL:
              text = 'Developers don\'t recommend touching balls on fire.';
              break;
          case dr.HOLE:
              text = 'wwuuuuuaaaaaaAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH';
              break;
        }

        // text is added
        this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2, text,
            { fontFamily: 'font', fontSize: 30})
            .setOrigin(0.5, 0.5)
            .setAlign('center');
    }

    create_back_to_game_text(){
        // text is added
        this.add.text(PARAMETERS.GAME.WIDTH/2, PARAMETERS.GAME.HEIGHT/2 + 100, 'Press \'P\' to come back to the overworld.',
          { fontFamily: 'font', fontSize: 30})
          .setOrigin(0.5, 0.5)
          .setAlign('center');
    }
}
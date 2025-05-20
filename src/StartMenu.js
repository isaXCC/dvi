import Phaser from 'phaser'
import PARAMETERS from "./parameters.js";
import CONDITIONS from './dungeons/conditions.js';

/**
 * Start Menu scene. It will be shown when player enters the page and the load bar fills succesfully
 */

export default class StartMenu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
    constructor() {
        super({ key: 'start_menu' });
    }

    create() {
        // creates the ui
        this._settings = PARAMETERS.UI.START_MENU;

        // creates the background
        this.create_background();

        // creates titel
        this.create_title();

        // creates the start button
        this.create_start_button();

        // creates the start text
        this.create_start_text();

        // creates the random extra text
        this.random_extra_text();
    }

    create_title(){
        // creates the title, in three paragraphes
        let t = this._settings.TITLE;
        this.add.text(t.P1_X, t.P1_Y, t.P1_TEXT,
            { fontFamily: 'oneup', fontSize: t.P1_SIZE, color: PARAMETERS.COLORS.PHAT_CAT_ALT}
        );

        this.add.text(t.P2_X, t.P2_Y, t.P2_TEXT,
            { fontFamily: 'oneup', fontSize: t.P2_SIZE, color: PARAMETERS.COLORS.PHAT_CAT_ALT}
        );

        this.add.text(t.P3_X, t.P3_Y, t.P3_TEXT,
            { fontFamily: 'oneup', fontSize: t.P3_SIZE, color: PARAMETERS.COLORS.DARKER_PHAT_CAT_ALT}
        );
    }

    create_start_button(){
        // rounded rectangle for the start button
        let sb = this._settings.START_BUTTON;

        // button is drawn
        this.graphics = this.add.graphics();
        this.draw_start_button(false); 

        // interactive zone over the button, so it can be functional
        this.buttonZone = this.add.zone(sb.X, sb.Y + sb.INTERACTIVE_ZONE_Y_OFFSET, 
            sb.WIDTH + sb.INTERACTIVE_ZONE_WIDTH_OFFSET, sb.HEIGHT + sb.INTERACTIVE_ZONE_HEIGHT_OFFSET)
        .setOrigin(0)
        .setInteractive();

        // button events
        this.buttonZone.on('pointerover', () => {
            this.draw_start_button(true); // is hovered
        });
    
        this.buttonZone.on('pointerout', () => {
            this.draw_start_button(false); // not hovered
        });
    
        this.buttonZone.on('pointerdown', () => {
            console.log("START button clicked");
            // fades to black
            this.fade_to_black();

            // and then, changes scene
            this.time.delayedCall(100, () => {this.scene.start('d1_1');}, [], this);
        });

    }

    draw_start_button(hovered){
        // draws the start buttom, 
        const sb = this._settings.START_BUTTON;
        const color = hovered ? PARAMETERS.COLORS.DARKER_PHAT_CAT : PARAMETERS.COLORS.PHAT_CAT;
    
        this.graphics.clear();

        this.graphics.fillStyle(color, sb.ALPHA);
        this.graphics.fillRoundedRect(sb.X, sb.Y, sb.WIDTH, sb.HEIGHT, sb.HEIGHT/3);

        // border of it
        this.graphics.lineStyle(sb.BORDER_WIDTH, 0xffffff, sb.BORDER_ALPHA);
        this.graphics.strokeRoundedRect(sb.X, sb.Y, sb.WIDTH, sb.HEIGHT, sb.HEIGHT / 3);
    }

    fade_to_black() {
        // creates a black screen
        let black_screen = this.add.graphics();
        black_screen.fillStyle(0x000000, 1);
        black_screen.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    
        // using tweens to create the fading
        this.tweens.add({
            targets: black_screen,
            alpha: 0,
            ease: 'Linear',
            duration: 1000
        });
    }

    create_start_text(){
        // text of the start button
        let st = this._settings.START_TEXT;
        this.add.text(st.X, st.Y, 'START',
            { fontFamily: 'font', fontSize: st.SIZE, stroke: '#000000', strokeThickness: st.STROKE_THICKNESS}
        );
    }

    random_extra_text(){
        // random extra text
        let et = this._settings.EXTRA_TEXT;
        let random = Phaser.Math.Between(et.MIN_TEXT, et.MAX_TEXT);

        switch(random){
            case 1:
                this.add.text(et.T1.X, et.Y, et.T1.TEXT,
                    { fontFamily: 'font', fontSize: et.FONT_SIZE, color: PARAMETERS.COLORS.RANDOM_TEXT_COLOR});
                break;
            case 2:
                this.add.text(et.T2.X, et.Y, et.T2.TEXT,
                    { fontFamily: 'font', fontSize: et.FONT_SIZE, color: PARAMETERS.COLORS.RANDOM_TEXT_COLOR});
                break;
            case 3:
                this.add.text(et.T3.X, et.Y, et.T3.TEXT,
                    { fontFamily: 'font', fontSize: et.FONT_SIZE, color: PARAMETERS.COLORS.RANDOM_TEXT_COLOR});
                break;
            case 4:
                this.add.text(et.T4.X, et.Y, et.T4.TEXT,
                    { fontFamily: 'font', fontSize: et.FONT_SIZE, color: PARAMETERS.COLORS.RANDOM_TEXT_COLOR});
                break;
            case 5:
                this.add.text(et.T5.X, et.Y, et.T5.TEXT,
                    { fontFamily: 'font', fontSize: et.FONT_SIZE, color: PARAMETERS.COLORS.RANDOM_TEXT_COLOR});
                break;
        }
    }

    create_background(){
        // adjusts background color
        this.cameras.main.setBackgroundColor(PARAMETERS.COLORS.START_MENU_BACKGROUND);

        // creates a group of bouncing phat cats
        this._bckg = this._settings.BACKGROUND;
        this.bouncers = this.physics.add.group({
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true
        });

        // creates some phat cats and makes them bouncy
        for (let i = 0; i < this._bckg.CATS_NUMBER; i++) {
            const bouncer = this.bouncers.create(
                Phaser.Math.Between(this._bckg.CAT_MIN_X, this._bckg.CAT_MAX_X),
                Phaser.Math.Between(this._bckg.CAT_MIN_Y, this._bckg.CAT_MAX_Y),
                'player',
                'phatcat_walk_down_0'
            );
        
            bouncer.setVelocity(this.random_velocity(), this.random_velocity());
        }

        // adds collider betweem bouncing phat cats
        this.physics.add.collider(this.bouncers, this.bouncers);
    }

    random_velocity() {
        // returns a velocity between two ranges
        return Phaser.Math.RND.pick([
            Phaser.Math.Between(this._bckg.CAT_MIN_VELOCITY1, this._bckg.CAT_MAX_VELOCITY1),
            Phaser.Math.Between(this._bckg.CAT_MIN_VELOCITY2, this._bckg.CAT_MAX_VELOCITY2)
        ]);
    }
}

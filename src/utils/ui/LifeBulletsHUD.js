import PARAMETERS from "../../parameters";

export default class LifeBulletsHUD extends Phaser.GameObjects.Container{
    
    /**
     * LifeBulletsHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene) {
        super(scene);

        this._scene = scene;
        this._isReloading = false;

        // creates the rounded rectangle
        this._rr = PARAMETERS.PLAYER_HUD.LIFE_BULLETS_ROUNDED_RECTANGLE_PROPERTIES;
        // rounded rectangle for life and bullets is created
        this.graphics = this._scene.add.graphics();
        this.graphics.fillStyle(0x0F060A, this._rr.ALPHA);
        this.graphics.fillRoundedRect(this._rr.X, this._rr.Y, 
            this._rr.BASE_WIDTH + Math.max(this._rr.HEART_EXTRA_WIDTH * (this._scene.player._max_life - this._rr.BASE_MAX_LIFE)/2, 0), 
            this._rr.BASE_HEIGHT, this._rr.BASE_HEIGHT/2);

        this.add(this.graphics);

        // adds hearts and bullets
        // first creates the life
        this._hearts = [];
        let heart;
        let i = 0;
        for(i; i < Math.floor(this._scene.player._max_life/2); i++){
            heart = this._scene.add.sprite(this._rr.HEART_BASE_X + i*this._rr.HEART_EXTRA_X*PARAMETERS.PLAYER_HUD.HEART_SCALE, 
                this._rr.HEART_Y, 'hearts').setFrame(2);  // creates the array of frames
            heart.setScale(PARAMETERS.PLAYER_HUD.HEART_SCALE, PARAMETERS.PLAYER_HUD.HEART_SCALE);
            this._hearts.push(heart);
        }
        this._last_life = -1;
        this._last_max_life = this._scene.player._max_life;
        
        // then creates bullets info 
        this.print_bullets();

        // the renders are added to the container
        this.add(this._hearts);
        this.add(this._info_bullets);
    }

    update(){
        
        // Detect and update max_life change
        if (this._scene.player._max_life !== this._last_max_life) {
            // Remove old hearts from scene
            this._hearts.forEach(heart => heart.destroy());

            // Recreate hearts based on new max life
            this._hearts = [];
            for (let i = 0; i < Math.floor(this._scene.player._max_life / 2); i++) {
                const heart = this._scene.add.sprite(this._rr.HEART_BASE_X + i*this._rr.HEART_EXTRA_X*PARAMETERS.PLAYER_HUD.HEART_SCALE, 
                    this._rr.HEART_Y, 'hearts');
                heart.setScale(PARAMETERS.PLAYER_HUD.HEART_SCALE);
                this._hearts.push(heart);
            }

            // Changes HUD size if necessary
            this.changeHUDSize();

            this._last_max_life = this._scene.player._max_life;
            this._last_life = -1; // force life update this frame
        }

        // updates life
        if(this._scene.player._life !== this._last_life){
            for (let i = 0; i < Math.floor(this._scene.player._max_life/2); i++) {
                if (this._scene.player._life >= (i + 1) * 2) {
                    this._hearts[i].setFrame(2); // full heart
                } else if (this._scene.player._life === (i * 2) + 1) {
                    this._hearts[i].setFrame(1); // half heart
                } else {
                    this._hearts[i].setFrame(0); // lost heart
                }
            }
            this._last_life = this._scene.player._life;
        }

        // updates bullets
        if(this._last_ammo !== this._scene.player._bullets){

            // remove old bullets from scene
            this._info_bullets.forEach(bullet => bullet.destroy());

            // recreate bullets based on new ammo
            this.print_bullets();
        }   
    }

    print_bullets(){
        this._info_bullets = [];
        let bullet;
        let i = 0;
        for(i; i < this._scene.player._bullets; i++){
            bullet = this._scene.add.image(this._rr.BULLET_BASE_X + i*this._rr.BULLET_EXTRA_X*PARAMETERS.PLAYER_HUD.BULLET_SCALE, 
                this._rr.BULLET_Y, 'bullet');  // creates the array of frames
            if(this._isReloading) bullet.setAlpha(0.5);
            this._info_bullets.push(bullet);
        }
        for(i; i < this._scene.player._max_ammo; i++){
            bullet = this._scene.add.image(this._rr.BULLET_BASE_X + i*this._rr.BULLET_EXTRA_X*PARAMETERS.PLAYER_HUD.BULLET_SCALE, 
                this._rr.BULLET_Y, 'bullet_shot');  // creates the array of frames
            this._info_bullets.push(bullet);
        }
        this._last_ammo = this._scene.player._bullets;

        // Changes HUD size if necessary
        this.changeHUDSize();
    }

    reloading(){
        // changes bullets alpha to grey, indicating that the player is reloading
        this._isReloading = true;
        this._info_bullets.forEach(bullet => bullet.setAlpha(0.5));
    }

    reloaded(){
        // changes bullets alpha to normal, player finished reloading
        this._isReloading = false;
        this._info_bullets.forEach(bullet => bullet.setAlpha(1));
    }

    changeHUDSize(){
        this.graphics.clear();
        this.graphics.fillStyle(0x0F060A, this._rr.ALPHA);
        this.graphics.fillRoundedRect(this._rr.X, this._rr.Y, this._rr.BASE_WIDTH + 
            Math.max(this._rr.HEART_EXTRA_WIDTH * this._scene.player._max_life/2,
                        this._rr.BULLET_EXTRA_WIDTH * this._scene.player._max_ammo,
                            0), 
            this._rr.BASE_HEIGHT, this._rr.BASE_HEIGHT/2);            

    }

}
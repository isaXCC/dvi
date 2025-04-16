import PARAMETERS from "../../parameters";

export default class LifeBulletsHUD extends Phaser.GameObjects.Container{
    
    /**
     * LifeBulletsHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene) {
        super(scene);

        this._scene = scene;

        // creates the rounded rectangle
        let rr = PARAMETERS.PLAYER_HUD.LIFE_BULLETS_ROUNDED_RECTANGLE_PROPERTIES;
        // rounded rectangle for life and bullets is created
        this.graphics = this._scene.add.graphics();
        this.graphics.fillStyle(0x000000, rr.ALPHA);
        this.graphics.fillRoundedRect(rr.X, rr.Y, rr.WIDTH, rr.HEIGHT, rr.HEIGHT/2);

        this.add(this.graphics);

        // adds hearts and bullets
        // first creates the life
        this._hearts = [];
        let heart;
        let i = 0;
        for(i; i < Math.floor(this._scene.player._max_life/2); i++){
            heart = this._scene.add.sprite(105 + i*32*PARAMETERS.PLAYER_HUD.HEART_SCALE, 38, 'hearts').setFrame(2);  // creates the array of frames
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
                const heart = this._scene.add.sprite(105 + i*32*PARAMETERS.PLAYER_HUD.HEART_SCALE, 38, 'hearts');
                heart.setScale(PARAMETERS.PLAYER_HUD.HEART_SCALE);
                this._hearts.push(heart);
            }

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
            bullet = this._scene.add.image(105 + i*16*PARAMETERS.PLAYER_HUD.BULLET_SCALE, 64, 'bullet');  // creates the array of frames
            this._info_bullets.push(bullet);
        }
        for(i; i < this._scene.player._max_ammo; i++){
            bullet = this._scene.add.image(105 + i*16*PARAMETERS.PLAYER_HUD.BULLET_SCALE, 64, 'bullet_shot');  // creates the array of frames
            this._info_bullets.push(bullet);
        }
        this._last_ammo = this._scene.player._bullets;
    }

}
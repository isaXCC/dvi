import PARAMETERS from "../../parameters";

export default class PowerUpJumpscareHUD extends Phaser.GameObjects.Container{
    /**
     * PowerUpJumpscareHUD constructor
     * @param {Phaser.Scene} scene HUD scene
     */

    constructor(scene) {
        super(scene);

        this._scene = scene;

        this._cr = PARAMETERS.PLAYER_HUD.POWERUP_JUMPSCARE_CIRCLE_PROPERTIES;

        // circle for powerup and jumpscare bar is created
        this.graphics = this._scene.add.graphics();
        this.graphics.lineStyle(this._cr.JS_THICKNES, 0xFFFFFF, 1); // border
        this.graphics.fillStyle(0xFFFFFF, 0.5);   // fill
        this.graphics.strokeCircle(this._cr.PUP_X, this._cr.PUP_Y, this._cr.JS_RADIUS);
        this.graphics.fillCircle(this._cr.PUP_X, this._cr.PUP_Y, this._cr.PUP_RADIUS);
        this.add(this.graphics);

        // each segment of the circle for the jumpscare display
        this._segments = [];
        this.createSegments();
    }
    
    createSegments(){
        const segment_angle = Phaser.Math.PI2 / this._cr.JS_SEGMENTS;
        this._last_take_damage_count = 1;

        // each segment is painted
        for (let i = 0; i < this._cr.JS_SEGMENTS; i++) {
            const graphics = this._scene.add.graphics();
            const angle_start = i * segment_angle - Math.PI / 2;
            const angle_end = angle_start + segment_angle;

            // color depending of its state
            const is_active = i < (this._scene.player._take_damage_count % (PARAMETERS.PLAYER.JUMPSCARE_COUNT + 1)) - 1;
            const color = is_active ? 0x00CCCC : 0x555555;

            // the arc is painted
            graphics.lineStyle(this._cr.JS_THICKNES, color, 1);
            graphics.beginPath();
            graphics.arc(this._cr.PUP_X, this._cr.PUP_Y, this._cr.JS_RADIUS, angle_start, angle_end);
            graphics.strokePath();

            // is added to the container and to the array of segments
            this.add(graphics);
            this._segments.push(graphics);
        }
        
    }

    update(){
        const segment_angle = Phaser.Math.PI2 / this._cr.JS_SEGMENTS;

        if(this._last_take_damage_count !== this._scene.player._take_damage_count){
            for (let i = 0; i < this._cr.JS_SEGMENTS; i++) {
                const graphics = this._segments[i];
                const angle_start = i * segment_angle - Math.PI / 2; // Rotar para que empiece arriba
                const angle_end = angle_start + segment_angle;

                // color depending of its state
                const is_active = i < (this._scene.player._take_damage_count % (PARAMETERS.PLAYER.JUMPSCARE_COUNT + 1)) - 1;
                let color;
                if(((this._scene.player._take_damage_count % (PARAMETERS.PLAYER.JUMPSCARE_COUNT + 1)) - 1) !== 4) 
                    color = is_active ? 0x00CCCC : 0x555555;
                else color = 0xff0000;
    
                // the current arc is cleared
                graphics.clear();

                // then is repainted
                graphics.lineStyle(this._cr.JS_THICKNES, color, 1);
                graphics.beginPath();
                graphics.arc(this._cr.PUP_X, this._cr.PUP_Y, this._cr.JS_RADIUS, angle_start, angle_end);
                graphics.strokePath();
            }
            this._last_take_damage_count = this._scene.player._take_damage_count;
        }
    }
    
}
export default class GhostHitbox extends Phaser.GameObjects.Rectangle{
    /**
     * GhostHitbox constructor
     * @param {Phaser.Scene} scene Player scene
     * @param {number} player_x Player X coord
     * @param {number} player_y Player Y coord
     * @param {object} player_hitbox Player hitbox
     * @param {number} player_direction Player direction
     */

    // player width and height has to be reescaled taking the same scale as the sprite
    // so, because these scales and hitbox offsets made in player, the position of this ghost hitbox is never a 100% perfect
    constructor(scene, player_x, player_y, player_hitbox, player_direction){
        super(scene, player_x, player_y, player_hitbox.width*58/38, player_hitbox.height*58/38);
        //console.log(player_hitbox.width + ' ' + player_hitbox.height);

        // calculates where the ghost hitbox must be placed
        this.calculte_position(player_hitbox, player_direction);

        // adds the rectangle to the scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    // calculates where the ghost hitbox must be placed
    calculte_position(player_hitbox, player_direction){

        // first, a key is generated for the direction
        let key = `${player_direction.velocityX},${player_direction.velocityY}`;
        console.log('Player is facing: ' + key);

        // then, a switch is used cleanly
        // the player hitbox offset is always taken in account to force the hitbox to be in the center of the sprite
        // after that, hitbox's center is placed at the border of the player sprite
        switch(key){
            // up
            case "0,-1":
                // adjust rectangle original position 
                this.y = this.y - this.height + player_hitbox.offsetY;
            break;
            
            // down
            case "0,1":
                this.y = this.y + player_hitbox.offsetY;
            break;

            // left
            case "-1,0":
                this.y = this.y - (this.height/2) + player_hitbox.offsetY;
                this.x = this.x - (this.width/2);
            break;

            // right
            case "1,0":
                this.y = this.y - (this.height/2) + player_hitbox.offsetY;
                this.x = this.x + player_hitbox.offsetX;
            break;

            // up left
            case "-1,-1":
                this.y = this.y - this.height + player_hitbox.offsetY;
                this.x = this.x - (this.width/2);
            break;

            // up right
            case "1,-1":
                this.y = this.y - this.height + player_hitbox.offsetY;
                this.x = this.x + player_hitbox.offsetX;
            break;

            // down left
            case "-1,1": 
                this.y = this.y + player_hitbox.offsetY;
                this.x = this.x - (this.width/2);
            break;

            // down right
            case "1,1":
                this.y = this.y + player_hitbox.offsetY;
                this.x = this.x + player_hitbox.offsetX;
            break;

            default:
                this.y = this.y - this.height + player_hitbox.offsetY;
            break;
        }
    }
}
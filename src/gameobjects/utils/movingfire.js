import PARAMETERS from "../../parameters";
import Fire from "./fire";

export default class MovingFire {
    constructor(scene, x, y, length=1, movement='horizontal', fill='right', starts=1) {
        this.scene = scene;
        this.fireballs = this.scene.physics.add.group();
        this.length = length;
        this.movement = movement;
        this.fill = fill;
        this.starts = starts;
        this.pivot = new Phaser.GameObjects.Container(scene, x, y);

        for (let i = 1; i <= this.length; i++) {
            let new_x = 0, new_y = 0;
            if(this.fill === 'up'){
                new_y = -32*i;
            }
            else if(this.fill === 'down'){
                new_y = 32*i;
            }
            else if(this.fill === 'right'){
                new_x = 32*i;
            }
            else if(this.fill === 'left'){
                new_x = -32*i;
            }
            const fireball = new Fire(scene, new_x, new_y); // place in line
            //THIS SHOULD BE REMOVED WHEN ADDED A GOOD SPRITE
            fireball.setScale(32/260, 32/360);
            fireball.setOrigin(0.5);
            //THIS SHOULD BE ADDED WHEN ADDED A GOOD SPRITE
            //fireball.setSize(PARAMETERS.FIRE.HITBOX_X, PARAMETERS.FIRE.HITBOX_Y);
            this.pivot.add(fireball);
            this.fireballs.add(fireball);
        }

        this.scene.add.existing(this.pivot);

        // Store rotation speed
        this.speedRotation = 0.01;
        this.speedSides = 1
        if(this.starts == -1){
            this.speedSides = -1
        }
        
    }

    update() {
        if(this.movement === 'vertical'){
            if (this.pivot.y > PARAMETERS.GAME.HEIGHT - 12 || this.pivot.y < 12) {
                this.speedSides *= -1;
            }
            this.pivot.y += this.speedSides;
        }
        else if(this.movement === 'horizontal'){
            if (this.pivot.x > PARAMETERS.GAME.WIDTH - 12 || this.pivot.x < 12) {
                this.speedSides *= -1;
            }
            this.pivot.x += this.speedSides;
        }
        else if(this.movement === 'clockwise'){
            this.pivot.rotation += this.speedRotation;
        }
        else if(this.movement === 'anticlockwise'){
            this.pivot.rotation -= this.speedRotation;
        }
        
        //console.log(this.pivot.x, this.pivot.y)
    }

    reverseMove(){
        console.log("hi")
    }

    oncCollision(moving_fire, onc) {
        console.log('touch');
    }

    playerOverlap(player, moving_fire) {
        if(!this.took_damage && !player._isDashing){
            console.log("player is taking damage")
            player.takeDamage();
            this.took_damage = true;
            this.scene.time.delayedCall(3000, () => {
                console.log("player can take damage again");
                this.took_damage = false;
            });
        }
    }
}


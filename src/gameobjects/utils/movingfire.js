import PARAMETERS from "../../parameters";
import Fire from "./fire";

// fill (up, down, right, left)
// length (1, ..., N)
// movement (vertical, horizontal, clockwise, anticlockwise)
// moves (-1, 1)

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
                new_y = -PARAMETERS.FIRE.HEIGHT*i;
            }
            else if(this.fill === 'down'){
                new_y = PARAMETERS.FIRE.HEIGHT*i;
            }
            else if(this.fill === 'right'){
                new_x = PARAMETERS.FIRE.WIDTH*i;
            }
            else if(this.fill === 'left'){
                new_x = -PARAMETERS.FIRE.WIDTH*i;
            }
            const fireball = new Fire(scene, new_x, new_y); // place in line
            fireball.setScale(PARAMETERS.FIRE.SCALE, PARAMETERS.FIRE.SCALE);
            // fireball.setOrigin(1.1);
            fireball.setSize(PARAMETERS.FIRE.HITBOX_X, PARAMETERS.FIRE.HITBOX_Y);
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
            // NEEDS TO BE CHECKED
            if (this.pivot.y > PARAMETERS.GAME.HEIGHT - 64*1.3 || this.pivot.y < -9 ) {
                this.speedSides *= -1;
            }
            this.pivot.y += this.speedSides;
        }
        else if(this.movement === 'horizontal'){
            if (this.pivot.x > PARAMETERS.GAME.WIDTH - 64*1.3 || this.pivot.x < -9) {
                this.speedSides *= -1;
            }
            this.pivot.x += this.speedSides;
        }
        else if(this.movement === 'clockwise'){
            this.pivot.rotation += this.speedRotation;
            this.fireballs.getChildren().forEach(element => element.rotation = -this.pivot.rotation);
        }
        else if(this.movement === 'anticlockwise'){
            this.pivot.rotation -= this.speedRotation;
            this.fireballs.getChildren().forEach(element => element.rotation = -this.pivot.rotation);
        }
        this.fireballs.getChildren().forEach(element => element.update());
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
            player.takeDamage(moving_fire);
            this.took_damage = true;
            this.scene.time.delayedCall(3000, () => {
                console.log("player can take damage again");
                this.took_damage = false;
            });
        }
    }
}


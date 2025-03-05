import Enemy from "./enemy";

export default class Angel extends Enemy{
    
    constructor(scene, x, y) {
        super(scene, x, y, 'angel');

        this._max_life = 3;
        this._life = 3;
        this._speed = 125;
    }

    move() {
        this.followPlayer();
    }

}
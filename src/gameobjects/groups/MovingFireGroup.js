export default class MovingFireGroup {

    constructor() {
        this.movingfires = [];
        this.took_damage = false;
    }

    addElement(movingfire) {
        this.movingfires.push(movingfire);
    }
    
    addOverlap(object) {
        this.movingfires.forEach(movingfire => {
            movingfire.scene.physics.add.overlap(movingfire.fireballs, object, movingfire.playerOverlap, null, movingfire);
        });
    }

    addCollision(object) {
        this.movingfires.forEach(movingfire => {
            movingfire.scene.physics.add.collider(movingfire.fireballs, object, movingfire.oncCollision, null, movingfire);
        });
    }

    update(){
        this.movingfires.forEach(movingfire => {
            movingfire.update();
        });
    }

}
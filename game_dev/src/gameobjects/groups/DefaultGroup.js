import Phaser from 'phaser'

export default class DefaultGroup {
    
    constructor(scene, collision_with_own=true) {

        this.scene = scene;

        this.group = this.scene.physics.add.group({
            collideWorldBounds: true,
            immovable: false
        })

        if(collision_with_own === true) {
            this.scene.physics.add.collider(this.group, this.group);
        }
    }

    getCorrectInstance(object){
        return object instanceof DefaultGroup ? object.group : object;
    }

    addOverlap(object, overlap_handler) {
        this.scene.physics.add.overlap(this.group, this.getCorrectInstance(object), overlap_handler, null, this);
    }

    addCollision(object, collision_handler) {
        this.scene.physics.add.collider(this.group, this.getCorrectInstance(object), collision_handler, null, this);
    }

    addElement(gameObject) {
        this.group.add(gameObject);
    }

    removeElement(gameObject){
        this.group.remove(gameObject, true, true);
    }

    update(){
        this.group.getChildren().forEach(element => element.update());
    }
}
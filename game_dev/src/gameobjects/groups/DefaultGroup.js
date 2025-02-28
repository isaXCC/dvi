import Phaser from 'phaser'

export default class DefaultGroup {
    
    constructor(scene) {

        this.scene = scene;

        this.group = this.scene.physics.add.group({
            collideWorldBounds: true,
            immovable: false
        })

        this.scene.physics.add.collider(this.group, this.group);
    }

    get_correct_instance(object){
        return object instanceof DefaultGroup ? object.group : object;
    }

    add_overlap(object, overlap_handler) {
        this.scene.physics.add.overlap(this.group, this.get_correct_instance(object), overlap_handler, null, this);
    }

    add_collision(object, collision_handler) {
        this.scene.physics.add.collider(this.group, this.get_correct_instance(object), collision_handler, null, this);
    }

    add_element(gameObject) {
        this.group.add(gameObject);
    }

    remove_element(gameObject){
        this.group.remove(gameObject, true, true);
    }

    update(){
        this.group.getChildren().forEach(element => element.update());
    }
}
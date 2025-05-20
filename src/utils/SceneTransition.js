export default class SceneTransition{

    /**
     * 
     * @param {Phaser.Scene} scene scene that transitions out
     */
    static transitionOut(scene){
        // transition circle
        const circleShape = new Phaser.Geom.Circle(scene.player.x, scene.player.y, 1000);
        const g = scene.add.graphics().fillCircleShape(circleShape).setDepth(-1);
        const mask = g.createGeometryMask();
        scene.cameras.main.setMask(mask);

        // disables player interaction and stops it
        scene.player._input_enabled = false;
        scene.player.stopPlayer();

        scene.tweens.add({
            onUpdate: () => {
                g.clear().fillCircleShape(circleShape)
            },
            delay: 0,
            duration: 300,
            radius: {
                ease: Phaser.Math.Easing.Circular.InOut,
                from: 1000,
                start: 1000,
                to: 0,
                end: 0
            },
            targets: circleShape,
            onComplete: () => {
                mask.destroy();
                scene.player._input_enabled = true;
                scene.cameras.main.clearMask()
            }
        })
    }

    /**
     * 
     * @param {Phaser.Scene} scene scene that transitions in
     */
    static transitionIn(scene){
        // transition circle
        const circleShape = new Phaser.Geom.Circle(scene.player.x, scene.player.y, 0);
        const g = scene.add.graphics().fillCircleShape(circleShape).setDepth(-1);
        const mask = g.createGeometryMask();
        scene.cameras.main.setMask(mask);

        // disables player interaction
        scene.player._input_enabled = false;

        scene.tweens.add({
            onUpdate: () => {
                g.clear().fillCircleShape(circleShape)
            },
            delay: 100,
            duration: 300,
            radius: {
                ease: Phaser.Math.Easing.Circular.InOut,
                from: 0,
                start: 0,
                to: 1000,
                end: 1000
            },
            targets: circleShape,
            onComplete: () => {
                mask.destroy();
                scene.player._input_enabled = true;
                scene.cameras.main.clearMask()
            }
        })
    }
}
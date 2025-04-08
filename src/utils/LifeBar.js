import PARAMETERS from "../parameters";

export default class LifeBar {
    constructor(scene, x, y, maxLife, currentLife) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.maxLife = maxLife;
        this.currentLife = currentLife;

        // Create a graphics object for drawing the life bar
        this.lifeBarBackground = this.scene.add.graphics();
        this.lifeBarForeground = this.scene.add.graphics();
        this.lifeBarOutline = this.scene.add.graphics();

        // Draw the outline of the life bar
        this.lifeBarOutline.lineStyle(4, 0x000000); // Black outline
        this.lifeBarOutline.strokeRoundedRect(this.x - 2, this.y - 2, 
            PARAMETERS.GAME.WIDTH - PARAMETERS.HOARDER.LIFEBAR_X*2, 14, 8);

        // Draw the background of the life bar (black)
        this.lifeBarBackground.fillStyle(0x000000);
        this.lifeBarBackground.fillRoundedRect(this.x, this.y, 
            PARAMETERS.GAME.WIDTH - PARAMETERS.HOARDER.LIFEBAR_X*2,
             10, 5);

        // Draw the foreground of the life bar (red)
        this.updateLifeBar();
    }

    updateLifeBar() {
        // Clear previous foreground
        this.lifeBarForeground.clear();

        // Calculate the percentage of life remaining
        const lifePercentage = this.currentLife / this.maxLife;
        const d = (PARAMETERS.GAME.WIDTH - PARAMETERS.HOARDER.LIFEBAR_X*2);
        const filledWidth = d * lifePercentage;

        // Draw the filled portion of the life bar (red)
        this.lifeBarForeground.fillStyle(0x871213); // Red color
        this.lifeBarForeground.fillRoundedRect(this.x, this.y, filledWidth, 10, 5);
    }

    setLife(currentLife) {
        this.currentLife = currentLife;
        this.updateLifeBar();
    }

    destroy() {
        this.lifeBarBackground.destroy();
        this.lifeBarForeground.destroy();
        this.lifeBarOutline.destroy();
    }
}

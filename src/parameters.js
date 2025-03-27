/*HOW TO USE THIS DOCUMENT:
    All the constants and parameters must be named exactly as they are in its respective classes.
    If a parameter doesn't fit one of the already established categories, use the class name,
    otherwise, if is a general parameter, put it in game.
*/


const PARAMETERS = {
    GAME: { // General configuration and parameters
        WIDTH: 1024, 
        HEIGHT: 576,
        DEBUG: true
    },
    PLAYER: {
        LIFE: 6,
        MAX_LIFE: 6,
        BULLETS: 7,
        MAX_AMMO: 7,
        STAMINA: 3,
        SPEED: 250,
        DASH_DURATION: 50, // in milliseconds
        DASH_SPEED: 2000,
        STAMINA_RECOVER: 2500, // in milliseconds
        JUMPSCARE_RECOVER: 5000, // in milliseconds
        JUMPSCARE_DAMAGE: 1
    },
    ANGEL: {
        LIFE: 6,
        MAX_LIFE: 6,
        SPEED: 50,
        DAMAGE: 1,
        IDLE_DURATION: 500, // in milliseconds
        ATK_DURATION: 800, // in milliseconds
        ATK_SPEED: 200,
        ATK_FRAMERATE: 4,
        MOVE_DURATION: 2500, // in milliseconds
        MOVE_FRAMERATE: 8,
        HEIGHT: 46,
        WIDTH: 64,
        SCALE_X: 1.5,
        SCALE_Y: 1.5,
        HITBOX_X: 46*0.8,
        HITBOX_Y: 64*0.5
    },
    OPHANIM: {
        LIFE: 6,
        MAX_LIFE: 6,
        SPEED: 50,
        DAMAGE: 1,
        IDLE_DURATION: 500, // in milliseconds
        ATK_DURATION: 800, // in milliseconds
        ATK_SPEED: 200,
        ATK_FRAMERATE: 4,
        MOVE_DURATION: 2500, // in milliseconds
        MOVE_FRAMERATE: 8,
        HEIGHT: 64,
        WIDTH: 64,
        SCALE_X: 1.7,
        SCALE_Y: 1.7,
        HITBOX_X: 64*0.5,
        HITBOX_Y: 64*0.5
    },
    SERAPH: {
        // TODO
    },
    BULLET: {
        // TODO
    },
    HOLE: {
        DURATION: 1750,
        DELAY: 500,
        HITBOX_X: 64*0.7,
        HITBOX_Y: 64*0.7,
        GRID_OFFSET_Y: -64,
        RESPAWN_DISTANCE: 12
    },
    FIRE: {
        HITBOX_X: 64*0.7,
        HITBOX_Y: 64*0.7
        //GRID_OFFSET_Y: -64,
    },
    PORTAL: {
        GRID_OFFSET_X: 32,
        GRID_OFFSET_Y: -32
    },
    DIALOGUE: {
        SCALE_X: 30,
        SCALE_Y: 0.3,
        OFFSET_X: 15,
        OFFSET_Y: 10
    },
    ROOM: {
        // TODO
    },
    SCENES: {
        // TODO
    }
};

export default PARAMETERS;
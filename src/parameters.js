/*HOW TO USE THIS DOCUMENT:
    All the constants and parameters must be named exactly as they are in its respective classes.
    If a parameter doesn't fit one of the already established categories, use the class name,
    otherwise, if is a general parameter, put it in game.
*/


const PARAMETERS = {
    GAME: { // General configuration and parameters
        WIDTH: 1024, 
        HEIGHT: 576,
        DEBUG: true,
        TILE: 64
    },
    PLAYER: {
        LIFE: 6,
        MAX_LIFE: 6,
        BULLETS: 7,
        MAX_AMMO: 7,
        STAMINA: 3,
        SPEED: 250,
        DASH_DURATION: 200, // in milliseconds
        DASH_RECOVER: 500,
        DASH_SPEED: 500,
        STAMINA_RECOVER: 2500, // in millisecond
        RELOAD_DURATION: 500,
        SHOOT_DURATION: 350,
        JUMPSCARE_DURATION: 150, // in milliseconds
        JUMPSCARE_DAMAGE: 1,
        DAMAGE_TINT: 0xE45F82
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
        HITBOX_Y: 64*0.5, 
        RAND_LOW: -250,
        RAND_HIGH: 250
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
        HITBOX_Y: 64*0.5,
        RAND_LOW: -500,
        RAND_HIGH: 500
    },
    SERAPH: {
        LIFE: 6,
        MAX_LIFE: 6,
        SPEED: 1,
        SUP_RECOVER: 5000,
        SUP_DURATION: 1000,
        SUP_EFFECT: 1,
        SCALE_X: 1.5,
        SCALE_Y: 1.5,
        HITBOX_X: 38*0.8,
        HITBOX_Y: 48*0.90,
        PATROL_LOW: 50, 
        PATROL_HIGH: 100
    },
    HOARDER: {
        LIFE: 60,
        MAX_LIFE: 60,
        SPEED: 50,
        DAMAGE: 1,
        LIFEBAR_X: 75, 
        LIFEBAR_Y: 30,
        HITBOX_X: 128*0.7,
        HITBOX_Y: 128*0.75,
        SCALE_X: 1.7,
        SCALE_Y: 1.7,
        MOVE_X: 128*0.8,
        MOVE_DURATION: 2500, // in milliseconds
        ATK_DURATION: 500, // in milliseconds
        OFFSET_Y: 85,
        MOVE_LOW: 5000, // in milliseconds
        MOVE_HIGH: 10000, // in milliseconds
        HOLE_LOW: 5000, // in milliseconds
        HOLE_HIGH: 10000 // in milliseconds
    },
    PUP: {
        PUP_OFFSET: 32
    },
    HOLE: {
        DURATION: 1750,
        DURATION_BOSS: 1750,
        DELAY: 500,
        HITBOX_X: 64*0.7,
        HITBOX_Y: 64*0.7,
        GRID_OFFSET_Y: -64,
        RESPAWN_DISTANCE: 12,
        RATIO_START_BOSS: 1/4,
        SPEED_BOSS: 1000
    },
    FIRE: {
        HITBOX_X: 64*0.7,
        HITBOX_Y: 64*0.7,
        WIDTH: 64, 
        HEIGHT: 64,
        SCALE: 1.5,
        GRID_OFFSET_X: 0,
        GRID_OFFSET_Y: -64*1.3,
        ANIMS_DURATION: 100
    },
    MOVING_FIRE: {
        GRID_OFFSET_X: -64
    },
    PORTAL: {
        GRID_OFFSET_X: 32,
        GRID_OFFSET_Y: -32
    },
    NPC: {
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
        HEART_SCALE: 1.5,
        PUP_X: 24,
        PUP_Y: 550,
        PUP_RAD: 19,
        AMMO_X: 25,
        AMMO_Y: 55
    },
    SCENES: {
        // TODO
    }
};

export default PARAMETERS;
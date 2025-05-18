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
        JUMPSCARE_INVULNERABILITY_DURATION: 1250,
        JUMPSCARE_DAMAGE: 2,
        JUMPSCARE_COUNT: 2,
        DAMAGE_TINT: 0xE45F82,
        SHAKE_DURATION: 1500,
        SHAKE_INTENSITY: 0.01,
        NUM_SCRATCHES: 12
    },
    ANGEL: {
        LIFE: 4,
        MAX_LIFE: 4,
        SPEED: 50,
        DAMAGE: 1,
        IDLE_DURATION: 500, // in milliseconds
        IDLE_RAND_LOW: -250,
        IDLE_RAND_HIGH: 250,
        ATK_DURATION: 800, // in milliseconds
        ATK_RAND_LOW: -200,
        ATK_RAND_HIGH: 400,
        ATK_SPEED: 200,
        ATK_FRAMERATE: 4,
        MOVE_DURATION: 2500, // in milliseconds
        MOVE_RAND_LOW: -1000,
        MOVE_RAND_HIGH: 1500,
        MOVE_FRAMERATE: 8,
        HEIGHT: 46,
        WIDTH: 64,
        SCALE_X: 1.5,
        SCALE_Y: 1.5,
        HITBOX_X: 46*0.8,
        HITBOX_Y: 64*0.5
    },
    OPHANIM: {
        LIFE: 3,
        MAX_LIFE: 3,
        SPEED: 50,
        DAMAGE: 1,
        IDLE_DURATION: 500, // in milliseconds
        IDLE_RAND_LOW: -400,
        IDLE_RAND_HIGH: 200,
        ATK_DURATION: 800, // in milliseconds
        ATK_RAND_LOW: -600,
        ATK_RAND_HIGH: 300,
        ATK_SPEED: 200,
        ATK_FRAMERATE: 4,
        DANGER_ZONE: 300,
        FOLLOW_ZONE: 450,
        MOVE_DURATION: 2500, // in milliseconds
        MOVE_RAND_LOW: -1600,
        MOVE_RAND_HIGH: 1000,
        MOVE_FRAMERATE: 8,
        RANDOM_MOVE_MAX_TRIES: 10,
        RANDOM_MOVE_MIN_RADIUS: 30,
        RANDOM_NOVE_MAX_RADIUS: 60,
        ESCAPE_WALL_DURATION: 1500,
        HEIGHT: 64,
        WIDTH: 64,
        SCALE_X: 1.7,
        SCALE_Y: 1.7,
        HITBOX_X: 64*0.5,
        HITBOX_Y: 64*0.5
    },
    SERAPH: {
        LIFE: 5,
        MAX_LIFE: 5,
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
    RICHMAN: {
        LIFE: 36,
        MAX_LIFE: 36,
        SPEED: 66,
        DAMAGE: 1,
        HITBOX_X: 36*1.1,
        HITBOX_Y: 106*1.1,
        SCALE_X: 1.6,
        SCALE_Y: 1.6,
        LIFEBAR_X: 75, 
        LIFEBAR_Y: 30,
        ATK_DURATION_LOW: 600, // in milliseconds
        ATK_DURATION_HIGH: 1200,
        SHOOT_TWO_OFFSET: 100,
        MOVE_LOW: 3000, // in milliseconds
        MOVE_HIGH: 5000, // in milliseconds
        MOVE_X: 36*3,
        MOVE_Y: 36*4.5,
        HOLE_SPAWN: 500,
        HOLE_DESTROY: 2000
    },
    DEVIL: {
        LIFE: 90,
        MAX_LIFE: 90,
        SPEED: 66,
        DAMAGE: 1,
        LIFEBAR_X: 75, 
        LIFEBAR_Y: 30,
        HITBOX_X: 128*0.7,
        HITBOX_Y: 128*0.75,
        SCALE_X: 1.7,
        SCALE_Y: 1.7,
        MOVE_X: 87*2,
        MOVE_DURATION: 2500, // in milliseconds
        ATK_DURATION: 1000, // in milliseconds
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
        DELAY: 200,
        HITBOX_X: 64*0.7,
        HITBOX_Y: 64*0.7,
        GRID_OFFSET_Y: -64,
        RESPAWN_DISTANCE: 12,
        RATIO_START_BOSS: 1/4,
        SPEED_BOSS: 1000
    },
    FIRE: {
        HITBOX_X: 41*0.7,
        HITBOX_Y: 47*0.7,
        WIDTH: 41, 
        HEIGHT: 47,
        SCALE_X: 1.4,
        SCALE_Y: 1.4,
        GRID_OFFSET_X: 0,
        GRID_OFFSET_Y: -64,
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

        AMMO_X: 25,
        AMMO_Y: 55
    },
    PLAYER_HUD: {
        HEART_SCALE: 1.25,
        BULLET_SCALE: 1.25,
        POWERUP_JUMPSCARE_CIRCLE_PROPERTIES: {
            PUP_X: 48,
            PUP_Y: 48,
            PUP_RADIUS: 28,
            JS_RADIUS: 33,
            JS_THICKNES: 10,
            HIDING_MASK_X: 42,
            HIDING_MASK_Y: 20,
            HIDING_MASK_HEIGHT: 58,
            HIDING_MASK_WIDTH: 20,
            HIDING_MASK_RADIUS: 30
        },
        LIFE_BULLETS_ROUNDED_RECTANGLE_PROPERTIES: {
            ALPHA: 0.5,
            X: 42,
            Y: 19,
            BASE_WIDTH: 64,
            BASE_HEIGHT: 58,
            HEART_BASE_X: 105,
            HEART_EXTRA_X: 32,
            HEART_Y: 38,
            HEART_EXTRA_WIDTH: 40,
            BULLET_BASE_X: 105,
            BULLET_EXTRA_X: 16,
            BULLET_Y: 64,
            BULLET_EXTRA_WIDTH: 20
        },
        STAMINA_BAR_PROPERTIES: {
            X_OFFSET: -2,
            Y_OFFSET: 4,
            SCALE: 1.5,
            TIME_TO_DISAPPEAR: 500
        }
    },
    UI: {
        START_MENU: {
            TITLE:{
                P1_TEXT: 'THAT TIME I GOT REINCARNATED',
                P1_X: 80,
                P1_Y: 102,
                P1_SIZE: 40,
                P2_TEXT: 'AS A PHAT CAT',
                P2_X: 311,
                P2_Y: 152,
                P2_SIZE: 40,
                P3_TEXT: 'or the non-linear linear path to revenge',
                P3_X: 260,
                P3_Y: 212,
                P3_SIZE: 16
            },
            START_BUTTON:{
                ALPHA: 1,
                X: 250,
                Y: 270,
                WIDTH: 524,
                HEIGHT: 96,
                BORDER_ALPHA: 1,
                BORDER_WIDTH: 12,
                INTERACTIVE_ZONE_Y_OFFSET: -5,
                INTERACTIVE_ZONE_WIDTH_OFFSET: -10,
                INTERACTIVE_ZONE_HEIGHT_OFFSET: -5
            },
            START_TEXT:{
                X: 432,
                Y: 275,
                SIZE: 80,
                STROKE_THICKNESS: 2
            },
            EXTRA_TEXT:{
                MIN_TEXT: 1,
                MAX_TEXT: 5,
                Y: 415,
                FONT_SIZE: 40,
                T1: {
                    TEXT: 'MEOW MEOW MEOW!!1!!',
                    X: 360,
                },
                T2: {
                    TEXT: 'THEY SAY CATS HAVE SEVEN LIVES? NOT ANYMORE!',
                    X: 164
                },
                T3:{
                    TEXT: 'GIVE \'EM REVENGE!',
                    X: 378
                },
                T4:{
                    TEXT: 'THICK BUT FLUFFY ^^',
                    X: 360
                },
                T5:{
                    TEXT: 'SHOOTING HURTS MY STOMACH :(',
                    X: 290
                }
            },
            BACKGROUND:{
                CATS_NUMBER: 8,
                CAT_MIN_X: 100,
                CAT_MAX_X: 1000,
                CAT_MIN_Y: 100,
                CAT_MAX_Y: 500,
                CAT_MIN_VELOCITY1: -300,
                CAT_MAX_VELOCITY1: -150,
                CAT_MIN_VELOCITY2: 150,
                CAT_MAX_VELOCITY2: 300
            }
        },
        FULLSCREEN_BUTTON: {
            X: 992,
            Y: 32
        },
        END_SCENE: {
            DEATH_TEXT:{
                FONT_SIZE: 40,
                TEXT1: 'YOU WERE SENT ',
                X1_OFFSET: -106,
                TEXT2: 'BACK TO HELL!',
                X2_OFFSET: 106,
                Y_OFFSET: -100,
            },
            REASON_TEXT:{
                FONT_SIZE: 30
            },
            BACK_TO_GAME_TEXT:{
                Y_OFFSET: 100,
                FONTSIZE: 30
            }
        }
    },
    SCENES: {
        END:{
            DEATH_REASON:{
                ANGEL: 'angel',
                SERAPH: 'seraph',
                OPHANIM: 'ophanim',
                FIREBALL: 'fireball',
                HOLE: 'hole',
                FIRE: 'fire',
                MOVING_FIRE: 'moving_fire',
                HOARDER: 'hoarder',
                RICHMAN: 'richman'
            }
        }
    },
    COLORS:{
        PHAT_CAT: 0x6DD3CE,
        PHAT_CAT_ALT: '#ffffff',
        DARKER_PHAT_CAT: 0x06B1AB,
        DARKER_PHAT_CAT_ALT: '#CFCFEA',
        START_MENU_BACKGROUND: 0x1E0B133,
        RANDOM_TEXT_COLOR: '#CFCFEA'
    }
};

export default PARAMETERS;
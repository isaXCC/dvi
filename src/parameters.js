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
        JUMPSCARE_DAMAGE: 2,
        JUMPSCARE_COUNT: 2,
        DAMAGE_TINT: 0xE45F82,
        SHAKE_DURATION: 1500,
        SHAKE_INTENSITY: 0.01,
        NUM_SCRATCHES: 12
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
        GRID_OFFSET_Y: -64*1.3 +15.5,
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
            BASE_WIDTH: 210,
            BASE_HEIGHT: 58,
            BASE_MAX_LIFE: 8,
            HEART_BASE_X: 105,
            HEART_EXTRA_X: 32,
            HEART_Y: 38,
            HEART_EXTRA_WIDTH: 40,
            BULLET_BASE_X: 105,
            BULLET_EXTRA_X: 16,
            BULLET_Y: 64,
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
                MOVING_FIRE: 'moving_fire'
            }
        }
    },
    COLORS:{
        PHAT_CAT: 0x8FF8E2,
        PHAT_CAT_ALT: '#8FF8E2',
        DARKER_PHAT_CAT: 0x0CC099,
        DARKER_PHAT_CAT_ALT: '#0CC099',
        START_MENU_BACKGROUND: 0x31081F,
        RANDOM_TEXT_COLOR: '#FCAA67'
    }
};

export default PARAMETERS;
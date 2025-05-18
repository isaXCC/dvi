const CONDITIONS = {
    D1:{
        PIT: false, // Activates in HoleGroup
        BOOTS: false, // Activates in with Boots -> Change scene in d1_pit when fall into hole
        MICE_KID: false, // Activates in NPCGroup -> Spawns HeartUp PUP in d1_8
        KILLED_ANGEL: false, // Activates when the angel in d1_mid is killed -> Change the dialogue
        MICE_FAMILY: false, // Activates in NPCGroup -> Changes MICE Family PNG
        TIMEATK1: false,
        TIMEATK2: false,
        FIGHT_BOSS: false,
        KILLED_BOSS: false,
        PORTAL_D2: false,
        D1_3_KILLED: false,
        D1_4_KILLED: false,
        D1_6_KILLED: false,
        D1_9_KILLED: false,
        D1_10_KILLED: false,
        D1_11_KILLED: false,
        D1_BOOTS_KILLED: false,
        D1_MID_KILLED: false
    }, 
    D2:{
        HITO: false,
        INSIDE: false,
        D2_2_KILLED: false,
        BUNNY_2: false,
        TIMEATK: false,
        FIGHT_BOSS: false,
        KILLED_BOSS: false,
        PORTAL_D3: false
    },
    DF:{
        INSIDE: false,
        VIRGIL: true,
        DF_3_KILLED: false,
        DF_4_KILLED: false,
        DF_5_KILLED: false,
        VIRGIL_G: false,
        VIRGIL_F: false,
        MICE_FAMILY_G: false,
        MICE_FAMILY_F: false,
        MICE_KID_G: false,
        MICE_KID_F: false,
        BUNNY_G: false,
        BUNNY_F: false,
        GENERATE: false,
        FIGHT_BOSS: false,
        KILLED_BOSS: false
    }
};

export default CONDITIONS;
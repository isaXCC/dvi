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
        PORTAL_D2: false
    }, 
    D2:{

    },
    DF:{
        INSIDE: false,
        DF_3_KILLED: false
    }
};

export default CONDITIONS;
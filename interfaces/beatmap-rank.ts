export interface BSMapRankItem {
        name: string,
        playerId: number,
        score: number,
        mods: string[],
        pp: number,
        rank: number,
        // difficulty: string,
        // gameMode: string,
        // type: "ScoreSaber" | "BeatLeader",
        // hash: string,
}
export interface BeatLeaderScore {
        accPP: number;
        accuracy: number;
        badCuts: number;
        baseScore: number;
        bombCuts: number;
        bonusPp: number;
        controller: number;
        country: null;
        fcAccuracy: number;
        fcPp: number;
        fullCombo: boolean;
        hmd: number;
        id: number;
        leaderboardId: string;
        maxCombo: number;
        maxStreak: null;
        metadata: null;
        missedNotes: number;
        modifiedScore: number;
        modifiers: string;
        offsets: null;
        passPP: number;
        pauses: number;
        platform: string;
        playCount: number;
        player: Player;
        playerId: string;
        pp: number;
        priority: number;
        rank: number;
        rankVoting: null;
        replay: string;
        replaysWatched: number;
        scoreImprovement: ScoreImprovement;
        techPP: number;
        timepost: number;
        timeset: string;
        wallsHit: number;
        weight: number;
        [property: string]: any;
}

export interface Player {
        avatar: string;
        bot: boolean;
        clanOrder: string;
        clans: Clan[];
        contextExtensions: null;
        country: string;
        countryRank: number;
        id: string;
        name: string;
        patreonFeatures: null;
        platform: string;
        pp: number;
        profileSettings: ProfileSettings;
        rank: number;
        role: string;
        socials: Social[];
        [property: string]: any;
}

export interface Clan {
        color?: string;
        id?: number;
        name?: null;
        tag?: string;
        [property: string]: any;
}

export interface ProfileSettings {
        bio: null;
        effectName: string;
        hue: number;
        id: number;
        leftSaberColor: string;
        message: null;
        profileAppearance: string;
        profileCover: string;
        rightSaberColor: string;
        saturation: number;
        showAllRatings: boolean;
        showBots: boolean;
        starredFriends: string;
        [property: string]: any;
}

export interface Social {
        id: number;
        link: string;
        playerId: string;
        service: string;
        user: string;
        userId: string;
        [property: string]: any;
}

export interface ScoreImprovement {
        accLeft: number;
        accRight: number;
        accuracy: number;
        averageRankedAccuracy: number;
        badCuts: number;
        bombCuts: number;
        bonusPp: number;
        id: number;
        missedNotes: number;
        pauses: number;
        pp: number;
        rank: number;
        score: number;
        timeset: string;
        totalPp: number;
        totalRank: number;
        wallsHit: number;
        [property: string]: any;
}

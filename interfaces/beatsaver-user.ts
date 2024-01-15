export interface BSUser {
    admin: boolean;
    avatar: string;
    curator: boolean;
    curatorTab?: boolean;
    verifiedMapper?: boolean;
    id: number;
    name: string;
    hash?: string;
    playlistUrl: string;
    type: UserType;
}

export interface BSUserWithStats {
    id: number;
    name: string;
    description: string;
    avatar: string;
    followData?: {
        followers: number;
        follows?: number;
        following: boolean;
        upload: boolean;
        curation: boolean;
    }
    patreon?: string;
    stats: {
        totalUpvotes: number;
        totalDownvotes: number;
        totalMaps: number;
        rankedMaps?: number;
        avgBpm: number;
        avgScore: number;
        avgDuration: number;
        firstUpload: string;
        lastUpload: string;
        diffStats?: {
            total: number;
            easy: number;
            normal: number;
            hard: number;
            expert: number;
            expertPlus: number;
        }
    };
    type: UserType;
}

type UserType = "DISCORD" | "SIMPLE"
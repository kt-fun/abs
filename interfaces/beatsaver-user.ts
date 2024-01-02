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
    };
    type: UserType;
}

export enum UserType {
    Discord = "DISCORD",
    Simple = "SIMPLE",
}
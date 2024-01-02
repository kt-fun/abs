import { BSUser } from "./beatsaver-user";

export interface BSPlaylist {
    playlistId: number;
    name: string;
    description: string;
    playlistImage: string;
    playlistImage512: string;
    owner: BSUser;
    stats: {
        totalMaps: number;
        mapperCount: number;
        totalDuration: number;
        minNps: number;
        maxNps: number;
        upVotes: number;
        downVotes: number;
        avgScore: number;
    };
    createdAt: string;
    updatedAt: string;
    songsChangedAt: string;
    downloadURL: string;
    type: string;
}
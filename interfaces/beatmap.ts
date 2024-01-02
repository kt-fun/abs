
import { BSUser } from "./beatsaver-user";

export function getBSMapCoverURL(bsMap: BSBeatMap): string {
    return bsMap.versions[0].coverURL;
}
export function getMaxNPS(bsMap: BSBeatMap): number {
    let maxNPS = 0;
    for (const version of bsMap.versions) {
        for (const diff of version.diffs) {
            if (diff.nps > maxNPS) maxNPS = diff.nps;
        }
    }
    return maxNPS;
}
export function checkIfAI(bsMap: BSBeatMap): boolean {
    return bsMap.automapper || bsMap.declaredAi !== "";
}
export function checkIfME(bsMap: BSBeatMap): boolean {
    for (const version of bsMap.versions) {
        for (const diff of version.diffs) {
            if (diff.me) return true;
        }
    }
    return false;
}
export function checkIfNE(bsMap: BSBeatMap): boolean {
    for (const version of bsMap.versions) {
        for (const diff of version.diffs) {
            if (diff.ne) return true;
        }
    }
    return false;
}
export function checkIfChroma(bsMap: BSBeatMap): boolean {
    for (const version of bsMap.versions) {
        for (const diff of version.diffs) {
            if (diff.chroma) return true;
        }
    }
    return false;
}
export function checkIfCinema(bsMap: BSBeatMap): boolean {
    for (const version of bsMap.versions) {
        for (const diff of version.diffs) {
            if (diff.cinema) return true;
        }
    }
    return false;
}
export interface BSBeatMap {
    automapper: boolean;
    bookmarked: boolean;
    createdAt: string;
    declaredAi: string;
    description: string;
    id: string;
    lastPublishedAt: string;
    metadata: BSMapMetadata;
    name: string;
    qualified: boolean;
    ranked: boolean;
    stats: BSMapStats;
    tags?: string[];
    updatedAt: string;
    uploaded: string;
    uploader: BSUser;
    curator?: BSUser;
    collaborators?: BSUser[];
    versions: BSMapVersion[];
}



export interface BSMapMetadata {
    bpm: number;
    duration: number;
    levelAuthorName: string;
    songAuthorName: string;
    songName: string;
    songSubName: string;
    [property: string]: any;
}

export interface BSMapStats {
    downloads: number;
    downvotes: number;
    plays: number;
    score: number;
    upvotes: number;
    [property: string]: any;
}



export interface BSMapVersion {
    coverURL: string;
    createdAt: string;
    diffs: BSMapDiff[];
    downloadURL: string;
    hash: string;
    previewURL: string;
    sageScore: number;
    state: string;
}

export interface BSMapDiff {
    bombs: number;
    characteristic: string;
    chroma: boolean;
    cinema: boolean;
    difficulty: string;
    events: number;
    label?: string;
    length: number;
    maxScore: number;
    me: boolean;
    ne: boolean;
    njs: number;
    notes: number;
    nps: number;
    obstacles: number;
    offset: number;
    paritySummary: BSMapParitySummary;
    seconds: number;
}

export interface BSMapParitySummary {
    errors: number;
    resets: number;
    warns: number;
}

import { BSBeatMap } from "./beatmap";
import { BSUser } from "./beatsaver-user";

export interface BSMapReview {
    id:number,
    creator?: BSUser,
    map?:BSBeatMap,
    text:string,
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL",
    createdAt: string,
    updatedAt: string,
    curatedAt: string
}
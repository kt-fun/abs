
// {
//     "id": 13647,
//     "creator": {
//         "id": 4234943,
//         "name": "GojiCrafter",
//         "hash": "5f8cc2059f3df70008650899",
//         "avatar": "https://cdn.beatsaver.com/avatar/5a87f8fba36c78debb6c36f8dd6270b735fd395d.png",
//         "type": "DISCORD",
//         "admin": false,
//         "curator": false,
//         "curatorTab": true,
//         "verifiedMapper": true,
//         "playlistUrl": "https://api.beatsaver.com/users/id/4234943/playlist"
//     },
//     "text": "Nothing short of incredible. This might be one of the most important maps ever made for the community and is certainly deserving of being top rated of all time. The excellent notemods, environment work, and walls really just create such an awesome visual experience for the player, and, might I add, the lightshow is just fucking *gorgeous*.\nI'd also like to mention that, for its time, this map was just ridiculously ahead of the game. Nothing remotely to this standard had ever been made before this.\n\nSo basically yeah pretty good, would recommend to a friend.",
//     "sentiment": "POSITIVE",
//     "createdAt": "2022-11-26T07:17:31.156576Z",
//     "updatedAt": "2022-11-26T07:17:31.156576Z",
//     "curatedAt": "2022-11-26T19:26:10.299247Z"
// }

import { BSUser } from "./beatsaver-user";

export interface BSMapReview {
    id:number,
    creator: BSUser,
    text:string,
    sentiment: "POSITIVE" | "NEGATIVE",
    createAt: string,
    updateAt: string,
    curatedAt: string
}
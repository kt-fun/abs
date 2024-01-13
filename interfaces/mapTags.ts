export enum BSMapTagType {
    Style,
    Genre,
}

export interface BSMapTag {
    name: string;
    slug: string;
    human: string;
    type: BSMapTagType;
}


const BSMapTagList: BSMapTag[] = [
    { type: BSMapTagType.Style, name: "Tech", human: "Tech", slug: "tech" },
    { type: BSMapTagType.Style, name: "Dance", human: "Dance", slug: "dance-style" },
    { type: BSMapTagType.Style, name: "Speed", human: "Speed", slug: "speed" },
    { type: BSMapTagType.Style, name: "Balanced", human: "Balanced", slug: "balanced" },
    { type: BSMapTagType.Style, name: "Challenge", human: "Challenge", slug: "challenge" },
    { type: BSMapTagType.Style, name: "Accuracy", human: "Accuracy", slug: "accuracy" },
    { type: BSMapTagType.Style, name: "Fitness", human: "Fitness", slug: "fitness" },
    { type: BSMapTagType.Genre, name: "Swing", human: "Swing", slug: "swing" },
    { type: BSMapTagType.Genre, name: "Nightcore", human: "Nightcore", slug: "nightcore" },
    { type: BSMapTagType.Genre, name: "Folk & Acoustic", human: "Folk & Acoustic", slug: "folk-acoustic" },
    { type: BSMapTagType.Genre, name: "Kids & Family", human: "Kids & Family", slug: "kids-family" },
    { type: BSMapTagType.Genre, name: "Ambient", human: "Ambient", slug: "ambient" },
    { type: BSMapTagType.Genre, name: "Funk & Disco", human: "Funk & Disco", slug: "funk-disco" },
    { type: BSMapTagType.Genre, name: "Jazz", human: "Jazz", slug: "jazz" },
    { type: BSMapTagType.Genre, name: "Classical & Orchestral", human: "Classical & Orchestral", slug: "classical-orchestral" },
    { type: BSMapTagType.Genre, name: "Soul", human: "Soul", slug: "soul" },
    { type: BSMapTagType.Genre, name: "Speedcore", human: "Speedcore", slug: "speedcore" },
    { type: BSMapTagType.Genre, name: "Punk", human: "Punk", slug: "punk" },
    { type: BSMapTagType.Genre, name: "R&B", human: "R&B", slug: "rb" },
    { type: BSMapTagType.Genre, name: "Holiday", human: "Holiday", slug: "holiday" },
    { type: BSMapTagType.Genre, name: "Vocaloid", human: "Vocaloid", slug: "vocaloid" },
    { type: BSMapTagType.Genre, name: "J-Rock", human: "J-Rock", slug: "j-rock" },
    { type: BSMapTagType.Genre, name: "Trance", human: "Trance", slug: "trance" },
    { type: BSMapTagType.Genre, name: "Drum and Bass", human: "Drum and Bass", slug: "drum-and-bass" },
    { type: BSMapTagType.Genre, name: "Comedy & Meme", human: "Comedy & Meme", slug: "comedy-meme" },
    { type: BSMapTagType.Genre, name: "Instrumental", human: "Instrumental", slug: "instrumental" },
    { type: BSMapTagType.Genre, name: "Hardcore", human: "Hardcore", slug: "hardcore" },
    { type: BSMapTagType.Genre, name: "K-Pop", human: "K-Pop", slug: "k-pop" },
    { type: BSMapTagType.Genre, name: "Indie", human: "Indie", slug: "indie" },
    { type: BSMapTagType.Genre, name: "Techno", human: "Techno", slug: "techno" },
    { type: BSMapTagType.Genre, name: "House", human: "House", slug: "house" },
    { type: BSMapTagType.Genre, name: "Video Game", human: "Video Game", slug: "video-game-soundtrack" },
    { type: BSMapTagType.Genre, name: "TV & Film", human: "TV & Film", slug: "tv-movie-soundtrack" },
    { type: BSMapTagType.Genre, name: "Alternative", human: "Alternative", slug: "alternative" },
    { type: BSMapTagType.Genre, name: "Dubstep", human: "Dubstep", slug: "dubstep" },
    { type: BSMapTagType.Genre, name: "Metal", human: "Metal", slug: "metal" },
    { type: BSMapTagType.Genre, name: "Anime", human: "Anime", slug: "anime" },
    { type: BSMapTagType.Genre, name: "Hip Hop & Rap", human: "Hip Hop & Rap", slug: "hip-hop-rap" },
    { type: BSMapTagType.Genre, name: "J-Pop", human: "J-Pop", slug: "j-pop" },
    { type: BSMapTagType.Genre, name: "Dance", human: "Dance", slug: "dance" },
    { type: BSMapTagType.Genre, name: "Rock", human: "Rock", slug: "rock" },
    { type: BSMapTagType.Genre, name: "Pop", human: "Pop", slug: "pop" },
    { type: BSMapTagType.Genre, name: "Electronic", human: "Electronic", slug: "electronic" },
];

export const BSStyleTags = BSMapTagList.filter((tag) => tag.type === BSMapTagType.Style);
export const BSGenreTags = BSMapTagList.filter((tag) => tag.type === BSMapTagType.Genre);
export function getMapTag(slug: string): BSMapTag|undefined {
    return BSMapTagList.find((tag) => tag.slug === slug)
}


//
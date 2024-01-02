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

export const BSMapTagList: BSMapTag[] = [
    {
        slug: "anime",
        name: "Anime",
        human: "Anime",
        type: BSMapTagType.Genre,
    }
]

export function getMapTag(slug: string): BSMapTag|undefined {
    return {
        slug: slug,
        name: slug,
        human: slug,
        type: BSMapTagType.Genre,
    }
    // return BSMapTagList.find((tag) => tag.slug === slug)
}
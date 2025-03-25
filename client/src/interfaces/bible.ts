export interface IBook {
    abbrev?: string;
    name: string | undefined;
    author: string | undefined;
    numChapters?: number;
    verses?: IVerse[];
    etc: {
        prevBook: {
            abbrev?: string;
            numChapters?: number;
        } | null;
        nextBook: {
            abbrev?: string;
            numChapters?: number;
        } | null;
    }
}

export interface IVerse {
    number?: number;
    text?: string
}

export interface IHighlightedVerse {
    verse: number;
    color: string;
}

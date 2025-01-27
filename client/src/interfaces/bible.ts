export interface IBook {
    abbrev?: string;
    name?: string;
    author?: string;
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

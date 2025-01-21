interface IHighlightVerses {
    userId: string;
    books: {
        book: string;
        chapters: {
            chapter: number;
            verses: {
                verse: number;
                color: string;
            }[];
        }[];
    }[];
}

interface IVerse {
    verse: number;
    color: string;
}

export { IHighlightVerses, IVerse };

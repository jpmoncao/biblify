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

export default IHighlightVerses;

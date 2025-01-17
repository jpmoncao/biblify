import IHighlightVerses from "../interfaces/highlight-verses";
import HighlightVerses from "../models/highlight-verses";

const highlightVerses = async (userId: string, book: string, chapter: number, verses: number[], color: string): Promise<void> => {
    return;
};

const listHighlightedVerses = async (userId: string, book: string, chapter: number): Promise<IHighlightVerses | null> => {
    const highlightedVerses = await HighlightVerses.findOne({
        userId,
        "books.book": book,
        "books.chapters.chapter": chapter,
    });

    return highlightedVerses;
};


export { highlightVerses, listHighlightedVerses };
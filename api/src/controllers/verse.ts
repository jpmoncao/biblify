import { IHighlightVerses, IVerse } from "../interfaces/highlight-verses";
import HighlightVerses from "../models/highlight-verses";

const highlightVerses = async (userId: string, book: string, chapter: number, verses: number[], color: string): Promise<void> => {
    // Procura pelo documento do usuário
    const userHighlight = await HighlightVerses.findOne({ userId });

    if (!userHighlight) {
        // Caso o documento do usuário não exista, cria um novo
        const newHighlight = new HighlightVerses({
            userId,
            books: [
                {
                    book,
                    chapters: [
                        {
                            chapter,
                            verses: verses.map((verse) => ({ verse, color })),
                        },
                    ],
                },
            ],
        });
        await newHighlight.save();
        return;
    }

    // Atualiza ou cria caso o livro não exista
    const bookIndex = userHighlight.books.findIndex((b) => b.book === book);
    if (bookIndex === -1) {
        userHighlight.books.push({
            book,
            chapters: [
                {
                    chapter,
                    verses: verses.map((verse) => ({ verse, color })),
                },
            ],
        });
    } else {
        // Atualiza ou cria caso o capítulo não exista
        const chapterIndex = userHighlight.books[bookIndex].chapters.findIndex(
            (c) => c.chapter === chapter
        );
        if (chapterIndex === -1) {
            userHighlight.books[bookIndex].chapters.push({
                chapter,
                verses: verses.map((verse) => ({ verse, color })),
            });
        } else {
            // Atualiza ou adiciona versículos ao capítulo existente
            const existingVerses = userHighlight.books[bookIndex].chapters[chapterIndex].verses;

            verses.forEach((verse) => {
                const verseIndex = existingVerses.findIndex((v) => v.verse === verse);
                if (verseIndex === -1) {
                    // Adiciona novo versículo
                    existingVerses.push({ verse, color });
                } else {
                    // Atualiza cor do versículo existente
                    existingVerses[verseIndex].color = color;
                }
            });
        }
    }

    // Salva as alterações no documento
    await userHighlight.save();
}

const listHighlightedVerses = async (userId: string, book: string, chapter: number): Promise<IVerse[] | null> => {
    const highlightedVerses = await HighlightVerses.findOne(
        { userId },
        { books: { $elemMatch: { book } } }
    );

    if (!highlightedVerses || highlightedVerses.books.length === 0) return null;

    const chapters = highlightedVerses.books[0].chapters;
    const targetChapter = chapters.find((c) => c.chapter === chapter);

    if (!targetChapter) return null;

    return targetChapter.verses;
};


export { highlightVerses, listHighlightedVerses };
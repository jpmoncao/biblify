import { Router } from "express"
import { highlightVerses, listHighlightedVerses } from "../controllers/verse";
import { IHighlightVerses, IVerse } from "../interfaces/highlight-verses";

const versesRouter = Router();

// CRUD routes

// List all the verses highlighted in that book and chapter
versesRouter.get('/highlight/:book/:chapter', async (req, res) => {
    try {
        const { userId }: { userId: string } = req.body;
        const { book, chapter }: { book: string, chapter: string } = req.params;

        const chapterNumber = Number(chapter);

        const highlightedVerses: IVerse[] | null = await listHighlightedVerses(userId, book, chapterNumber);

        res.status(201).json({ data: highlightedVerses ?? {}, message: 'Highlighted verses sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Create verses highlighted in that book and chapter
versesRouter.post('/highlight/:book/:chapter', async (req, res) => {
    try {
        const { userId, verses, color }: { userId: string, color: string, verses: number[] } = req.body;
        const { book, chapter }: { book: string, chapter: string } = req.params;

        const chapterNumber = Number(chapter);

        await highlightVerses(userId, book, chapterNumber, verses, color);

        res.status(201).json({ data: {}, message: 'Verses sucessfully highlighted!' });
    } catch (error) {
        console.error('Error updating highlighted verses:', error);
        res.status(400).json({ message: (error as Error).message });
    }
});

export default versesRouter;

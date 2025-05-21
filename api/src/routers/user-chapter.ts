import { Response, Router } from "express";
import { UserRequest } from "../types";
import { listUserChapter, listUserChaptersReaded, highlightVerses } from "../controllers/user-chapter";
import { IUserChapter } from "../interfaces/user-chapter";

const userChaperRouter = Router();

// CRUD routes

// List of all the chapters read by the user in this book
userChaperRouter.get('/readed/:book/', async (req: UserRequest<{ book: string }>, res: Response) => {
    try {
        const userId = req.user?.userId ?? '';
        const { book }: { book: string } = req.params;

        const chapters: number[] = await listUserChaptersReaded(userId, book);

        res.status(201).json({ data: chapters, message: 'User chapters readed sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

// Create verses highlighted in that book and chapter
userChaperRouter.post('/highlight/:book/:chapter', async (req: UserRequest<{ book: string; chapter: string }>, res: Response) => {
    try {
        const userId = req.user?.userId ?? '';
        const { verses, color }: { userId: string, color: string, verses: number[] } = req.body;
        const { book, chapter }: { book: string, chapter: string } = req.params;

        const chapterNumber = Number(chapter);

        await highlightVerses(userId, book, chapterNumber, verses, color);

        res.status(201).json({ data: {}, message: 'Verses sucessfully highlighted!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

// List the user information about that book and chapter
userChaperRouter.get('/:book/:chapter', async (req: UserRequest<{ book: string, chapter: string }>, res: Response) => {
    try {
        const userId = req.user?.userId ?? '';
        const { book, chapter }: { book: string, chapter: string } = req.params;

        const chapterNumber = Number(chapter);

        const userChapter: Partial<IUserChapter> | null = await listUserChapter(userId, book, chapterNumber);

        res.status(201).json({ data: userChapter ?? {}, message: 'User chapter sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

export default userChaperRouter;

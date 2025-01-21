import { Router } from "express"
import { listDevotionalNotation, updateDevotionalNotation } from "../controllers/note";
import IDevotionalNotation from "../interfaces/devotional-notation";

const notesRouter = Router();

// CRUD routes
// Create
notesRouter.post('/devotional-notation', async (req, res) => {
    try {
        const { userId, date, content }: { userId: string, date: string, content: string } = req.body;
        const dateFormatted: Date = new Date(date);

        await updateDevotionalNotation(userId, dateFormatted, content);

        res.status(201).json({ data: {}, message: 'Devotional note sucessfully updated!' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Read
notesRouter.get('/devotional-notation/:date', async (req, res) => {
    try {
        const { userId }: { userId: string } = req.body;
        const { date }: { date: string } = req.params;
        const dateFormatted: Date = new Date(date);

        const devotionalNotation: IDevotionalNotation | null = await listDevotionalNotation(userId, dateFormatted);

        res.status(201).json({ data: devotionalNotation ?? {}, message: 'Devotional note sucessfully listed!' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
        // res.status(400).json({ error: (error as Error).name ?? '', message: (error as Error).message });
    }
});

export default notesRouter;
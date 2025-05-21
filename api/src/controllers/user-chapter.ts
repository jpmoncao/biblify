import { IUserChapter } from "../interfaces/user-chapter";
import UserChapter from "../models/user-chapter";
import cleanDoc from "../utils/clean-doc";

const listUserChapter = async (userId: string, book: string, chapter: number): Promise<Partial<IUserChapter>> => {
    const userChapter = await UserChapter.findOne({ userId, book, chapter }).lean();

    if (!userChapter)
        return { chapter, book, userId, highlighted: [], readed: false };

    return cleanDoc(userChapter);
};

const listUserChaptersReaded = async (userId: string, book: string) => {
    const readChapters = await UserChapter
        .find({ userId, book, readed: true })
        .select('chapter')
        .lean();

    return cleanDoc(readChapters.map(c => c.chapter));
};

const highlightVerses = async (userId: string, book: string, chapter: number, verses: number[], color: string): Promise<void> => {
    const userChapter = await UserChapter.findOneAndUpdate(
        { userId, book, chapter },
        { $setOnInsert: { userId, book, chapter, readed: false, highlighted: [] } },
        { upsert: true, new: true }
    );

    if (!userChapter) return;

    const highlightedVerses = userChapter.highlighted.map(v => {
        if (!verses.includes(v.verse))
            return { verse: v.verse, color };
    });

    const newHighlightedVerses = verses.map(v => ({ verse: v, color }));

    // userChapter.highlighted = [...highlightedVerses, ...newHighlightedVerses];
};

export { listUserChapter, listUserChaptersReaded, highlightVerses };

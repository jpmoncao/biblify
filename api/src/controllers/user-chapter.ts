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

    return readChapters.map(c => c.chapter);
};

const highlightVerses = async (userId: string, book: string, chapter: number, verses: number[], color: string): Promise<void> => {
    const userChapter = await UserChapter.findOneAndUpdate(
        { userId, book, chapter },
        { $setOnInsert: { userId, book, chapter, readed: false, highlighted: [] } },
        { upsert: true, new: true }
    );

    if (!userChapter) return;

    const highlightedVerses = userChapter.highlighted.filter(
        (v) => !verses.includes(v.verse)
    );

    const newHighlightedVerses = verses.map(v => ({ verse: v, color }));

    // Mescla os dois arrays e remove duplicatas
    userChapter.highlighted = [...highlightedVerses, ...newHighlightedVerses].sort((a, b) => a.verse - b.verse);

    userChapter.save();
};

const toggleVerseReading = async (userId: string, book: string, chapter: number): Promise<void> => {
    const userChapter = await UserChapter.findOneAndUpdate(
        { userId, book, chapter },
        { $setOnInsert: { userId, book, chapter, readed: false, highlighted: [] } },
        { upsert: true, new: true }
    );

    if (!userChapter) return;

    userChapter.readed = !userChapter.readed;

    userChapter.save();
};

export { listUserChapter, listUserChaptersReaded, highlightVerses, toggleVerseReading };

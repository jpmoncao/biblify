import IDevotionalNotation from "../interfaces/devotional-notation";
import DevotionalNotations from "../models/devotional-notation";

const updateDevotionalNotation = async (userId: string, date: Date, content: string): Promise<void> => {
    await DevotionalNotations.updateOne({ userId, date }, { content }, { upsert: true });
}

const listDevotionalNotation = async (userId: string, date: Date): Promise<IDevotionalNotation | null> => {
    const devotionalNotation = await DevotionalNotations.findOne({ userId, date });

    if (!devotionalNotation) return null;

    return devotionalNotation;
}

export { updateDevotionalNotation, listDevotionalNotation };

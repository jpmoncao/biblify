import { Schema, model } from 'mongoose';
import { IHighlightVerses } from '../interfaces/highlight-verses';

const highlightVersesSchema = new Schema<IHighlightVerses>({
    userId: { type: String, required: true, unique: true },
    books: [
        {
            _id: false,
            book: { type: String, required: true },
            chapters: [
                {
                    _id: false,
                    chapter: { type: Number, required: true },
                    verses: [
                        {
                            _id: false,
                            verse: { type: Number, required: true },
                            color: { type: String, required: true },
                        }
                    ]
                }
            ]
        }
    ]
});

const HighlightVerses = model<IHighlightVerses>('HighlightVerses', highlightVersesSchema);

export default HighlightVerses;

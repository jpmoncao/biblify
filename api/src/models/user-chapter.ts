import { Schema, model } from 'mongoose';
import { IUserChapter } from '../interfaces/user-chapter';

const userChapterSchema = new Schema<IUserChapter>({
    userId: { type: String, required: true },
    book: { type: String, required: true },
    chapter: { type: Number, required: true },
    readed: { type: Boolean, default: false },
    highlighted: [
        {
            verse: { type: Number, required: true },
            color: { type: String, required: true },
            _id: false,
        },
    ],
});

userChapterSchema.index({ userId: 1, book: 1, chapter: 1 }, { unique: true });

const UserChapter = model<IUserChapter>('UserChapter', userChapterSchema);

export default UserChapter;

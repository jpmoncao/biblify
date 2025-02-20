import { Schema, model } from 'mongoose';
import IDevotionalNotation from '../interfaces/devotional-notation';

const devotionalNotationsSchema = new Schema<IDevotionalNotation>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true }
});

devotionalNotationsSchema.index({ userId: 1, date: 1 }, { unique: true });

const DevotionalNotations = model<IDevotionalNotation>('DevotionalNotations', devotionalNotationsSchema);

export default DevotionalNotations;

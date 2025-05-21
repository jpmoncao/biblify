import mongoose from 'mongoose'
import HighlightVerses from '../models/highlight-verses'
import UserChapter from '../models/user-chapter'

import dotenv from 'dotenv'
import connectDB from '../database/conn';

dotenv.config();

async function migrateHighlights() {
  connectDB();

  const highlights = await HighlightVerses.find()

  for (const doc of highlights) {
    const { userId, books } = doc

    for (const bookData of books) {
      const { book, chapters } = bookData

      for (const chapterData of chapters) {
        const { chapter, verses } = chapterData

        // Agrupar por cor pode ser feito aqui se necessário, mas o schema atual permite repetições
        const highlighted = verses.map(({ verse, color }) => ({
          verse,
          color,
        }))

        // Cria ou atualiza UserChapter
        await UserChapter.findOneAndUpdate(
          { userId, book, chapter },
          {
            userId,
            book,
            chapter,
            $setOnInsert: { readed: false },
            highlighted,
          },
          { upsert: true, new: true }
        )
      }
    }

    // Remover o antigo se quiser
    // await HighlightVerses.deleteOne({ _id: doc._id })
  }

  console.log('Migration complete!')
  await mongoose.disconnect()
}

migrateHighlights().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})

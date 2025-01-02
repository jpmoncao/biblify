import { useBibleChapter } from "@/hooks/use-bible-chapter";
import BibleReaderHeader from "@/components/bible-reader/header";
import { BibleReader } from "@/components/bible-reader/reader";
import { Loader } from "@/components/common/loader";

function App() {
  const { book, verses, isLoading } = useBibleChapter('hb', 1);

  return (
    <>
      {isLoading && <Loader />}

      <BibleReaderHeader
        name={book.name}
        author={book.author}
        chapter={book.chapter}
      />

      <BibleReader
        book={book}
        chapter={book.chapter ?? 0}
        verses={verses}
      />

      <footer className="text-xs text-zinc-500 text-center mb-4">
        Desenvolvido por João Pedro Monção - 2024
      </footer>
    </>
  );
}

export default App;

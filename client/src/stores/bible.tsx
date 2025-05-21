// store/useBibleStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IBook, IVerse, IHighlightedVerse } from "@/interfaces/bible";
import { apiAccount } from "@/services/api";
import { useSettingsStore } from "@/stores/settings";
import { toast } from "@/hooks/use-toast";

type BibleState = {
    version: string;
    book: IBook | null;
    chapter: number;
    isLoading: boolean;
    error: Error | null;
    selectedVerses: number[];
    highlightedVerses: IHighlightedVerse[];

    setVersion: (version: string) => void;
    setBook: (book: IBook) => void;
    setChapter: (chapter: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;

    fetchHighlightedVerses: (abbrev: string, chapter: number) => Promise<void>;
    toggleSelectedVerse: (verse: IVerse) => void;
    clearSelectedVerses: () => void;
    copySelectedVerses: () => void;
    formatSelectedVerses: () => string;
    applyHighlightColor: (color: string) => Promise<void>;
};

export const useBibleStore = create<BibleState>()(
    persist(
        (set, get) => ({
            // Default values
            version: "nvi",
            book: null,
            chapter: 1,
            isLoading: true,
            error: null,
            selectedVerses: [],
            highlightedVerses: [],

            // Setters
            setVersion: (version) => set({ version }),
            setBook: (book) => set({ book }),
            setChapter: (chapter) => set({ chapter }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            // Methods
            fetchHighlightedVerses: async (abbrev, chapter) => {
                const token = useSettingsStore().token;
                if (!token) return;

                try {
                    const response = await apiAccount.get(`/verses/highlight/${abbrev}/${chapter}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    set({ highlightedVerses: response.data.data });
                } catch (error) {
                    console.error("Erro ao buscar destaques:", error);
                    set({ highlightedVerses: [] });
                }
            },

            toggleSelectedVerse: (verse) => {
                const number = verse.number;
                if (!number || number <= 0) return;

                const selected = get().selectedVerses;
                const updated = selected.includes(number)
                    ? selected.filter((v) => v !== number)
                    : [...selected, number];
                set({ selectedVerses: updated });
            },

            clearSelectedVerses: () => set({ selectedVerses: [] }),

            copySelectedVerses: () => {
                const { selectedVerses, book, version } = get();
                const verses = selectedVerses.sort((a, b) => a - b);

                if (!book || !book.verses) return;

                const versesList = book.verses;

                const text = verses
                    .map((v) => {
                        const verse = versesList.find((verse) => verse.number === v);
                        return verse ? `${verse.number} ${verse.text}` : "";
                    })
                    .join("\n");

                const finalText = `${text}\n${book?.name} ${get().formatSelectedVerses()} (${version.toUpperCase()})`;

                navigator.clipboard.writeText(finalText);
                toast({ title: "Versículos copiados!", duration: 800 });
                set({ selectedVerses: [] });
            },

            formatSelectedVerses: () => {
                const selected = [...get().selectedVerses].sort((a, b) => a - b);
                if (selected.length === 0) return "";

                const ranges: number[][] = [];
                let start = selected[0];

                for (let i = 1; i <= selected.length; i++) {
                    if (selected[i] !== selected[i - 1] + 1) {
                        ranges.push([start, selected[i - 1]]);
                        start = selected[i];
                    }
                }

                return ranges
                    .map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`))
                    .join(", ");
            },

            applyHighlightColor: async (color) => {
                const token = useSettingsStore().token;
                const { selectedVerses, book, chapter, highlightedVerses } = get();
                if (!token || !color || !book || !chapter) return;

                try {
                    await apiAccount.post(
                        `/verses/highlight/${book.abbrev}/${chapter}`,
                        { verses: selectedVerses, color },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    const newHighlights = selectedVerses.map((verse) => ({ verse, color }));
                    const filtered = highlightedVerses.filter((hv) => !selectedVerses.includes(hv.verse));

                    set({ highlightedVerses: [...filtered, ...newHighlights], selectedVerses: [] });
                } catch (error) {
                    console.error("Erro ao aplicar cor de destaque:", error);
                }
            },
        }),
        {
            name: "biblify-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                version: state.version,
                chapter: state.chapter,
            }),
        }
    )
);

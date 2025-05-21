export interface IUserChapter {
    userId: string;
    book: string;
    chapter: number;
    readed: boolean;
    highlighted: {
        verse: number;
        color: string;
    }[];
}
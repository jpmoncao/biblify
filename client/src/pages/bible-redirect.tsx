import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { useSettingsContext } from '@/contexts/settings';

export default function BibleRedirect() {
    const navigate = useNavigate();

    const { settings } = useSettingsContext();
    const { lastBookChapter } = settings();
    const { version, book, chapter } = lastBookChapter;

    useEffect(() => {
        navigate(`/${version}/${book}/${chapter}`)
    }, []);

    return (
        <></>
    )
}
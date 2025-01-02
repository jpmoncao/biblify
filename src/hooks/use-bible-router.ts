import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function UseBibleRouter() {
    const navigate = useNavigate();
    const { version, abbrev, chapter } = useParams();

    useEffect(() => {
        if (!version || version.trim() === '') {
            navigate('/nvi');
            return;
        }

        if (!abbrev || abbrev.trim() === '') {
            navigate(`/${version}/gn`);
            return;
        }

        const validChapter = Number(chapter);
        if (!chapter || validChapter <= 0) {
            navigate(`/${version}/${abbrev}/1`);
            return;
        }
    }, [version, abbrev, chapter, navigate]);

    return { version, abbrev, chapter };
}
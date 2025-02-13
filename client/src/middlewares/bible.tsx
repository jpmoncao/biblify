import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function BibleRouteMiddleware({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { version, abbrev, chapter } = useParams();

    useEffect(() => {
        if (!version || !abbrev || !chapter) {
            navigate(`/${version ?? 'nvi'}/${abbrev ?? 'gn'}/${chapter ?? 1}`);
            return
        }
    }, []);

    return <>{children}</>;
}

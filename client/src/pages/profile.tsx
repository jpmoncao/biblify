import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Home, User2, LogOut } from "lucide-react";
import { apiAccount } from "@/services/api";
import useSettings from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

type UserType = {
    name: string;
    email: string;
    createdAt: string;
};

const SkeletonContent = () => (
    <main className="mb-12 w-full max-w-[400px] mx-auto absolute top-36 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="h-9 w-60 mt-2" />
        <Skeleton className="h-6 w-80 mt-2" />
        <Skeleton className="h-6 w-80 mt-2" />
    </main>
);

export default function Profile() {
    const navigate = useNavigate();
    const { settings, setToken, saveSettings } = useSettings();
    const [user, setUser] = useState<UserType>({ name: "", email: "", createdAt: "" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Seu Perfil | Biblify";

        const fetchUser = async () => {
            try {
                const token = settings.token;
                if (token) {
                    const response = await apiAccount.post("/users/token", { token });
                    const { user, tokenIsValid } = response.data.data;

                    if (!tokenIsValid) {
                        navigate("/login");
                        return;
                    }

                    const date = new Date(user.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    });

                    setUser({ name: user.name, email: user.email, createdAt: date });
                } else {
                    navigate("/login");
                    return;
                }
            } catch (error) {
                setUser({ name: "", email: "", createdAt: "" });
                setToken(null);
                saveSettings();
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate, saveSettings, setToken, settings.token]);

    function handleLogout() {
        setToken(null);
        saveSettings();
        toast({
            title: "Você saiu da sua conta...",
        });
        navigate("/login");
        location.reload();
    }

    return (
        <div className="animate-opacity text-foreground">
            <header className="bg-background py-4 px-4 w-full flex justify-around items-center border-b-[1px] fixed top-0 transition-all duration-200 ease-in h-20">
                <Link className="group w-4/8" to={"/"}>
                    <Button className="bg-primary-foreground border border-b-2 border-primary text-primary hover:text-primary-foreground hover:bg-primary">
                        <Home />
                        <span className="hidden xs:block">Home</span>
                    </Button>
                </Link>

                <h1 className="text-primary text-center font-semibold">Seu Perfil</h1>

                <Button className="group w-4/8 hover:bg-primary border border-b-2 border-primary hover:text-primary-foreground text-secondary-foreground bg-secondary" onClick={handleLogout}>
                    <LogOut />
                    <span className="hidden xs:block">Logout</span>
                </Button>
            </header>

            {isLoading ? (
                <SkeletonContent />
            ) : (
                <main className="mb-12 w-full max-w-[400px] mx-auto absolute top-36 left-1/2 -translate-x-1/2">
                    <div className="space-y-2">
                        <div className="flex flex-col w-full items-center">
                            <div className="w-20 h-20 rounded-full bg-primary-foreground flex justify-center items-center">
                                <User2 size={36} />
                            </div>
                            <h2 className="text-2xl text-primary font-bold mt-2">{user.name}</h2>
                            <p className="text-sm text-primary">{user.email}</p>
                            <p className="text-sm text-primary">Desde {user.createdAt}</p>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/common/loader";
import { apiAccount } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import useSettings from "@/hooks/use-settings";
import { Header } from "@/components/menu/header";

const formSchema = z
    .object({
        email: z.string().email({ message: "Insira um e-mail válido." }),
        password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    });

const SkeletonContent = () => (
    <main className="mb-12 w-full max-w-[400px] mx-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <Loader />
        <Skeleton className="h-6 mt-4 w-1/3" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-6 mt-4 w-1/3" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-9 mt-4 w-1/4 ml-auto" />
    </main>
)

export default function Login() {
    const navigate = useNavigate();
    const [toLoginUser, setToLoginUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const { settings, setToken, saveSettings } = useSettings();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        document.title = "Login | Biblify";
        verifyUserToken()
    }, []);

    async function verifyUserToken() {
        const token = settings().token;
        if (token)
            await apiAccount.post('/users/token', { token })
                .then((response) => {
                    const { tokenIsValid } = response.data.data;

                    if (tokenIsValid)
                        navigate('/profile');
                })
                .catch(() => {
                    setToken(null);
                    saveSettings();
                });

        setIsLoading(false);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setToLoginUser(true);

        const { email, password } = values;

        await apiAccount.post('/users/login', {
            email, password
        })
            .then((response) => {
                const { token } = response.data.data;

                setToken(token);

                toast({
                    title: "Login efetuado com sucesso!"
                });

                navigate('/');
                location.reload();
            })
            .catch((err) => {
                setToken(null);

                console.error(err);

                if (err.response.status = 400)
                    toast({
                        title: err.response.data.error,
                        description: err.response.data.message,
                        variant: "destructive",
                    });
                else
                    toast({
                        title: "Houve um erro ao efetuar login!",
                        description: "Tente novamente mais tarde.",
                        variant: "destructive",
                    });
            });

        setToLoginUser(false);
        saveSettings();
    }

    return (
        <div className="animate-opacity text-foreground flex justify-center items-center h-[90vh] pt-24">
            <Header title="Login" fnBackButton={() => navigate('/')} />

            {isLoading
                ? <SkeletonContent />
                : (<main className="w-full max-w-[400px] mx-auto pt-4 pb-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="seu-email@mail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Sua senha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col w-full items-center">
                                <Button type="submit" className="self-end w-36">{toLoginUser && <Loader />} Login</Button>
                                <Link to="/cadaster" className="text-xs text-primary mt-4 hover:underline transition-all">Sua primeira vez por aqui? Crie sua conta clicando aqui!</Link>
                            </div>
                        </form>
                    </Form>
                </main>
                )}
        </div >
    );
}

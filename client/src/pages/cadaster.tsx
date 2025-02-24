import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSettingsContext } from "@/contexts/settings";
import { useToast } from "@/hooks/use-toast";
import { apiAccount } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/common/header";

const formSchema = z
    .object({
        name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
        email: z.string().email({ message: "Insira um e-mail válido." }),
        password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
        confirmPassword: z
            .string()
            .min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "As senhas não coincidem.",
    });


const SkeletonContent = () => (
    <main className="mb-12 w-full max-w-[400px] mx-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <Loader />
        <Skeleton className="h-6 mt-4 w-1/3" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-6 mt-4 w-1/3" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-6 mt-4 w-1/3" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-6 mt-4 w-1/3" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-9 mt-4 w-1/4 ml-auto" />
    </main>
)

export default function Cadaster() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [toCreateUser, setToCreateUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { settings, setToken, saveSettings } = useSettingsContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        document.title = "Cadastrar conta | Biblify";
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
        setToCreateUser(true);

        const { name, email, confirmPassword } = values;

        await apiAccount.post('/users', {
            name, email, password: confirmPassword
        })
            .then(() => {
                toast({
                    title: "Cadastro efetuado",
                    description: "Conta criada com sucesso!",
                });

                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Houve um erro ao cadastrar usuário!",
                    description: "Tente novamente mais tarde.",
                    variant: "destructive",
                });
            });

        setToCreateUser(false);
    }

    return (
        <div className="animate-opacity text-foreground">
            <Header title="Cadastrar Conta" fnBackButton={() => navigate('/')} />

            {isLoading
                ? <SkeletonContent />
                : (<main className="mb-12 w-full max-w-[400px] mx-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="seu-email@mail.com" {...field} />
                                        </FormControl>
                                        <FormDescription>O email deve ser único.</FormDescription>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirme sua senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Repita a senha"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col w-full items-center">
                                <Button type="submit" className="self-end w-36">{toCreateUser && <Loader />} Cadastrar</Button>
                                <Link to="/login" className="text-xs text-primary mt-4 hover:underline transition-all">Você possui uma conta? Clique aqui para efetuar o login!</Link>
                            </div>
                        </form>
                    </Form>
                </main>
                )}
        </div >
    );
}

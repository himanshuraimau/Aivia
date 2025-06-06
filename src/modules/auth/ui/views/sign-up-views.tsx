"use client";
import { Card, CardContent } from "@/components/ui/card";
import { OctagonAlertIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                setPending(false);
                router.push("/");

            },
            onError: (error) => {
                setPending(false);
                setError(error.error?.message || "An error occurred");
            },

        });

    }

    const onSocial = async (provider: "google" | "github") => {
        setError(null);
        setPending(true);

        await authClient.signIn.social({
            provider,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                setPending(false);
            },
            onError: (error) => {
                setPending(false);
                setError(error.error?.message || "An error occurred");
            },

        });

    }
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Let&apos;s Get Started
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create your account to continue
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Confirm your password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                {!!error && (
                                    <Alert variant="destructive" className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4" />
                                        <AlertTitle>
                                            {error}
                                        </AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={pending}
                                >
                                    Sign Up
                                </Button>
                                <div className="after:border-border relative text-center text-sm
                                after:absolute after:inset-0 after:top-1/2 after:z-2
                                after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid gap-3">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={pending}
                                        onClick={() => onSocial("google")}
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={pending}
                                        onClick={() => onSocial("github")}
                                    >
                                        Github
                                    </Button>
                                </div>
                                <div className="text-muted-foreground text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative
                    hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <Image src="/logo.svg" alt="Aivia Logo" width={92} height={92} />
                        <p className="text-2xl font-semibold text-white">
                            Aivia
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUpView;
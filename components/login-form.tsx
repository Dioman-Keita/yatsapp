"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/app/lib/auth_client";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { AlertDescription } from "./ui/alert";
import Link from "next/link";

interface FormType {
    email: string;
    password: string;
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormdata] = useState<FormType>({
        email: "",
        password: "",
    });

    const googleLogin = async () => {
        try {
            setLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/chat",
            });
        } catch (err: any) {
            setError(err.message || "Erreur Google");
        } finally {
            setLoading(false);
        }
    };

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            setFormdata({ email: "", password: "" });

            setTimeout(() => {
                router.replace("/chat");
            }, 500);
        } catch (err: any) {
            setError(err.message || "Erreur de connexion");
        } finally {
            setLoading(false);
            setTimeout(() => setError(null), 3000);
        }
    };

    // 🔹 input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormdata(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Google account or email</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSignin}>
                        <FieldGroup>
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={googleLogin}
                                    disabled={loading}
                                    className="w-full">
                                    Login with Google
                                </Button>
                            </Field>

                            <FieldSeparator>Or continue with</FieldSeparator>

                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>

                            {error && (
                                <AlertDescription className="border-destructive border p-3 bg-destructive/10 rounded-md">
                                    {error}
                                </AlertDescription>
                            )}

                            <Field>
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? <Spinner /> : "Login"}
                                </Button>

                                <FieldDescription className="text-center mt-2">
                                    Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/app/lib/auth_client";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { AlertDescription } from "./ui/alert";
import Link from "next/link";

interface FormType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [formData, setFormdata] = useState<FormType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const googleSignup = async () => {
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

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.password.length < 8) {
            setError("Mot de passe trop court (min 8 caractères)");
            return;
        }

        try {
            setLoading(true);

            await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            setFormdata({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                router.replace("/chat");
            }, 500);
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
            setTimeout(() => setError(null), 3000);
        }
    };

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
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSignup}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Micheal Jackson"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="mj@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Field>
                                </div>

                                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                            </Field>

                            {error && (
                                <AlertDescription className="border-destructive border p-3 bg-destructive/10 rounded-md">
                                    {error}
                                </AlertDescription>
                            )}

                            <Field>
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? <Spinner /> : "Create Account"}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={googleSignup}
                                    disabled={loading}
                                    className="w-full mt-2">
                                    Continue with Google
                                </Button>

                                <FieldDescription className="text-center mt-2">
                                    Already have an account? <Link href="/login">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </FieldDescription>
        </div>
    );
}

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    // await authService.sendPasswordResetEmail(data.email)
    console.log(data);
  }

  return (
    <Card className="dark w-full bg-black shadow-sm shadow-foreground/20 z-10">
      <CardHeader>
        <CardTitle>Forgot your password?</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pb-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </Button>
          <Button variant="link" asChild className="w-full">
            <Link href="/login">Back to login</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

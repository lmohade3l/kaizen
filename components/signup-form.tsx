"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signupWithEmail } from "@/actions/auth/signup";
import { signIn } from "next-auth/react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{
    email: "";
    password: "";
    confirmPassword: "";
  }>({
    mode: "onBlur",
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      setError("password", {
        type: "validate",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const result = await signupWithEmail(data);

      console.log("result:", result);

      if (result.success) {
        await signIn("credentials", {
          email: data?.email,
          password: data?.password,
          redirect: false,
        });
        console.log("created a session!");
      } else {
        // setServerError("Signup failed");
      }
    } catch (err: any) {
      // setServerError(err.message || "Something went wrong");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className="flex flex-col gap-1">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                <p className="text-[12px] text-[red]">
                  {errors?.email?.message}
                </p>
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field className="flex flex-col gap-1">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      aria-invalid={!!errors.password}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      id="password"
                    />
                    <p className="text-[12px] text-[red]">
                      {errors?.password?.message}
                    </p>
                  </Field>
                  <Field className="flex flex-col gap-1">
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...register("confirmPassword", {})}
                      id="confirm-password"
                    />
                  </Field>
                </Field>
              </Field>

              <Field>
                <Button type="submit">Create Account</Button>
              </Field>

              <FieldSeparator>Or continue with</FieldSeparator>

              <Field>
                <Button onClick={() => signIn('google')} variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

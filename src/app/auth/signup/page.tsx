"use client";

import TextField from "@/components/ui/TextField";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/Google-alt.svg";
import { useActionState } from "react";
import { signupWithEmail } from "@/actions/auth/signup";

type FormState = {
  error: string;
  success: boolean;
};

export default function Signup() {
  const initialState: FormState = { error: "", success: false };

  const [state, formAction, isPending] = useActionState(
    async (formData: FormData): Promise<any> => {
      try {
        const result = await signupWithEmail(formData);

        if (result.success) {
          //   toast.success('Account created successfully');
          //   router.push('/dashboard');
        }

        return {
          success: result.success,
        };
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message || "An error occurred",
          errors: undefined,
        };
      }
    },
    initialState
  );

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-white flex flex-col items-center min-w-100 mx-auto border-1 border-gray-300 rounded-lg">
        <div className="flex flex-col gap-3 w-full items-center p-4">
          <p className="text-[24px] font-[500]">Create an account</p>

          <form
            action={formAction}
            className="flex flex-col gap-3 w-full items-center"
          >
            <div className="flex flex-col w-full gap-1">
              <p className="text-[14px] font-[400] pl-2">Email</p>
              <TextField
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <p className="text-[14px] font-[400] pl-2">Password</p>
              <TextField
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <p className="text-[14px] font-[400] pl-2">Confirm Password</p>
              <TextField
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
            </div>

            {state?.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="text-[14px] bg-lime-600 w-full rounded-lg p-2 text-white hover:bg-lime-500 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating Account..." : "Signup With Email"}
            </button>
          </form>

          <div className="flex w-full items-center gap-2">
            <div className="border-t-1 border-gray-300 flex-1"></div>
            <p className="text-[12px] text-gray-400">Or Continue With</p>
            <div className="border-t-1 border-gray-300 flex-1"></div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/api/auth/google";
            }}
            className="flex w-full gap-2 justify-center p-2 rounded-lg border border-gray-300 cursor-pointer text-[14px] hover:bg-gray-100 transition"
          >
            <Image src={GoogleIcon} alt="Google" width={20} height={20} />
            Google
          </button>

          <p className="text-[14px] mt-2">
            Already have an account?{" "}
            <span className="text-decoration-line: underline cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

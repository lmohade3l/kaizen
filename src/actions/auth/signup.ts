"use server";

import { v4 as uuidv4 } from "uuid";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signupWithEmail(
  formData: any
) {
  const supabase = createSupabaseServerClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const res = await supabase.from("users").insert({
    id: uuidv4(),
    email: email,
    password: password, 
    created_at: new Date().toISOString(), 
  });

  return { success: true };
}

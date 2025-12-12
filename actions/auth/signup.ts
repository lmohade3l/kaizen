"use server";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signupWithEmail(formData: any) {
  const supabase = createSupabaseServerClient();

  const { email, password } = formData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert({
    id: uuidv4(),
    email,
    password: hashedPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

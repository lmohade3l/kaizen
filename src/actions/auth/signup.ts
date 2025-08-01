'use server'

import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function signupWithEmail(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }
  console.log("imma use this supabase function")
//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//   })

  const { error: insertError } = await supabase.from('users').insert({
    // id: userId,
    email: email,
    created_at: new Date().toISOString()  // optional: depends on your schema
  })

//   if (error) {
//     return { error: error.message }
//   }

  return { success: true }
}

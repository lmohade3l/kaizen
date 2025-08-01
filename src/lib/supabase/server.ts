import { createClient } from '@supabase/supabase-js'

export const createSupabaseServerClient = () => {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for full access (secure only on server)
    {
      auth: {
        persistSession: false,
      },
    }
  )
}

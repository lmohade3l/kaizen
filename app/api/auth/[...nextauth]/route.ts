import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const supabase = createSupabaseServerClient();

        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;

        if (account?.provider === "google") {
          const supabase = createSupabaseServerClient();

          const { data: existing, error } = await supabase
            .from("users")
            .select("id")
            .eq("email", user.email)
            .maybeSingle();

          if (!existing && !error) {
            const { data: newUser } = await supabase
              .from("users")
              .insert({
                email: user.email,
                id: uuidv4(),
                password: uuidv4(),
              })
              .select("id")
              .single();

            token.id = newUser?.id ?? token.id;
          } else if (existing) {
            token.id = existing.id;
          }
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };

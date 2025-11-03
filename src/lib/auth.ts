import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Supabase에서 사용자 조회
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', credentials.username)
            .single();

          if (error || !user) {
            console.error('사용자 조회 오류:', error);
            return null;
          }

          // 비밀번호 확인 (서버 사이드에서만 실행)
          if (typeof window !== "undefined") {
            return null;
          }
          const bcrypt = require("bcryptjs");
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isValidPassword) {
            return null;
          }

          // 인증 성공
          return {
            id: user.id,
            name: user.name || user.username,
            email: user.email || undefined,
          };
        } catch (error) {
          console.error('인증 처리 오류:', error);
          return null;
        }
      }
    }),
    // 제공자를 여기에 추가할 수 있습니다.
  ],
  pages: {
    signIn: "/auth/login-idpw",
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
  debug: process.env.NODE_ENV === "development",
};

// 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

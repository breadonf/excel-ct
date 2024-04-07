import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const API = process.env.NEXT_PUBLIC_API;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en-US",
          },
        });
        const user = await res.json();
        if (!res.ok) {
          throw new Error("Wrong password or login name");
        }
        if (res.ok && user) return user;
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: "52c9077c-ffa9-4630-bf8d-fd63560bc2cf",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

export default (req, res) => NextAuth(req, res, options);

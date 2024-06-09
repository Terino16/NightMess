import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("No user found with this email");
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
       
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          authType: "google",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile.email.endsWith("@vitstudent.ac.in")) {
          return NextResponse.json({message:"You can use only VIT Gmail ID"});
        }
        const user = await prisma.user.findUnique({ where: { email: profile.email } });
        if (!user) {
          await prisma.user.create({
            data: {
              name: `${profile.given_name} ${profile.family_name}`,
              email: profile.email,
              hostel: "",
              room: 0,
              phone: "",
              seller: false,
              password: "",
            },
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({ where: { email: token.email } });
      if (user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.hostel = user.hostel;
        session.user.phone = user.phone;
        session.user.email = user.email;
        session.user.seller=user.seller;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
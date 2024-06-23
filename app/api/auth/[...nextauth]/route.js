import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log(profile, "user profile");
      const user = await prisma.user.findUnique({ where: { email: profile.email } });
      if (!user) {
        await prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email,
            hostel: "",
            room: 0,
            phone: "",
            profile: false,
            password: "",
          },
        });
      }
      return true;
    },
    async session({ session,token}) {
      const user = await prisma.user.findUnique({ where: { email: token.email } });
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.profile=user.profile;
      }
      return session;
    },
    async jwt({ token,user}) {
     
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

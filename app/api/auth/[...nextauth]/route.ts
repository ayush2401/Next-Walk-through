import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        if (session?.user) {
          const sessionUser = await User.findOne({ email: session.user.email });

          if (sessionUser) {
            session.user.id = sessionUser._id?.toString();
          }
        }
      } catch (error) {
        console.log(error);
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDatabase();
        // check
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          console.log(profile);
          await User.create({ email: profile?.email, username: profile?.name?.replace(" ", "").toLowerCase(), image: profile?.picture });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
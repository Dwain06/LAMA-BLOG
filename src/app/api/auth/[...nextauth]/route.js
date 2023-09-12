import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isPwdCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPwdCorrect) {
              return user;
            } else {
              throw new Error("Mot de passe incorrect")
            }
          } else {
            throw new Error("Adresse email inconnue");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages:{
    error: "/dashboard/login",
  }
});

export { handler as GET, handler as POST };

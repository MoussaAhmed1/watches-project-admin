import NextAuth from 'next-auth'
import { authOptions } from '../_options'
import { cookies } from "next/headers";
// Services
const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: 'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
        if (user) {
            token.username = user.data?.username;
            token.name = user.data?.first_name + " " +user.data?.last_name;
            token.email = user.data?.email;
            token.phone = user.data?.phone;
            token.gender = user.data?.gender;
            token.avatar = user.data?.avatar;
            token.accessToken = user.data?.access_token;

            cookies().set("access_token", user.data?.access_token, {
                path: "/",
                httpOnly: true,
              });
        }
        return token;
    },
    async session({ session, token, user }: any) {
        if (user) {
            session.user.name = user.name;
            session.user.email = user.email;
            session.user.image = user.avatar;

            session.user.username = user.username;
            session.user.phone = user.phone;
            session.user.gender = user.gender;
            
        }
        return session;
    },
},
jwt: {
    secret: process.env.NEXTAUTH_SECRET
}
})

export { handler as GET, handler as POST }

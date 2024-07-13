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
            token.first_name = user.data?.first_name;
            token.last_name = user.data?.last_name;
            token.email = user.data?.email;
            token.phone = user.data?.phone;
            token.gender = user.data?.gender;
            token.avatar = user.data?.avatar;
            token.image = user.data?.avatar;
            token.birth_date = user.data?.birth_date;
            token.id = user.data?.id;
            token.accessToken = user.data?.access_token;

            cookies().set("access_token", user.data?.access_token, {
                path: "/",
                httpOnly: true,
              });
        }
        return token;
      },
      async session({ session, token, newSession }: any) {
        delete(token?.accessToken);//remove session token
        session.user = {...token}
        if (newSession ) {
            session.user.name = newSession.data?.first_name + " " + newSession.data?.last_name;
            session.user.firs = newSession.first_name;
            session.user.name = newSession.last_name;
            session.user.email = newSession.email;
            session.user.image = newSession.avatar;
            session.user.phone = newSession.phone;
            session.user.gender = newSession.gender; 
        }
        return session;
    },
},
jwt: {
    secret: process.env.NEXTAUTH_SECRET
}
})

export { handler as GET, handler as POST }

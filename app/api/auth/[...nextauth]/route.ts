import NextAuth from 'next-auth'
import { authOptions } from '../_options'
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
        }
        return token;
    },
    async session({ session, user, token }: any) {
        if (token) {
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.avatar;

            session.user.username = token.username;
            session.user.phone = token.phone;
            session.user.gender = token.gender;
            
        }
        return session;
    },
},
jwt: {
    secret: process.env.NEXTAUTH_SECRET
}
})

export { handler as GET, handler as POST }

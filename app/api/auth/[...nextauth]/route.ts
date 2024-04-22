import NextAuth from 'next-auth'
import { authOptions } from '../_options'
// Services
const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: 'jwt'
  },
  secret:"secret",
  callbacks: {
    async jwt({ token, user }: any) {
        if (user) {
            token.username = user.username;
            token.img = user.img;
        }
        return token;
    },
    async session({ session, token }: any) {
        if (token) {
            session.user.name = token.username;
            session.user.image = token.img;
        }
        return session;
    },
}
})

export { handler as GET, handler as POST }

import NextAuth from 'next-auth'
import { authOptions } from '../_options'
// Services
const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: 'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
jwt: {
    secret: process.env.NEXTAUTH_SECRET
}
})

export { handler as GET, handler as POST }

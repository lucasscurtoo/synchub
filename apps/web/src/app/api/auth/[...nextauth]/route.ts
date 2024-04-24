import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { encode } from 'next-auth/jwt'
import appSlice, { setAppNotification } from '@/redux/reducers/appSlice'
import { store } from '@/redux/store'

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const user = await res.json()

        if (res.status !== 200) {
          throw new Error(user.message)
        }
        // checking if the password was correct

        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved

        return null
      },
    }),
  ],
  // Pages for the diferent uses
  pages: {
    signIn: '/auth',
    error: '/auth',
    signOut: '/auth',
  },

  logger: {
    error(code, metadata) {
      console.log(code, metadata)
    },
    warn(code) {
      console.log(code)
    },
    debug(code, metadata) {
      console.log(code, metadata)
    },
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      const encoded = await encode({
        token,
        secret: process.env.NEXTAUTH_SECRET || '',
      })
      session.user = Object.assign({}, session.user, token.user)
      session.token = Object.assign({}, session.token, { accessToken: encoded })
      return session
    },
  },

  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


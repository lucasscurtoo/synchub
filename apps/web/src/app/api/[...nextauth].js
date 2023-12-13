import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { useLoginMutation } from '@/redux/api/userApi'
export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log(credentials)
        try {
          const response = await axios.post(
            `${process.env.DATABASE_URL}/auth/login`,
            {
              username: credentials.username,
              password: credentials.password,
            }
          )
          const user = await response.data

          if (user) {
            // If the backend returns a user, you can create the session
            return Promise.resolve(user)
          } else {
            // If there is no user data, the login fails
            return Promise.resolve(null)
          }
        } catch (error) {
          // If there is an error in the request, the login fails
          return Promise.resolve(null)
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  // A continuación, puedes agregar más opciones, como sesiones, JWT, eventos, etc.
})

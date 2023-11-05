import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const user = await axios.post('https://tu-backend.com/api/login', {
            username: credentials.username,
            password: credentials.password
          })

          if (user.data) {
            // Si el backend devuelve un usuario, se crea la sesión
            return Promise.resolve(user.data)
          } else {
            // Si no hay datos de usuario, el inicio de sesión falla
            return Promise.resolve(null)
          }
        } catch (error) {
          // Si hay un error en la solicitud, el inicio de sesión falla
          return Promise.resolve(null)
        }
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    }),
  ],
  // A continuación, puedes agregar más opciones, como sesiones, JWT, eventos, etc.
})

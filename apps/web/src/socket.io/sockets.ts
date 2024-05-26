import { getSession } from 'next-auth/react'
import { io, Socket } from 'socket.io-client'

export const createConnectionWithToken = async (
  namespace: string
): Promise<Socket> => {
  const session = await getSession()
  const token = session?.token.accessToken

  return new Promise((resolve, reject) => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/${namespace}`, {
      auth: {
        token,
      },
    })

    socket.on('connect', () => {
      resolve(socket)
    })

    socket.on('connect_error', (error: any) => {
      reject(error)
    })
  })
}

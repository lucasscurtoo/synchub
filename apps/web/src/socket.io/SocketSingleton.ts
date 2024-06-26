import { getSession } from 'next-auth/react'
import { io, Socket } from 'socket.io-client'

export class SocketSingleton {
  private static instance: Socket | null = null

  private constructor() {}

  public static async getInstance(): Promise<Socket> {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = await createConnectionWithToken('chats')
    }
    return SocketSingleton.instance
  }
}

async function createConnectionWithToken(namespace: string): Promise<Socket> {
  const session = await getSession()
  const token = session?.token.accessToken
  const userId = session?.user.id

  return new Promise((resolve, reject) => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/${namespace}`, {
      auth: {
        token,
        id: userId,
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

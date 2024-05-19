import { getSession } from 'next-auth/react'
import { io, Socket } from 'socket.io-client'

type messageProps = {
  senderId: string
  receiverId: string
  chatId: string
  message: string
}
class ChatApi {
  private socket!: Socket

  async connect({ _id, fullName }: { _id: string; fullName: string }) {
    const createConectionWithToken = async (): Promise<Socket> => {
      const session = await getSession()
      return new Promise((resolve, reject) => {
        this.socket = io('http://localhost:8000/chats', {
          auth: {
            userId: _id,
            name: fullName,
            token: session?.token.accessToken,
          },
        })

        this.socket.on('connect', () => {
          resolve(this.socket)
        })

        this.socket.on('connect_error', (error: any) => {
          reject(error)
        })
      })
    }
    return await createConectionWithToken()
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
  getChats(callback: (chats: any) => void) {
    if (this.socket) {
      this.socket.on('chats', callback)
    }
  }

  sendMessage({ senderId, receiverId, chatId, message }: messageProps) {
    if (this.socket) {
      this.socket.emit('chatToServer', {
        senderId,
        receiverId,
        chatId,
        message,
      })
    }
  }

  // emitChat(chat: any) {
  //   this.socket.emit('chat', chat)
  // }
}

export const chatApi = new ChatApi()

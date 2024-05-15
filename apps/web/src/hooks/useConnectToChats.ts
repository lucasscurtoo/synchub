import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { chatApi } from '@/socket.io/chat.api'
import { setChats } from '@/redux/reducers/chatSlice'
import { setAppNotification } from '@/redux/reducers/appSlice'

const useChat = (userId: string, fullName: string) => {
  const [isConnected, setIsConnected] = useState(false)
  const dispatch = useDispatch()

  const connect = () => {
    if (userId !== '' && fullName !== '') {
      chatApi
        .connect({ userId, fullName })
        .then(() => setIsConnected(true))
        .catch((error) => {
          console.error('Error al establecer la conexión', error)
          dispatch(
            setAppNotification({
              error: true,
              message:
                'Error al establecer la conexión, intente nuevamente más tarde',
            })
          )
        })

      return () => {
        chatApi.disconnect()
        setIsConnected(false)
      }
    }
  }

  const getChats = () => {
    return new Promise((resolve, reject) => {
      if (userId !== '' && fullName !== '') {
        chatApi.getChats((chats) => {
          resolve(chats)
          dispatch(setChats(chats.data))
        })
      }
    })
  }

  useEffect(() => {
    connect()
  }, [userId, fullName, dispatch])

  return { getChats, isConnected }
}

export default useChat

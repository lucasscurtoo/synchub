import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatApi } from '@/socket.io/chat.api'
import { setChats } from '@/redux/reducers/chatSlice'
import { setAppNotification } from '@/redux/reducers/appSlice'
import { RootState } from '@/redux/store'
import { isEmpty } from 'lodash'

const useChat = () => {
  const [isConnected, setIsConnected] = useState(false)
  const dispatch = useDispatch()
  const { _id, fullName } = useSelector((state: RootState) => state.user)
  const { selectedChat } = useSelector((state: RootState) => state.chat)

  const connect = () => {
    if (!isEmpty(_id) && !isEmpty(fullName)) {
      chatApi
        .connect({ _id, fullName })
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
      if (!isEmpty(_id) && !isEmpty(fullName)) {
        console.log(_id)
        chatApi.getChats((chats) => {
          console.log(chats)
          resolve(chats)
          dispatch(setChats(chats.data))
        })
      }
    })
  }

  const sendMessage = (message: string) => {
    chatApi.sendMessage({
      senderId: _id,
      receiverId: selectedChat.partnerData._id,
      chatId: selectedChat._id,
      message,
    })
  }

  useEffect(() => {
    connect()
  }, [_id, fullName, dispatch])

  return { getChats, isConnected, sendMessage }
}

export default useChat

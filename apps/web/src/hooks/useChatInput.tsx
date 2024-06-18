import { useCreateChatMutation } from '@/redux/api/chatApi'
import {
  useEditMessageMutation,
  useSendChatMessageMutation,
} from '@/redux/api/messageApi'
import { setMessageToEdit } from '@/redux/reducers/messagesSlice'
import { RootState } from '@/redux/store'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useChatInput = (handleAction: () => void) => {
  const [textMessage, setTextMessage] = useState('')
  const { _id } = useSelector((state: RootState) => state.user)
  const { selectedChat } = useSelector((state: RootState) => state.chat)
  const { messageToEdit } = useSelector((state: RootState) => state.messages)
  const dispatch = useDispatch()

  const [sendChatMessage] = useSendChatMessageMutation()
  const [createChat] = useCreateChatMutation()
  const [editMessage] = useEditMessageMutation()

  useEffect(() => {
    if (messageToEdit !== '') {
      setTextMessage(messageToEdit)
    }
  }, [messageToEdit])

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value)
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAction()
    }
  }

  const handleSendMessage = () => {
    if (selectedChat._id === 'NEW_CHAT') {
      createChat({
        senderId: _id,
        receiverId: selectedChat.partnerData._id,
        chatId: selectedChat._id,
        message: textMessage,
      })
    } else {
      sendChatMessage({
        senderId: _id,
        receiverId: selectedChat.partnerData._id,
        chatId: selectedChat._id,
        message: textMessage,
      })
    }
    setTextMessage('')
  }

  const handleEditMessage = () => {
    if (textMessage === messageToEdit) {
      handleCancelEditMessage()
    } else {
      editMessage({
        messageToEdit,
        newMessage: textMessage,
        chatId: selectedChat._id,
        participants: selectedChat.participants,
      })
    }
  }

  const handleCancelEditMessage = () => {
    dispatch(setMessageToEdit(''))
  }

  return {
    textMessage,
    handleChangeInput,
    handleEnter,
    handleSendMessage,
    handleEditMessage,
    handleCancelEditMessage,
  }
}

export default useChatInput

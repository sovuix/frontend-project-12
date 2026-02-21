import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLoading,
  setError,
  setChannels,
} from '../state/slices/channelsSlice'
import Header from './Header/Header'
import ChannelsPanel from './ChannelsPanel/ChannelsPanel'
import ChatPanel from './ChatPanel/ChatPanel'

import socket from '../services/socket'
import { addMessage } from '../state/slices/messagesSlice'
import { setMessages } from '../state/slices/messagesSlice'
import { setUser } from '../state/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import {
  removeChannel,
  renameChannel,
  addChannel,
} from '../state/slices/channelsSlice'
import Button from './Button/Button'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken')
  const { t } = useTranslation()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
  }, [navigate, token])

  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log('Получено через WebSocket:', message)
      dispatch(addMessage(message))
    }

    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel))
    }

    const handleRemoveChannel = ({ id }) => {
      dispatch(removeChannel(id))
    }

    const handleRenameChannel = ({ id, name }) => {
      dispatch(renameChannel({ id, name }))
    }

    socket.on('newMessage', handleNewMessage)
    socket.on('newChannel', handleNewChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('renameChannel', handleRenameChannel)

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
    }
  }, [dispatch])

  const { channels, error, loading } = useSelector(state => state.chat)
  const messagesIds = useSelector(state => state.messages.ids)

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        dispatch(setLoading())
        const token = localStorage.getItem('jwtToken')

        if (!token) {
          return
        }

        const response = await fetch('/api/v1/channels', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.clear()
            navigate('/login')
            return
          }
          throw new Error(t('channel.errorDownloadCHannels'))
        }

        const data = await response.json()
        dispatch(setChannels(data))
      }
      catch (error) {
        dispatch(setError(error.message))
        console.error('Error', error)
      }
    }

    if (token && channels.length === 0) {
      fetchChannels()
    }
  }, [dispatch, token, channels.length, navigate, t])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('jwtToken')

        if (!token) {
          return
        }

        const response = await fetch('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.clear()
            navigate('/login')
            return
          }
          throw new Error(t('channel.errorDownloadMessages'))
        }

        const data = await response.json()
        dispatch(setMessages(data))
      }
      catch (err) {
        console.error(t('channel.errorDownloadMessages'), err)
      }
    }

    if (token && messagesIds.length === 0) {
      fetchMessages()
    }
  }, [dispatch, token, messagesIds.length, navigate, t])

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    const username = localStorage.getItem('username')

    if (token && username) {
      dispatch(setUser({ username, token }))
    }
  }, [dispatch])

  if (!token) {
    return null
  }

  if (loading && channels.length === 0) {
    return <div>Загрузка каналов...</div>
  }

  if (error && channels.length === 0) {
    return <div>Ошибка: {error}</div>
  }

  const clearToken = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header>
            {localStorage.getItem('jwtToken') && (
              <Button
                type="button"
                className="btn btn-primary"
                text={t('auth.logout')}
                onClick={clearToken}
              />
            )}
          </Header>
          <ToastContainer />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <ChannelsPanel />
              <ChatPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

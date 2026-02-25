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
import { setMessages } from '../state/slices/messagesSlice'
import { setUser } from '../state/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Button from './Button/Button'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import ErrorPage from './ErrorPage'
import { authStorage } from '../services/authStorage'
import { ROUTES } from '../services/routes'

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const token = authStorage.getToken()
    if (!token) {
      navigate(ROUTES.LOGIN)
      return
    }
  }, [navigate])

  const { channels, error, loading } = useSelector(state => state.channels)
  const messagesIds = useSelector(state => state.messages.ids)

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        dispatch(setLoading())
        const token = authStorage.getToken()
        if (!token) {
          return
        }

        const response = await fetch('/api/v1/channels', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            authStorage.clear()
            navigate(ROUTES.LOGIN)
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

    const token = authStorage.getToken()
    if (token && channels.length === 0) {
      fetchChannels()
    }
  }, [dispatch,channels.length, navigate, t])

  useEffect(() => {
    const token = authStorage.getToken()
    const fetchMessages = async () => {
      try {

        if (!token) {
          return
        }

        const response = await fetch('/api/v1/messages', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            authStorage.clear()
            navigate(ROUTES.LOGIN)
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
  }, [dispatch, messagesIds.length, navigate, t])

  useEffect(() => {
    const token = authStorage.getToken()
    const username = authStorage.getUsername()
    if (token && username) {
      dispatch(setUser({ username, token }))
    }
  }, [dispatch])

  const token = authStorage.getToken()
  if (!token) {
    return null
  }

  if (loading && channels.length === 0) {
    return <div>Загрузка каналов...</div>
  }

  if (error && channels.length === 0) {
    return (
      <ErrorPage
        title="common.notResponding"
        showLink={false}
      />
    )
  }

  const clearToken = () => {
    authStorage.clear()
    navigate(ROUTES.LOGIN)
  }

  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header>
            {token && (
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

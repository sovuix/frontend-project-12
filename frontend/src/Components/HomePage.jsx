import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import ChannelsPanel from './ChannelsPanel/ChannelsPanel'
import ChatPanel from './ChatPanel/ChatPanel'
import Button from './Button/Button'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import ErrorPage from './ErrorPage'
import { authStorage } from '../services/authStorage'
import { chatApi, useGetChannelsQuery, useGetMessagesQuery } from '../state/chatApi'
import store from '../state/store'
import { ROUTES } from '../services/routes'
import { HTTP_STATUS } from '../services/httpStatus'

const HomePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = authStorage.getToken()

  useEffect(() => {
    if (!token) navigate(ROUTES.LOGIN)
  }, [token, navigate])

  const channelsQuery = useGetChannelsQuery(undefined, { skip: !token })
  const messagesQuery = useGetMessagesQuery(undefined, { skip: !token })

  const {
    data: channels = [],
    isLoading: channelsLoading,
    isSuccess: channelsSuccess,
    isError: channelsIsError,
    error: channelsError,
  } = channelsQuery

  const {
    data: messages = [],
    isLoading: messagesLoading,
    isSuccess: messagesSuccess,
    isError: messagesIsError,
    error: messagesError,
  } = messagesQuery

  useEffect(() => {
    const status = channelsError?.status || messagesError?.status
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      authStorage.clear()
      store.dispatch(chatApi.util.resetApiState())
      navigate(ROUTES.LOGIN)
    }
  }, [channelsError, messagesError, navigate])

  if (!token) return null

  const initialLoading = (channelsLoading && !channelsSuccess) || (messagesLoading && !messagesSuccess)

  if (initialLoading) return <div>Загрузка...</div>

  if (channelsIsError || messagesIsError) {
    return (
      <ErrorPage
        title="common.notResponding"
        showLink={false}
      />
    )
  }

  const logout = () => {
    authStorage.clear()
    store.dispatch(chatApi.util.resetApiState())
    navigate(ROUTES.LOGIN)
  }

  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header>
            <Button
              type="button"
              className="btn btn-primary"
              text={t('auth.logout')}
              onClick={logout}
            />
          </Header>

          <ToastContainer />

          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <ChannelsPanel channels={channels} />
              <ChatPanel channels={channels} messages={messages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

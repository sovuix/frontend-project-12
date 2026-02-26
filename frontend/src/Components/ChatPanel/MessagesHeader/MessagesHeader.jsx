import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const MessagesHeader = ({ channels = [], messages = [] }) => {
  const { t } = useTranslation()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const currentChannel = channels.find(ch => ch.id === currentChannelId)
  const countMessages = messages.filter(m => m.channelId === currentChannelId).length

  return (
    channels.length && (
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {currentChannel?.name ?? ''}
          </b>
        </p>
        <span className="text-muted">{t('msg', { count: countMessages })}</span>
      </div>
    )
  )
}

export default MessagesHeader

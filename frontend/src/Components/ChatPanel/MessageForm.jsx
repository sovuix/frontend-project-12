import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from '../../services/profanity'
import { HTTP_STATUS } from '../../services/httpStatus'
import { useSendMessageMutation } from '../../state/chatApi'

const MessageForm = () => {
  const [text, setText] = useState('')
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const username = useSelector(state => state.auth.username)

  const { t } = useTranslation()
  const notifyError = text => toast.error(text)

  const [sendMessage, { error: sendMessageError }] = useSendMessageMutation()

  const isDisabled = !currentChannelId || !text.trim()

  useEffect(() => {
    if (!sendMessageError) return

    if (sendMessageError.status === 'FETCH_ERROR' || !navigator.onLine) {
      notifyError(t('common.connectionError'))
      return
    }

    if (sendMessageError.status >= HTTP_STATUS.INTERNAL_SERVER) {
      notifyError(t('common.notResponding'))
      return
    }

    notifyError(t('chat.errorSendingMessage'))
  }, [sendMessageError, t])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isDisabled) return

    if (!navigator.onLine) {
      notifyError(t('common.connectionError'))
      return
    }

    const cleanedText = filter.clean(text.trim())

    const result = await sendMessage({
      channelId: currentChannelId,
      text: cleanedText,
      username,
    })

    if ('error' in result) return

    setText('')
  }

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-border-0 p-0 ps-2 form-control"
            placeholder={t('chat.typeMessage')}
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={!currentChannelId}
            aria-label="Новое сообщение"
          />
          <Button
            type="submit"
            className="btn btn-group-vertical-primary"
            disabled={isDisabled}
            text={t('chat.send')}
          />
        </div>
      </form>
    </div>
  )
}

export default MessageForm

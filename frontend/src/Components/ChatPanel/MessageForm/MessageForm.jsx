import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../Button/Button'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from '../../../services/profanity'

const MessageForm = () => {
  const [text, setText] = useState('')
  const currentChannelId = useSelector(state => state.chat.currentChannelId)
  const username = useSelector(state => state.auth.username)
  const { t } = useTranslation()
  const notifyError = text => toast.error(text)

  const isDisabled = !currentChannelId || !text.trim()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isDisabled) return

    try {
      const token = localStorage.getItem('jwtToken')
      const cleanedText = filter.clean(text.trim())
      const response = await fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelId: currentChannelId,
          text: cleanedText,
          username: username,
        }),
      })

      if (response.ok) {
        setText('')
      }
      else {
        notifyError(t('chat.errorSendingMessage'))
      }
    }
    catch {
      notifyError(t('common.connectionError'))
    }
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

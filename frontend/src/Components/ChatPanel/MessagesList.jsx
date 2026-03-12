import { useSelector } from 'react-redux'

const MessagesList = ({ messages = [] }) => {
  const currentChannelId = useSelector(
    state => state.channels.currentChannelId,
  )
  const filteredMessages = messages.filter(
    msg => msg.channelId === currentChannelId,
  )
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {filteredMessages.map(msg => (
        <div key={msg.id} className="text-break mb-2">
          <b>
            {msg.username}
            :
          </b>
          {msg.text}
        </div>
      ))}
    </div>
  )
}

export default MessagesList

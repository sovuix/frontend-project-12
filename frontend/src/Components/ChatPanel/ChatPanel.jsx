import MessagesHeader from './MessagesHeader/MessagesHeader'
import MessagesList from './MessagesList/MessagesList'
import MessageForm from './MessageForm/MessageForm'

const ChatPanel = ({ channels = [], messages = [] }) => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader channels={channels} messages={messages} />
        <MessagesList messages={messages} />
        <MessageForm />
      </div>
    </div>
  )
}

export default ChatPanel

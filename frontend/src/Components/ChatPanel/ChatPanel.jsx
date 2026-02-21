import MessagesHeader from './MessagesHeader/MessagesHeader'
import MessagesList from './MessagesList/MessagesList'
import MessageForm from './MessageForm/MessageForm'

const ChatPanel = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <MessagesList />
        <MessageForm />
      </div>
    </div>
  )
}

export default ChatPanel

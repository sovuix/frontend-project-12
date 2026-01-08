import MessagesHeader from './MessagesHeader/MessagesHeader';

const ChatPanel = () => {
    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <MessagesHeader/>
            </div>
        </div>
    );
};

export default ChatPanel;

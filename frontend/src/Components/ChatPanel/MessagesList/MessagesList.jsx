import React from 'react';
import { useSelector} from 'react-redux';
import { useMemo } from 'react';
import { selectMessagesByChannelId } from '../../../state/slices/messagesSlice';


const MessagesList = () => {
    const currentChannelId = useSelector(
        (state) => state.chat.currentChannelId
    );
    const messagesSelector = useMemo(
        () => selectMessagesByChannelId(currentChannelId),
        [currentChannelId] 
    );

    const messages = useSelector(messagesSelector);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {messages.map((msg) => (
                <div key={msg.id} className="text-break mb-2">
                    <b>{msg.username}:</b> {msg.text}
                </div>
            ))}
        </div>
    );
};

export default MessagesList;

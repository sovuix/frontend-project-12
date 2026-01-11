import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessagesByChannelId } from '../../../state/slices/messagesSlice';

const MessagesList = () => {
    const currentChannelId = useSelector(
        (state) => state.chat.currentChannelId
    );

    const authName = useSelector((state) => state.auth.username)
    const messages = useSelector((state) =>
        selectMessagesByChannelId(state, currentChannelId)
    );
    console.log('MessagesList: currentChannelId=', currentChannelId);
    console.log('MessagesList: messages=', messages);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {messages.map((msg) => (
                <div key={msg.id} className="text-break mb-2">
                    <b>{authName}:</b> {msg.text}
                </div>
            ))}
        </div>
    );
};

export default MessagesList;

import React from 'react';
import { useSelector } from 'react-redux';
import {selectMessagesCountByChannelId} from '../../../state/slices/messagesSlice'

const MessagesHeader = () => {
    const currentChannelId = useSelector(
        (state) => state.chat.currentChannelId
    );
    const channels = useSelector((state) => state.chat.channels);
    const currentChannel = channels.find((ch) => ch.id === currentChannelId);

    // const countMessages = useSelector(selectMessagesCountByChannelId(currentChannelId))
    const countMessages = useSelector((state) => 
    selectMessagesCountByChannelId(state, currentChannelId)
);

    return (
        channels.length && (
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {currentChannel.name}</b>
                </p>
                <span className='text-muted'>{countMessages} сообщений</span> 
            </div>
        )
    );
};

export default MessagesHeader;

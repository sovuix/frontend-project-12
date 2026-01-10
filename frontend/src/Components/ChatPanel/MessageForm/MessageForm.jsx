import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../Button/Button';

const MessageForm = () => {
    const [text, setText] = useState('');
    const currentChannelId = useSelector((state) => state.chat.currentChannelId);
    
    const isDisabled = !currentChannelId || !text.trim();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDisabled) return;
        
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch('/api/v1/messages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId: currentChannelId,
                    text: text.trim(),
                }),
            });
            
            if (response.ok) {
                setText('');
                console.log('Сообщение отправлено');
            } else {
                console.error('Ошибка отправки сообщения');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };
    
    return (
        <div className='mt-auto px-5 py-3'>
            <form onSubmit={handleSubmit} className="border-top p-3">
            <div className="input-group">
                <input
                    type="text"
                    className="form-border-0 p-0 ps-2 form-control"
                    placeholder="Введите сообщение..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={!currentChannelId}
                />
                <Button
                    type="submit"
                    className="btn btn-group-vertical-primary"
                    disabled={isDisabled}
                    text="Отправить"
                />
            </div>
        </form>
        </div>
    );
};

export default MessageForm;
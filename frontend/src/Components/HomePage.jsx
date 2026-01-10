import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setLoading,
    setError,
    setChannels,
} from '../state/slices/channelsSlice';
import Header from './Header/Header';
import ChannelsPanel from './ChannelsPanel/ChannelsPanel';
import ChatPanel from './ChatPanel/ChatPanel';

import socket from '../services/socket';
import { addMessage } from '../state/slices/messagesSlice';
import { setMessages } from '../state/slices/messagesSlice';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Начинаем слушать WebSocket...');

        const handleNewMessage = (message) => {
            console.log('Получено через WebSocket:', message);
            dispatch(addMessage(message));
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [dispatch]);

    const { channels, loading, error } = useSelector((state) => state.chat);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                dispatch(setLoading());
                const token = localStorage.getItem('jwtToken');

                const response = await fetch('/api/v1/channels', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке каналов');
                }

                const data = await response.json();
                dispatch(setChannels(data));
            } catch (error) {
                dispatch(setError(error));
                console.error('Error', error);
            }
        };
        fetchChannels();
    }, [dispatch]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch('/api/v1/messages', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setMessages(data)); // ← нужен импорт setMessages!
                }
            } catch (err) {
                console.error('Ошибка загрузки сообщений:', err);
            }
        };

        fetchMessages();
    }, [dispatch]);

    if (loading) {
        return <div>Загрузка каналов...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    console.log(channels);

    return (
        <div className="h-100 bg-light">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <Header />
                    <div className="container h-100 my-4 overflow-hidden rounded shadow">
                        <div className="row h-100 bg-white flex-md-row">
                            <ChannelsPanel />
                            <ChatPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

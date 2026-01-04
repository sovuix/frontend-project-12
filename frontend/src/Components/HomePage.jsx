// import { useEffect, useState } from 'react';
// import Header from './Header/Header';
// import ChatLeftPanel from './chatLeftPanel/chatLeftPanel';

// const HomePage = () => {
//   const [channels, setChannels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       try {
//         const token = localStorage.getItem('jwtToken');

//         const response = await fetch('/api/v1/channels', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Ошибка при загрузке каналов'); //может быть сюда пропсом стоит передать "страница не найдена"?
//         }

//         const data = await response.json();
//         setChannels(data);

//       } catch (err) {
//         setError(err.message);
//         console.error('Ошибка:', err);
//       } finally {
//         setLoading(false); // так нормально?
//       }
//     };

//     fetchChannels();

//   }, []);

//   if (loading) {
//     return <div>Загрузка каналов...</div>;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }
//   console.log(channels);

//   return (
//   //   <div>
//   //     <h1>Тут будет чат.. может быть..</h1>
//   //     <div>
//   //       <h2>Каналы:</h2>
//   //       {channels.length > 0 ? (
//   //         <ul>
//   //           {channels.map(channel => (
//   //             <li key={channel.id}>{channel.name}</li>
//   //           ))}
//   //         </ul>
//   //       ) : (
//   //         <p>Нет доступных каналов</p>
//   //       )}
//   //     </div>
//   //   </div>
//   // );

//   <div className="h-100 bg-light">
//       <div className="h-100" id="chat">
//         <div className="d-flex flex-column h-100">
//           <Header />
//           <div className='container h-100 my-4 overflow-hidden rounded shadow'>
//             <div className='row h-100 bg-white flex-md-row'>
//             <ChatLeftPanel />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setLoading,
    setError,
    setChannels,
} from '../state/slices/channelsSlice';
import Header from './Header/Header';
import ChatLeftPanel from './ChatLeftPanel/ChatLeftPanel';

const HomePage = () => {
    const dispatch = useDispatch();

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
                            {/* 10. Передаем channels в ChatLeftPanel как пропс, если нужно */}
                            <ChatLeftPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

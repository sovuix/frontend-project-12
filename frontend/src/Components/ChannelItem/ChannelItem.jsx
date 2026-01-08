import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../../state/slices/channelsSlice';
import Button from '../Button/Button';

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  
  const isActive = channel.id === currentChannelId;

  const handleClick = () => {
    dispatch(setCurrentChannel(channel.id));
  };

  return (
    <Button 
      text={`# ${channel.name}`}
      className={`w-100 rounded-0 text-start btn ${isActive ? 'btn-secondary' : ''}`}
      onClick={handleClick}
      type="button"
    />
  );
};

export default ChannelItem;
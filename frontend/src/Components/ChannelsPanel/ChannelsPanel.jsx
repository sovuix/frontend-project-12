import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button/Button";
import ChannelItem from "../ChannelItem/ChannelItem";
import {
  removeChannel,
  renameChannel,
  setCurrentChannel,
} from "../../state/slices/channelsSlice";
import {
  createChannel,
  deleteChannel,
  renameChannel as renameChannelAPI,
} from "../../services/channelService";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import filter from "leo-profanity";

const ChannelsPanel = () => {
  const notify = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  const { t } = useTranslation();
  const channels = useSelector((state) => state.chat.channels);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    filter.loadDictionary("ru");
  }, []);

  const handleAddChannel = async (channelName) => {
  try {
    if (!navigator.onLine) {
      notifyError(t("common.connectionError"));
      return;
    }

    const cleanedChannelName = filter.clean(channelName.trim());
    const newChannel = await createChannel(cleanedChannelName);
    dispatch(setCurrentChannel(newChannel.id));
    setShowModal(false);
    notify(t("channel.channelCreated"));
  } catch {
    notifyError(t("channel.errorCreated"));
  }
};

  const handleDeleteChannel = async (channelId) => {
  try {
    if (!navigator.onLine) {
      notifyError(t("common.connectionError"));
      return;
    }

    await deleteChannel(channelId);
    dispatch(removeChannel(channelId));

    if (currentChannelId === channelId) {
      const remainingChannels = channels.filter((ch) => ch.id !== channelId);
      if (remainingChannels.length > 0) {
        dispatch(setCurrentChannel(remainingChannels[0].id));
      }
    }

    setShowModal(false);
    notify(t("channel.channelDeleted"));
  } catch {
    notifyError(t("channel.errorDeleted"));
  }
};

const handleRenameChannel = async (channelId, newName) => {
  try {
    if (!navigator.onLine) {
      notifyError(t("common.connectionError"));
      return;
    }

    await renameChannelAPI(channelId, newName);
    dispatch(renameChannel({ id: channelId, name: newName }));
    setShowModal(false);
    notify(t("channel.channelRenamed"));
  } catch {
    notifyError(t("channel.errorRenamed"));
  }
};

  const handleOpenAddModal = () => {
    setModalType("add");
    setSelectedChannel(null);
    setShowModal(true);
  };

  const handleOpenRenameModal = (channelId, channelName) => {
    setModalType("rename");
    setSelectedChannel({ id: channelId, name: channelName });
    setShowModal(true);
  };

  const handleOpenDeleteModal = (channelId, channelName) => {
    setModalType("remove");
    setSelectedChannel({ id: channelId, name: channelName });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChannel(null);
  };

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t("common.channels")}</b>

          <Button
            onClick={handleOpenAddModal}
            className="p-0 text-primary btn btn-group-vertical"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus-square"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              <span>+</span>
            </svg>
          </Button>
        </div>

        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) => (
            <li key={channel.id} className="nav-item w-100">
              <ChannelItem
                channel={channel}
                onDelete={handleOpenDeleteModal}
                onRename={handleOpenRenameModal}
              />
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <ModalWindow
          type={modalType}
          currentName={selectedChannel?.name || ""}
          onClose={handleCloseModal}
          onSubmit={
            modalType === "add"
              ? handleAddChannel
              : modalType === "rename"
                ? 
                  (newName) => handleRenameChannel(selectedChannel.id, newName)
                : () => handleDeleteChannel(selectedChannel.id)
          }
        />
      )}
    </>
  );
};

export default ChannelsPanel;

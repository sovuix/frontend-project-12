import { useState, useEffect } from 'react'
import Button from './Button'
import ChannelItem from './ChannelItem'
import ModalWindow from './ModalWindow/ModalWindow'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from '../services/profanity'
import { HTTP_STATUS } from '../services/httpStatus'

import {
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useRenameChannelMutation,
} from '../state/chatApi'

const modalMessages = {
  add: {
    success: 'channel.channelCreated',
    error: 'channel.errorCreated',
  },
  remove: {
    success: 'channel.channelDeleted',
    error: 'channel.errorDeleted',
  },
  rename: {
    success: 'channel.channelRenamed',
    error: 'channel.errorRenamed',
  },
}

const ChannelsPanel = ({ channels = [] }) => {
  const { t } = useTranslation()

  const [
    createChannel,
    {
      data: createData,
      error: createChannelError,
      reset: resetCreateChannel,
    },
  ] = useCreateChannelMutation()

  const [
    deleteChannel,
    {
      data: deleteData,
      error: deleteChannelError,
      reset: resetDeleteChannel,
    },
  ] = useDeleteChannelMutation()

  const [
    renameChannel,
    {
      data: renameData,
      error: renameChannelError,
      reset: resetRenameChannel,
    },
  ] = useRenameChannelMutation()

  const [modalType, setModalType] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState(null)

  const mutationDataByType = {
    add: createData,
    remove: deleteData,
    rename: renameData,
  }

  const mutationErrorByType = {
    add: createChannelError,
    remove: deleteChannelError,
    rename: renameChannelError,
  }

  const mutationResetByType = {
    add: resetCreateChannel,
    remove: resetDeleteChannel,
    rename: resetRenameChannel,
  }

  const currentData = modalType ? mutationDataByType[modalType] : null
  const currentError = modalType ? mutationErrorByType[modalType] : null
  const currentReset = modalType ? mutationResetByType[modalType] : null

  useEffect(() => {
    if (!modalType) return

    if (currentError) {
      const errorMessage
        = currentError.status === 'FETCH_ERROR' || !navigator.onLine
          ? t('common.connectionError')
          : currentError.status >= HTTP_STATUS.INTERNAL_SERVER
            ? t('common.notResponding')
            : t(modalMessages[modalType].error)

      toast.error(errorMessage)
      currentReset()
      return
    }

    if (currentData) {
      toast.success(t(modalMessages[modalType].success))
      currentReset()
    }
  }, [currentData, currentError, currentReset, modalType, t])

  const resetMutations = () => {
    resetCreateChannel()
    resetDeleteChannel()
    resetRenameChannel()
  }

  const openModal = (type, channel = null) => {
    resetMutations()
    setSelectedChannel(channel)
    setModalType(type)
  }

  const closeModal = () => {
    resetMutations()
    setSelectedChannel(null)
    setModalType(null)
  }

  const handleAddChannel = (channelName) => {
    if (!navigator.onLine) {
      toast.error(t('common.connectionError'))
      return
    }

    const cleanedChannelName = filter.clean(channelName.trim())
    createChannel(cleanedChannelName)
  }

  const handleDeleteChannel = (channelId) => {
    if (!navigator.onLine) {
      toast.error(t('common.connectionError'))
      return
    }

    deleteChannel(channelId)
  }

  const handleRenameChannel = (channelId, newName) => {
    if (!navigator.onLine) {
      toast.error(t('common.connectionError'))
      return
    }

    const cleanedName = filter.clean(newName.trim())
    renameChannel({ id: channelId, name: cleanedName })
  }

  const handleOpenAddModal = () => openModal('add')

  const handleOpenRenameModal = (channelId, channelName) => {
    openModal('rename', { id: channelId, name: channelName })
  }

  const handleOpenDeleteModal = (channelId, channelName) => {
    openModal('remove', { id: channelId, name: channelName })
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const activeModalType = currentData ? null : modalType

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('common.channels')}</b>

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
            </svg>
            <span className="visually-hidden">+</span>
          </Button>
        </div>

        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map(channel => (
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

      {activeModalType && (
        <ModalWindow
          type={activeModalType}
          currentName={selectedChannel?.name || ''}
          onClose={handleCloseModal}
          onSubmit={
            {
              add: handleAddChannel,
              rename: newName => handleRenameChannel(selectedChannel.id, newName),
              remove: () => handleDeleteChannel(selectedChannel.id),
            }[activeModalType]
          }
        />
      )}
    </>
  )
}

export default ChannelsPanel

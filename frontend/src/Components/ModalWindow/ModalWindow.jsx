import { useTranslation } from 'react-i18next'
import AddChannelModal from './AddChannelModal'
import RenameChannelModal from './RenameChannelModal'
import RemoveChannelModal from './RemoveChannelModal'

const ModalWindow = ({ onClose, onSubmit, type = 'add', currentName = '' }) => {
  const { t } = useTranslation()

  const modalTitle = {
    add: t('channel.addChannel'),
    remove: t('channel.deleteChannel'),
    rename: t('channel.renameChannel'),
  }

  const modalComponents = {
    add: AddChannelModal,
    remove: RemoveChannelModal,
    rename: RenameChannelModal,
  }

  const SelectedModal = modalComponents[type]

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{modalTitle[type]}</div>
              <button
                type="button"
                aria-label="Close"
                className="btn btn-close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <SelectedModal
                onClose={onClose}
                onSubmit={onSubmit}
                currentName={currentName}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalWindow

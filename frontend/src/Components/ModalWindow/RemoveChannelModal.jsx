import { useTranslation } from 'react-i18next'

const RemoveChannelModalBody = ({ onClose, onSubmit }) => {
  const { t } = useTranslation()

  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      <p className="mb-4">{t('channel.confirm')}</p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={handleCancel}
        >
          {t('channel.cancel')}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={onSubmit}
        >
          {t('channel.delete')}
        </button>
      </div>
    </>
  )
}

export default RemoveChannelModalBody

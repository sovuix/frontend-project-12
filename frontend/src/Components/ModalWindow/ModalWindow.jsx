import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { createModalSchema } from '../../validationSchemas/authSchemas'
import { useTranslation } from 'react-i18next'

const ModalWindow = ({ onClose, onSubmit, type = 'add', currentName = '' }) => {
  const channels = useSelector(state => state.chat.channels)
  const existingNames = channels.map(channel =>
    channel.name.toLowerCase().trim(),
  )
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      channelname: type === 'rename' ? currentName : '',
    },
    validationSchema:
            type !== 'remove' ? createModalSchema(t, existingNames) : null,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (type === 'remove') {
        onSubmit()
      }
      else {
        onSubmit(values.channelname.trim())
      }
      resetForm()
      setSubmitting(false)
      onClose()
    },
  })

  const handleCancel = () => {
    formik.resetForm()
    onClose()
  }

  const isSubmitDisabled = type === 'remove' ? false : formik.isSubmitting

  const buttonType = {
    add: t('channel.send'),
    remove: t('channel.delete'),
    rename: t('channel.send'),
  }

  const modalTitle = {
    add: t('channel.addChannel'),
    remove: t('channel.deleteChannel'),
    rename: t('channel.renameChannel'),
  }

  // const inputPlaceholder = {
  //   'add': t("channel.inputChannelName"),
  //   'rename': t("channel.inputNewChannelName"),
  // };

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
              <div className="modal-title h4">
                {modalTitle[type]}
              </div>
              <button
                type="button"
                aria-label="Close"
                className="btn btn-close"
                onClick={handleCancel}
                disabled={formik.isSubmitting}
              >
              </button>
            </div>
            <div className="modal-body">
              {type === 'remove' ? (
                <>
                  <p className="mb-4">
                    {t('channel.confirm')}
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={handleCancel}
                      disabled={formik.isSubmitting}
                    >
                      {t('channel.cancel')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        onSubmit()
                        onClose()
                      }}
                      disabled={formik.isSubmitting}
                    >
                      {buttonType[type]}
                    </button>
                  </div>
                </>
              ) : (
                <form
                  onSubmit={formik.handleSubmit}
                  // key={`${type}-${currentName}`}
                >
                  <div>
                    <input
                      name="channelname"
                      id="channelname"
                      className={`mb-2 form-control ${
                        formik.errors.channelname
                        && formik.touched.channelname
                          ? 'is-invalid'
                          : ''
                      }`}
                      value={formik.values.channelname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // placeholder={inputPlaceholder[type]}
                      // placeholder="Имя канала"
                      // aria-label={t("channel.channelname")}
                      autoFocus
                      onFocus={e => e.target.select()}
                      disabled={formik.isSubmitting}
                    />

                    <label
                      htmlFor="channelname"
                      className="visually-hidden"
                    >
                      {t('channel.channelname')}
                    </label>

                    {/* {formik.errors.channelname && formik.touched.channelname && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.channelname}
                      </div>
                    )} */}
                    <div className="invalid-feedback">
                      {formik.errors.channelname
                        && formik.touched.channelname
                        ? formik.errors.channelname
                        : ''}
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="me-2 btn btn-secondary"
                        onClick={handleCancel}
                        disabled={formik.isSubmitting}
                      >
                        {t('channel.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitDisabled}
                      >
                        {buttonType[type]}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalWindow

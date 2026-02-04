import React from "react";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { createModalSchema } from '../../validationSchemas/authSchemas';

const ModalWindow = ({ 
  onClose, 
  onSubmit, 
  type = 'add', 
  currentName = '' 
}) => {
  const channels = useSelector((state) => state.chat.channels);
  const existingNames = channels.map(channel => 
    channel.name.toLowerCase().trim()
  );

  const modalSchema = createModalSchema(existingNames);

  const formik = useFormik({
    initialValues: {
      channelname: type === 'rename' ? currentName : ''
    },
    validationSchema: type !== 'remove' ? modalSchema : null,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (type === 'remove') {
        onSubmit();
      } else {
        onSubmit(values.channelname.trim());
      }
      resetForm();
      setSubmitting(false);
      onClose();
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    onClose();
  };

  const isSubmitDisabled = type === 'remove' ? false : (!formik.isValid || formik.isSubmitting);

  // Словари
  const buttonType = {
    'add': 'Добавить',
    'remove': 'Удалить',
    'rename': 'Отправить',
  };

  const modalTitle = {
    'add': 'Добавить канал',
    'remove': 'Удалить канал',
    'rename': 'Переименовать канал',
  };

  const inputPlaceholder = {
    'add': 'Введите название канала',
    'rename': 'Введите новое название канала',
  };

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: "block" }}
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
              ></button>
            </div>
            <div className="modal-body">
              {type === 'remove' ? (
                <>
                  <p className="mb-4">
                    Уверены?
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={handleCancel}
                      disabled={formik.isSubmitting}
                    >
                      Отменить
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        onSubmit();
                        onClose();
                      }}
                      disabled={formik.isSubmitting}
                    >
                      {buttonType[type]}
                    </button>
                  </div>
                </>
              ) : (
                // Контент для добавления/переименования
                <form onSubmit={formik.handleSubmit} key={`${type}-${currentName}`}>
                  <div>
                    <input
                      name="channelname"
                      id="channelname"
                      className={`mb-2 form-control ${
                        formik.errors.channelname && formik.touched.channelname 
                          ? 'is-invalid' 
                          : ''
                      }`}
                      value={formik.values.channelname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={inputPlaceholder[type]}
                      autoFocus
                      disabled={formik.isSubmitting}
                    />
                    
                    {formik.errors.channelname && formik.touched.channelname && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.channelname}
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        className="me-2 btn btn-secondary"
                        onClick={handleCancel}
                        disabled={formik.isSubmitting}
                      >
                        Отменить
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
  );
};

export default ModalWindow;
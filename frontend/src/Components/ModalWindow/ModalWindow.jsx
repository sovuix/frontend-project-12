import React, { useState } from "react";

const ModalWindow = ({ onClose, onSubmit }) => {
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelName.trim()) {
      onSubmit(channelName.trim());
    }
    setChannelName("");
  };

  const handleCancel = () => {
    setChannelName("");
    onClose();
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
              <div className="modal-title h4">Добавить канал</div>
              <button
                type="button"
                aria-label="Close"
                className="btn btn-close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    name="name"
                    id="name"
                    className="mb-2 form-control"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Введите название канала"
                    autoFocus
                  />
                  <label className="visually-hidden" htmlFor="name">
                    Имя канала
                  </label>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!channelName.trim()}
                    >
                      Отправить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../state/slices/channelsSlice";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

const ChannelItem = ({ channel, onDelete, onRename }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = channel.id === currentChannelId;
  const isEditable = channel.removable;

  const handleChannelClick = () => {
    dispatch(setCurrentChannel(channel.id));
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(channel.id);
    }
    setShowDropdown(false);
  };

  const handleRename = (e) => {
    e.stopPropagation();

    if (onRename) {
      onRename(channel.id);
    }

    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-item w-100">
      <div className="d-flex dropdown btn-group">
        <Button
          className={`w-100 rounded-0 text-start text-truncate btn ${
            isActive ? "btn-secondary" : ""
          }`}
          onClick={handleChannelClick}
          type="button"
            role="button"  
  aria-label={channel.name}
        >
          <span className='me-1'>#</span>
          {channel.name}
        </Button>

        {isEditable && (
          <button
            type="button"
            className={`dropdown-toggle dropdown-toggle-split btn rounded-0 ${
              isActive ? "btn-secondary" : ""
            }`}
            onClick={toggleDropdown}
            aria-expanded={showDropdown}
          >
            <span className="visually-hidden">{t(channel.controlPanel)}</span>
          </button>
        )}

        {showDropdown && isEditable && (
          <div
            ref={dropdownRef}
            className="dropdown-menu show"
            style={{
              position: "absolute",
              inset: "0px auto auto 0px",
              transform: "translate(0px, 40px)",
              zIndex: 1000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="dropdown-item"
              onClick={handleDelete}
              type="button"
            >
              {t("channel.delete")}
            </button>
            <button
              className="dropdown-item"
              onClick={handleRename}
              type="button"
            >
              {t("channel.rename")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelItem;

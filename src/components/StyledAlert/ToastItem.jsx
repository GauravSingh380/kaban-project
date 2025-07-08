import React, { useState, useEffect } from 'react';
import { Toast, ContentWrapper, IconWrapper, CloseButton, ProgressBar } from './StyledComponents';
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon } from './ToastIcons';
import { TOAST_TYPES } from './constants';

const ToastItem = ({
  id,
  type,
  message,
  autoClose,
  onClose,
  theme,
  animationDuration,
  pauseOnHover,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(autoClose);

  useEffect(() => {
    if (!autoClose) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            clearInterval(interval);
            setIsExiting(true);
            setTimeout(() => onClose(id), animationDuration);
            return 0;
          }
          return prev - 100;
        });
        setProgress((prev) => (prev <= 0 ? 0 : (timeLeft / autoClose) * 100));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, autoClose, animationDuration, id, onClose, timeLeft]);

  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return <SuccessIcon />;
      case TOAST_TYPES.ERROR:
        return <ErrorIcon />;
      case TOAST_TYPES.WARNING:
        return <WarningIcon />;
      case TOAST_TYPES.INFO:
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), animationDuration);
  };

  return (
    <Toast
      type={type}
      theme={theme}
      isExiting={isExiting}
      animationDuration={animationDuration}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ContentWrapper>
        <IconWrapper>{getIcon()}</IconWrapper>
        <div>{message}</div>
      </ContentWrapper>
      <CloseButton theme={theme} onClick={handleClose}>×</CloseButton>
      {autoClose > 0 && <ProgressBar progress={progress} />}
    </Toast>
  );
};

export default ToastItem;
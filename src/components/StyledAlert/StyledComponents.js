import styled, { keyframes, css } from 'styled-components';

// Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// Position styles
export const getPositionStyles = (position) => {
  switch (position) {
    case 'top-right':
      return css`
        top: 20px;
        right: 20px;
      `;
    case 'top-left':
      return css`
        top: 20px;
        left: 20px;
      `;
    case 'bottom-right':
      return css`
        bottom: 20px;
        right: 20px;
      `;
    case 'bottom-left':
      return css`
        bottom: 20px;
        left: 20px;
      `;
    case 'bottom-center':
      return css`
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'top-center':
      return css`
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      `;
    default:
      return css`
        top: 20px;
        right: 20px;
      `;
  }
};

// Toast container
export const ToastContainer = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  min-width: 250px;
  ${({ position }) => getPositionStyles(position)};
`;

// Toast item
export const Toast = styled.div`
  display: flex;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-content: space-between;
  animation: ${({ isExiting, animationDuration }) =>
    isExiting
      ? css`${fadeOut} ${animationDuration}ms ease forwards`
      : css`${fadeIn} ${animationDuration}ms ease forwards`};
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "success":
        return theme.success || "#3E7B27"; // Deep emerald green
      case "error":
        return theme.error || "#c0392b"; // Rich crimson red
      case "warning":
        return theme.warning || "#d35400"; // Dark amber/orange
      case "info":
        return theme.info || "#2980b9"; // Strong blue
      default:
        return theme.info || "#2980b9";
    }
  }};
  color: ${({ theme }) => theme.textColor || '#fff'};

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.closeButtonColor || 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.closeButtonHoverColor || '#fff'};
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.1s linear;
  border-radius: 0 0 6px 6px;
`;
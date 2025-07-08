import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Spinner animations
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.7); opacity: 0.5; }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const waveAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-5px); }
  75% { transform: translateY(5px); }
`;

// Spinner Container with positioning
const SpinnerContainer = styled.div`
  position: ${props => props.position || 'relative'};
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  transform: ${props => props.transform || 'none'};
  z-index: ${props => props.zIndex || 'auto'};
  
  ${props => props.fullScreen && css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.overlay || 'rgba(255, 255, 255, 0.9)'};
    z-index: 9999;
  `}

  ${props => props.center && css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

// Spinner wrapper for multiple dots
const SpinnerWrapper = styled.div`
  display: flex;
  gap: ${props => props.gap || '0.5rem'};
  align-items: center;
  justify-content: center;
`;

// Base spinner styles
const BaseSpinner = styled.div`
  width: ${props => props.size || '2rem'};
  height: ${props => props.size || '2rem'};
  border-radius: ${props => props.borderRadius || '50%'};
  background: ${props => props.color || '#4f46e5'};
  animation-duration: ${props => props.speed || '1s'};
  animation-iteration-count: infinite;
  animation-timing-function: ${props => props.timing || 'ease'};
  opacity: ${props => props.opacity || 1};
`;

// Different spinner variations
const CircleSpinner = styled(BaseSpinner)`
  border: ${props => props.borderWidth || '3px'} solid ${props => props.borderColor || '#e5e7eb'};
  border-top-color: ${props => props.color || '#4f46e5'};
  border-right-color: ${props => props.color || '#4f46e5'};
  animation-name: ${rotateAnimation};
  background: transparent;
`;

const PulseSpinner = styled(BaseSpinner)`
  animation-name: ${pulseAnimation};
`;

const BounceSpinner = styled(BaseSpinner)`
  animation-name: ${bounceAnimation};
`;

const WaveSpinner = styled(BaseSpinner)`
  animation-name: ${waveAnimation};
`;

// Loading text
const LoadingText = styled.div`
  margin-top: ${props => props.marginTop || '1rem'};
  color: ${props => props.textColor || '#374151'};
  font-size: ${props => props.fontSize || '0.875rem'};
  font-weight: ${props => props.fontWeight || '500'};
  text-align: center;
  margin: 0 10px;
`;

const StyledSpinner = ({
  // Type and appearance
  type = 'circle', // circle, pulse, bounce, wave, dots
  variant = 'single', // single, multiple
  size = '2rem',
  color = '#a372c5',
  secondaryColor = '#e5e7eb',
  borderWidth = '3px',
  borderRadius = '50%',
  
  // Animation
  speed = '1s',
  timing = 'ease',
  
  // Multiple spinner options
  count = 3,
  gap = '0.5rem',
  delay = 0.1,
  
  // Positioning
  position = 'relative',
  fullScreen = false,
  center = false,
  top,
  left,
  right,
  bottom,
  zIndex,
  transform,
  
  // Overlay
  overlay = 'rgba(255, 255, 255, 0.9)',
  
  // Text
  text,
  textColor = '#98abcb',
  fontSize = '0.875rem',
  fontWeight = '500',
  textMarginTop = '1rem',
  
  // Additional
  className,
  style,
}) => {
  // Get the appropriate spinner component based on type
  const getSpinnerComponent = () => {
    switch (type) {
      case 'circle':
        return CircleSpinner;
      case 'pulse':
        return PulseSpinner;
      case 'bounce':
        return BounceSpinner;
      case 'wave':
        return WaveSpinner;
      default:
        return CircleSpinner;
    }
  };

  const SpinnerComponent = getSpinnerComponent();

  // Create multiple spinners with delayed animations
  const renderSpinners = () => {
    if (variant === 'single') {
      return (
        <SpinnerComponent
          size={size}
          color={color}
          borderColor={secondaryColor}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          speed={speed}
          timing={timing}
        />
      );
    }

    return (
      <SpinnerWrapper gap={gap}>
        {[...Array(count)].map((_, index) => (
          <SpinnerComponent
            key={index}
            size={size}
            color={color}
            borderColor={secondaryColor}
            borderWidth={borderWidth}
            borderRadius={borderRadius}
            speed={speed}
            timing={timing}
            style={{
              animationDelay: `${index * parseFloat(delay)}s`
            }}
          />
        ))}
      </SpinnerWrapper>
    );
  };

  return (
    <SpinnerContainer
      position={position}
      fullScreen={fullScreen}
      center={center}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      zIndex={zIndex}
      transform={transform}
      overlay={overlay}
      className={className}
      style={style}
    >
      {renderSpinners()}
      {text && (
          <LoadingText
          textColor={textColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          marginTop={textMarginTop}
          >
          {text}
        </LoadingText>
      )}
    </SpinnerContainer>
  );
};

export default StyledSpinner;
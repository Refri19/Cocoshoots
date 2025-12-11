import React, { useState } from 'react';

const SvgSwitchWithInlineStyles = () => {
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => setIsOn(!isOn);

  // --- Configuration Variables ---
  const SVG_WIDTH = 50;
  const SVG_HEIGHT = 26;
  const RECT_RADIUS = SVG_HEIGHT / 2;

  // Colors
  const COLOR_OFF = '#e0e0e0';
  const COLOR_ON = '#253939';
  const COLOR_INDICATOR_OFF = '#9e9e9e';
  const COLOR_INDICATOR_ON = '#ffffff';
  const COLOR_HANDLE = '#ffffff';

  // Handle (Thumb)
  const HANDLE_RADIUS = 12;
  const HANDLE_CENTER_Y = SVG_HEIGHT / 2;

  // Background Indicator Circles
  const INDICATOR_RADIUS = 8;
  const INDICATOR_PADDING = 10;
  
  const INDICATOR_POS_OFF = INDICATOR_PADDING + INDICATOR_RADIUS;
  const INDICATOR_POS_ON = SVG_WIDTH - INDICATOR_PADDING - INDICATOR_RADIUS;

  const HANDLE_POS_OFF = RECT_RADIUS;
  const HANDLE_POS_ON = SVG_WIDTH - RECT_RADIUS;
  
  // Transition Property (for smooth movement/color change)
  const TRANSITION = '0.3s ease-in-out';

  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      onClick={handleToggle}
      style={{ cursor: 'pointer' }} // Inline cursor style
      aria-checked={isOn}
      role="switch"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle();
        }
      }}
    >
      {/* 1. Track (Background Rectangle) */}
      <rect
        x="0"
        y="0"
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        rx={RECT_RADIUS}
        // Inline fill based on state
        fill={isOn ? COLOR_ON : COLOR_OFF}
        // Inline transition
        style={{ transition: `fill ${TRANSITION}` }}
      />

      {/* 2. OFF Indicator Circle */}
      <circle
        cx={INDICATOR_POS_OFF}
        cy={HANDLE_CENTER_Y}
        r={INDICATOR_RADIUS}
        fill={COLOR_INDICATOR_OFF}
        // Conditional opacity and transition
        style={{ opacity: isOn ? 0 : 1, transition: `opacity ${TRANSITION}` }}
      />
      
      {/* 3. ON Indicator Circle */}
      <circle
        cx={INDICATOR_POS_ON}
        cy={HANDLE_CENTER_Y}
        r={INDICATOR_RADIUS}
        fill={COLOR_INDICATOR_ON}
        // Conditional opacity and transition
        style={{ opacity: isOn ? 1 : 0, transition: `opacity ${TRANSITION}` }}
      />

      {/* 4. Handle (Foreground Circle) - The moving part */}
      <circle
        cx={isOn ? HANDLE_POS_ON : HANDLE_POS_OFF}
        cy={HANDLE_CENTER_Y}
        r={HANDLE_RADIUS}
        fill={COLOR_HANDLE}
        // Use SVG attributes for shadow effects and inline transition for movement
        // Shadow is slightly more complex inline, often best handled by CSS/filter, 
        // but cx must be transitioned.
        style={{ transition: `cx ${TRANSITION}` }}
      />
    </svg>
  );
};

export default SvgSwitchWithInlineStyles;
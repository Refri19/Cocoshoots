import React from 'react';

/**
 * A simple Menu Bar (Hamburger) icon component.
 * @param {object} props - Component props.
 * @param {string} [props.color='currentColor'] - The color of the icon lines.
 * @param {number} [props.size=24] - The size (width and height) of the icon in pixels.
 * @param {number} [props.strokeWidth=2] - The thickness of the lines.
 */
const MenuBarIcon = ({ color = 'currentColor', size = 24, strokeWidth = 2, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest} // Allows passing additional props like className or onClick
  >
    {/* Top line */}
    <line x1="3" y1="12" x2="21" y2="12" />

    {/* Middle line (commented out for a common variation, but included for a full hamburger) */}
    <line x1="3" y1="6" x2="21" y2="6" />

    {/* Bottom line */}
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default MenuBarIcon;
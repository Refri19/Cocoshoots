import React from 'react';

const PolaroidFrame = ({ 
  imageSrc = Logo, 
  caption = "Summer 2025",
  width = 350   
}) => {
  return (
    <div style={{ width: width, filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
      <svg 
        viewBox="0 0 350 420" 
        fill="none" 
        xmlns="www.w3.org"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Main Frame Background */}
        <rect width="350" height="420" fill="white" />
        
        {/* Inner Border/Shadow Effect for depth */}
        <rect x="25" y="25" width="300" height="310" fill="#f0f0f0" />

        {/* image-image-upload Clipping Path */}
        <defs>
          <clipPath id="photo-area">
            <rect x="25" y="25" width="300" height="310" />
          </clipPath>
        </defs>

        {/* The Photo */}
        <image 
          href={imageSrc} 
          clipPath="url(#photo-area)"
          x="25" 
          y="25" 
          width="300" 
          height="310" 
          preserveAspectRatio="xMidYMid slice"
          
        />

        {/* Caption Text */}
        <text 
          x="175" 
          y="385" 
          fontFamily="'Arial', sans-serif" 
          fontSize="28" 
          fill="#333" 
          textAnchor="middle"
        >
          {caption}
        </text>
      </svg>
    </div>
  );
};

export default PolaroidFrame;

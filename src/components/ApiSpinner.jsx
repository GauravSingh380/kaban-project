import React from 'react'

const ApiSpinner = ({ borderWidth = '3px', size = '1.5rem', text = '', fontSize = 'font-semibold', color }) => (
    <div className="flex items-center justify-center gap-2">
      <div 
        className={`animate-spin rounded-full border-t-transparent border-${color || "purple-500"}`}
        style={{
          width: size, 
          height: size, 
          borderWidth: borderWidth 
        }}
      />
      {text && <span className={fontSize}>{text}</span>}
    </div>
  );

export default ApiSpinner
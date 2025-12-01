import React from "react";

const ApiSpinnerV2 = ({ 
  borderWidth = "3px", 
  size = "1.5rem", 
  text = "", 
  fontSize = "font-semibold", 
  color 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.50)] bg-opacity-30 z-50">
      <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-lg">
        <div
          className={`animate-spin rounded-full border-t-transparent border-${color || "purple-500"}`}
          style={{
            width: size,
            height: size,
            borderWidth: borderWidth,
          }}
        />
        {text && <span className={fontSize}>{text}</span>}
      </div>
    </div>
  );
};

export default ApiSpinnerV2;

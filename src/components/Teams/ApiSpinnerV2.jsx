import React from "react";

const ApiSpinnerV2 = ({
  borderWidth = "3px",
  size = "1.5rem",
  text = "",
  fontSize = "font-semibold",
  color = "#6e10b1" // default theme color
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.50)] z-50">
      <div className="flex items-center justify-center gap-3 p-4 bg-[#e3dbe8] rounded-lg shadow-lg">
        
        {/* Spinner */}
        <div
          className="animate-spin rounded-full border-solid border-t-transparent"
          style={{
            width: size,
            height: size,
            borderWidth: borderWidth,
            borderColor: color,       // theme spinner color
            borderTopColor: "transparent"
          }}
        />

        {/* Text */}
        {text && <span className={fontSize}>{text}</span>}
      </div>
    </div>
  );
};

export default ApiSpinnerV2;

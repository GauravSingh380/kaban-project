const GlobalLoader = ({ text = "Loading, please wait..." }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border-4 border-purple-200 animate-spin border-t-purple-600"></div>
          <div className="absolute h-8 w-8 rounded-full bg-purple-600 animate-pulse opacity-70"></div>
        </div>
  
        {/* Text */}
        <p className="mt-6 text-sm font-medium text-gray-600 tracking-wide">
          {text}
        </p>
      </div>
    );
  };
  
  export default GlobalLoader;


// import React from 'react'

// const GlobalLoader = () => {
//   return (
//     <div className="flex items-center justify-center h-64"> <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"> </div> <p>Loading...</p> </div>
//   )
// }
  
//   export default GlobalLoader
  
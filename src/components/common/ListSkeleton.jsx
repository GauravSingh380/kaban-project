const ListSkeleton = ({ rows = 5 }) => {
    return (
      <div className="p-6 space-y-4">
        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-lg animate-pulse bg-white shadow-sm"
          >
            {/* Avatar / Icon placeholder */}
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
  
            {/* Text placeholders */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
            </div>
  
            {/* Status / action placeholder */}
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ListSkeleton;
  
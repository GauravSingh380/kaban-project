const BugCardSkeleton = ({
    rows = 4,
    descLines = 3,
    metaItems = 4,
    envTags = 2,
    showActions = true,
  }) => {
    return (
      <div className="p-6 space-y-4">
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-200 rounded" />
  
                <div>
                  <div className="h-5 w-48 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
  
              <div className="flex items-center space-x-2">
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
            </div>
  
            {/* Description lines (dynamic) */}
            <div className="space-y-2 mb-4">
              {[...Array(descLines)].map((_, j) => (
                <div
                  key={j}
                  className={`h-4 bg-gray-200 rounded ${
                    j === descLines - 1 ? "w-10/12" : "w-full"
                  }`}
                />
              ))}
            </div>
  
            {/* Meta grid (dynamic) */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[...Array(metaItems)].map((_, k) => (
                <div key={k} className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
  
            {/* Environment tags (dynamic) */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="flex gap-2">
                {[...Array(envTags)].map((_, t) => (
                  <div
                    key={t}
                    className="h-5 w-12 bg-gray-200 rounded"
                  />
                ))}
              </div>
            </div>
  
            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="h-3 w-64 bg-gray-200 rounded" />
  
              {showActions && (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BugCardSkeleton;
  
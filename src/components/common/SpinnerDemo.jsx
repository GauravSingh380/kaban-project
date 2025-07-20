import React, { useState } from 'react';

// Base Spinner Component
const BaseSpinner = ({ 
  size = '1.5rem', 
  borderWidth = '3px', 
  color = 'purple-500',
  className = '' 
}) => (
  <div 
    className={`animate-spin rounded-full border-t-transparent border-${color} ${className}`}
    style={{ 
      width: size, 
      height: size, 
      borderWidth: borderWidth 
    }}
  />
);

// Simple Spinner with optional text
const Spinner = ({ 
  size = '1.5rem',
  borderWidth = '3px',
  text = '',
  fontSize = 'text-sm font-medium',
  color = 'purple-500',
  textColor = 'text-gray-700',
  gap = 'gap-2',
  direction = 'row', // 'row' | 'col'
  className = ''
}) => (
  <div className={`flex items-center justify-center ${direction === 'col' ? 'flex-col' : ''} ${gap} ${className}`}>
    <BaseSpinner size={size} borderWidth={borderWidth} color={color} />
    {text && <span className={`${fontSize} ${textColor}`}>{text}</span>}
  </div>
);

// Loading Button Component
const LoadingButton = ({ 
  isLoading = false,
  children,
  onClick,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  spinnerSize = '1rem',
  spinnerColor = 'white',
  loadingText = '',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
    ghost: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };
  
  const spinnerSizes = {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <BaseSpinner 
          size={spinnerSizes[size]} 
          borderWidth="2px" 
          color={variant === 'outline' || variant === 'ghost' ? 'purple-600' : spinnerColor}
        />
      )}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
};

// Full Screen/Page Loading Overlay
const LoadingOverlay = ({ 
  isVisible = false,
  text = 'Loading...',
  subText = '',
  size = '3rem',
  color = 'purple-500',
  backdrop = 'bg-white bg-opacity-90', // 'bg-black bg-opacity-50' for dark overlay
  className = ''
}) => {
  if (!isVisible) return null;
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backdrop} ${className}`}>
      <div className="text-center">
        <BaseSpinner size={size} borderWidth="4px" color={color} className="mx-auto mb-4" />
        {text && <div className="text-lg font-medium text-gray-700 mb-1">{text}</div>}
        {subText && <div className="text-sm text-gray-500">{subText}</div>}
      </div>
    </div>
  );
};

// Inline Content Loading (replaces content while loading)
const LoadingContent = ({ 
  isLoading = false,
  children,
  loadingComponent,
  text = 'Loading...',
  size = '2rem',
  color = 'purple-500',
  minHeight = '200px',
  className = ''
}) => {
  if (isLoading) {
    return loadingComponent || (
      <div className={`flex items-center justify-center ${className}`} style={{ minHeight }}>
        <Spinner text={text} size={size} color={color} direction="col" gap="gap-3" />
      </div>
    );
  }
  
  return children;
};

// Modal/Card Loading State
const LoadingModal = ({ 
  isLoading = false,
  children,
  text = 'Loading...',
  size = '2.5rem',
  color = 'purple-500',
  className = ''
}) => (
  <div className={`relative ${className}`}>
    {isLoading && (
      <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
        <Spinner text={text} size={size} color={color} direction="col" gap="gap-3" />
      </div>
    )}
    <div className={isLoading ? 'opacity-30' : ''}>
      {children}
    </div>
  </div>
);

// Table/List Loading State
const LoadingTable = ({ 
  isLoading = false,
  rows = 5,
  cols = 4,
  text = 'Loading data...',
  size = '1.5rem',
  color = 'purple-500'
}) => {
  if (!isLoading) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center py-8">
        <Spinner text={text} size={size} color={color} />
      </div>
      {/* Skeleton rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          {[...Array(cols)].map((_, j) => (
            <div key={j} className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Demo Component showing all use cases
const SpinnerDemo = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const simulateLoading = (setter, duration = 2000) => {
    setter(true);
    setTimeout(() => setter(false), duration);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Reusable Spinner System</h1>
      
      {/* Basic Spinners */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Basic Spinners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Spinner text="Default" />
          </div>
          <div className="text-center">
            <Spinner text="Large Blue" size="2rem" color="blue-500" />
          </div>
          <div className="text-center">
            <Spinner text="Column Layout" direction="col" color="green-500" />
          </div>
        </div>
      </section>

      {/* Loading Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Loading Buttons</h2>
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
          <LoadingButton
            isLoading={loading1}
            onClick={() => simulateLoading(setLoading1)}
            variant="primary"
          >
            {loading1 ? 'Saving...' : 'Save'}
          </LoadingButton>
          
          <LoadingButton
            isLoading={loading2}
            onClick={() => simulateLoading(setLoading2)}
            variant="outline"
            loadingText="Processing..."
          >
            Submit Form
          </LoadingButton>
          
          <LoadingButton
            isLoading={false}
            variant="secondary"
            size="lg"
          >
            Large Button
          </LoadingButton>
          
          <LoadingButton
            isLoading={true}
            variant="ghost"
            size="sm"
          >
            Small Loading
          </LoadingButton>
        </div>
      </section>

      {/* Page Loading Overlay */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Full Page Loading</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => simulateLoading(setPageLoading, 3000)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Show Page Loading
          </button>
          <LoadingOverlay 
            isVisible={pageLoading} 
            text="Loading Application..."
            subText="Please wait while we fetch your data"
          />
        </div>
      </section>

      {/* Content Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Content Loading</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => simulateLoading(setContentLoading)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
          >
            Load Content
          </button>
          
          <LoadingContent 
            isLoading={contentLoading}
            text="Fetching content..."
            className="border rounded-lg bg-white"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">Sample Content</h3>
              <p>This is the actual content that appears after loading is complete.</p>
              <p>You can put any component or content here.</p>
            </div>
          </LoadingContent>
        </div>
      </section>

      {/* Modal Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Modal/Card Loading</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => simulateLoading(setModalLoading)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
          >
            Load Modal Content
          </button>
          
          <LoadingModal 
            isLoading={modalLoading}
            text="Updating..."
            className="border rounded-lg bg-white"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">Modal Content</h3>
              <div className="space-y-4">
                <div>
                  <div className="block text-sm font-medium mb-1">Name</div>
                  <div className="w-full border rounded px-3 py-2 bg-gray-50">John Doe</div>
                </div>
                <div>
                  <div className="block text-sm font-medium mb-1">Email</div>
                  <div className="w-full border rounded px-3 py-2 bg-gray-50">john@example.com</div>
                </div>
                <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </div>
          </LoadingModal>
        </div>
      </section>

      {/* Table Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">6. Table/List Loading</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => simulateLoading(setTableLoading)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            Load Table Data
          </button>
          
          <div className="bg-white rounded-lg border p-4">
            {!tableLoading ? (
              <div className="space-y-2">
                <h3 className="font-medium">Data Table</h3>
                {[1,2,3].map(i => (
                  <div key={i} className="flex justify-between py-2 border-b">
                    <span>Item {i}</span>
                    <span>Value {i}</span>
                    <span>Status {i}</span>
                  </div>
                ))}
              </div>
            ) : (
              <LoadingTable isLoading={tableLoading} text="Loading table data..." />
            )}
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">7. Custom Usage Examples</h2>
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          {/* Inline spinner in text */}
          <div className="flex items-center gap-2">
            <span>Processing</span>
            <BaseSpinner size="1rem" color="blue-500" />
            <span>Please wait...</span>
          </div>
          
          {/* Custom card with spinner */}
          <div className="bg-white p-4 rounded border">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Upload Progress</h3>
              <Spinner size="1.25rem" color="green-500" />
            </div>
          </div>
          
          {/* Spinner in different positions */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded">
              <Spinner text="Top" direction="col" />
            </div>
            <div className="p-4 border rounded flex items-center justify-center">
              <Spinner text="Center" />
            </div>
            <div className="p-4 border rounded flex items-end justify-center">
              <Spinner text="Bottom" direction="col" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpinnerDemo;

// Export all components for use in your project
export { 
  BaseSpinner, 
  Spinner, 
  LoadingButton, 
  LoadingOverlay, 
  LoadingContent, 
  LoadingModal, 
  LoadingTable 
};
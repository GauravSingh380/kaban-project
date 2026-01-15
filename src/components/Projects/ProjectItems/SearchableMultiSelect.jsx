import React, { useState, useEffect, useRef } from 'react';

const SearchableMultiSelect = ({
  label,
  value = [],
  onChange,
  searchEndpoint,
  displayKey,
  valueKey,
  placeholder = "Search...",
  minSearchLength = 2,
  debounceTime = 300,
  required = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search users
  useEffect(() => {
    if (searchQuery.length < minSearchLength) {
      setSearchResults([]);
      return;
    }

    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${searchEndpoint}?query=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceTime);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, searchEndpoint, minSearchLength, debounceTime]);

  const handleSelect = (item) => {
    const itemValue = item[valueKey];
    if (!value.includes(itemValue)) {
      const newValue = [...value, itemValue];
      onChange(newValue);
      setSelectedItems([...selectedItems, item]);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemove = (itemValue) => {
    const newValue = value.filter(v => v !== itemValue);
    onChange(newValue);
    setSelectedItems(selectedItems.filter(item => item[valueKey] !== itemValue));
  };

  const getDisplayText = (item) => {
    return typeof displayKey === 'function' ? displayKey(item) : item[displayKey];
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map(item => (
            <div
              key={item[valueKey]}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{getDisplayText(item)}</span>
              <button
                type="button"
                onClick={() => handleRemove(item[valueKey])}
                className="hover:bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Dropdown */}
        {isOpen && searchQuery.length >= minSearchLength && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map(item => {
                const itemValue = item[valueKey];
                const isSelected = value.includes(itemValue);
                
                return (
                  <div
                    key={itemValue}
                    onClick={() => !isSelected && handleSelect(item)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 text-sm ${
                      isSelected ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="font-medium">{getDisplayText(item)}</div>
                    {item.userDetails && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.email}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No users found
              </div>
            )}
          </div>
        )}

        {/* Helper Text */}
        {searchQuery.length > 0 && searchQuery.length < minSearchLength && (
          <p className="mt-1 text-xs text-gray-500">
            Type at least {minSearchLength} characters to search
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchableMultiSelect;


// // Demo Component
// export default function Demo() {
//     const [team, setTeam] = useState([]);
  
//     return (
//       <div className="max-w-2xl mx-auto p-8">
//         <h1 className="text-2xl font-bold mb-6">Add Team Members</h1>
        
//         <SearchableMultiSelect
//           label="Team Members"
//           value={team}
//           onChange={setTeam}
//           searchEndpoint="/api/users/search"
//           displayKey={(user) => {
//             const fullName = user.userDetails 
//               ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
//               : user.username || user.email;
//             return `${fullName} (${user.email})`;
//           }}
//           valueKey="userGuid"
//           placeholder="Search team members by name or email..."
//           minSearchLength={2}
//           debounceTime={300}
//           required={true}
//         />
  
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//           <h3 className="font-semibold mb-2">Selected Team (IDs):</h3>
//           <pre className="text-sm">{JSON.stringify(team, null, 2)}</pre>
//         </div>
//       </div>
//     );
//   }

//   // Inside your RenderHtmlFieldsP component
// case 'multiselect-search':
//     return (
//       <SearchableMultiSelect
//         label={field.label}
//         value={formData[field.name] || []}
//         onChange={(value) => handleInputChange(field.name, value)}
//         searchEndpoint={field.searchEndpoint}
//         displayKey={field.displayKey}
//         valueKey={field.valueKey}
//         placeholder={field.placeholder}
//         minSearchLength={field.minSearchLength || 2}
//         debounceTime={field.debounceTime || 300}
//         required={field.required}
//       />
//     );

//     {
//         name: "team",
//         label: "Team Members",
//         type: "multiselect-search",
//         placeholder: "Search and select team members...",
//         required: false,
//         searchEndpoint: "/api/users/search", // Your search API endpoint
//         displayKey: (user) => {
//           const fullName = user.userDetails 
//             ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
//             : user.username || user.email;
//           return `${fullName} (${user.email})`;
//         },
//         valueKey: "userGuid",
//         minSearchLength: 2,
//         debounceTime: 300
//       }
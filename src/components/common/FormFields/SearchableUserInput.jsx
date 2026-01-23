import React, { useState, useEffect, useRef } from "react";
import { useApi, useAuth } from "../../../api";
import { useToast } from "../../StyledAlert/ToastContext";

const SearchableUserInput = ({
  value = null,
  handleInputChange,
  name,
  placeholder = "Search user...",
  field=""
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  const alert = useToast();

  const { getUsersName } = useAuth();
  const { execute: executeGetUsersName } = useApi(getUsersName);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keep input synced with selected value
  useEffect(() => {
    if (value) {
      setSearchQuery(value.name || "");
    }
  }, [value]);

  // Search with debounce
  useEffect(() => {
    if (!isOpen || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await executeGetUsersName(searchQuery);

        if (data.success && data.data) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery, isOpen]);

  // When user selects one
  const handleSelectUser = (user) => {
    const fullName = user.userDetails
      ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
      : user.name || user.email;

    const selectedUser = {
      userGuid: user.userGuid,
      name: fullName,
      email: user.email,
    };

    handleInputChange(name, selectedUser);   // send to parent
    setSearchQuery(fullName);                 // show in input
    setSearchResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative  mb-4" ref={dropdownRef}>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
      {/* Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md focus:ring-2 focus:border-transparent px-3 py-2 border-gray-300 
                   focus:outline-none focus:ring-blue-500"
      />

      {/* Dropdown */}
      {isOpen && searchQuery.length >= 2 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-1">
              {searchResults.map((user) => {
                const fullName = user.userDetails
                  ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
                  : user.name || user.email;

                const avatar = fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={user.userGuid}
                    onClick={() => handleSelectUser(user)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-semibold">
                        {avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fullName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableUserInput;

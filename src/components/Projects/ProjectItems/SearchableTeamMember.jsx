import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import { useApi, useAuth } from '../../../api';
import { useToast } from '../../StyledAlert/ToastContext';

const SearchableTeamMember = ({ value = [], handleInputChange, name, roles = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const alert = useToast();
  
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  const { getUsersName } = useAuth();
  const {
      loading: loadingUsersName,
      execute: executeGetUsersName
  } = useApi(getUsersName);

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

  // Search users with debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        // const response = await fetch(`http://localhost:3000/api/users/users?query=${encodeURIComponent(searchQuery)}`);
        // const data = await response.json();
        const data = await executeGetUsersName(searchQuery);
        console.log('Search results:', data);
        
        if (data.success && data.data) {
          // Filter out already added team members
          const existingUserGuids = value.map(member => member.userGuid);
          const filteredResults = data.data.filter(
            user => !existingUserGuids.includes(user.userGuid)
          );
          setSearchResults(filteredResults);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, value]);

  const handleSelectUser = (user) => {
    if (!selectedRole) {
      alert.warning('Please select a role first');
      return;
    }

    const fullName = user.userDetails 
      ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
      : user.name || user.email;
    
    const avatar = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const newMember = {
      userGuid: user.userGuid,
      name: fullName,
      email: user.email,
      role: selectedRole,
      avatar: avatar
    };

    handleInputChange(name, [...value, newMember]);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedRole('');
    setIsOpen(false);
  };

  const handleRemoveMember = (index) => {
    const newTeam = value.filter((_, i) => i !== index);
    handleInputChange(name, newTeam);
  };

  return (
    <div className="space-y-3">
    {/* Display existing team members */}
    {value.length > 0 && (
      <div className="space-y-2">
        {value.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveMember(index)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    )}

    {/* Add new team member */}
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Role Selection */}
                <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select role</option>
          {roles.map(role => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        {/* User Search Input */}
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Member Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          
          {/* Search Results Dropdown */}
          {isOpen && searchQuery.length >= 2 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-1">
                  {searchResults.map(user => {
                    const fullName = user.userDetails 
                      ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
                      : user.name || user.email;
                    
                    const avatar = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

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

        {/* Add Button */}
        {/* <button
          type="button"
          onClick={() => {
            if (searchQuery && selectedRole) {
              // Find the user from search results that matches the query
              const matchedUser = searchResults.find(user => {
                const fullName = user.userDetails 
                  ? `${user.userDetails.firstName} ${user.userDetails.lastName}`.trim()
                  : user.name || user.email;
                return fullName.toLowerCase().includes(searchQuery.toLowerCase());
              });
              
              if (matchedUser) {
                handleSelectUser(matchedUser);
              }
            }
          }}
          disabled={!searchQuery || !selectedRole}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button> */}
      </div>
    </div>
  </div>
  );
};
export default SearchableTeamMember;

// // Demo Component
// export default function Demo() {
//   const [teamMembers, setTeamMembers] = useState([
//     {
//       userGuid: '123',
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'Developer',
//       avatar: 'JD'
//     },
//     {
//       userGuid: '456',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       role: 'Designer',
//       avatar: 'JS'
//     }
//   ]);

//   const roles = [
//     { value: 'Developer', label: 'Developer' },
//     { value: 'Designer', label: 'Designer' },
//     { value: 'Project Manager', label: 'Project Manager' },
//     { value: 'QA Engineer', label: 'QA Engineer' },
//     { value: 'DevOps', label: 'DevOps' }
//   ];

//   const handleInputChange = (name, value) => {
//     setTeamMembers(value);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Team</h2>
//         <p className="text-sm text-gray-600">Add team members to your project</p>
//       </div>

//       <SearchableTeamMember
//         value={teamMembers}
//         handleInputChange={handleInputChange}
//         name="team"
//         roles={roles}
//       />

//       {/* Debug Output */}
//       <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h3 className="text-sm font-semibold text-gray-700 mb-2">Team Data (for API):</h3>
//         <pre className="text-xs overflow-auto">
//           {JSON.stringify(teamMembers, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }

// Import necessary libraries
import React, { useState } from 'react';
import './App.css'; // Include styles for the design

// TypeScript interface for user data
interface User {
  id: number;
  name: string;
  dob: string; // Date of Birth in YYYY-MM-DD format
  gender: string;
  country: string;
  description: string;
}

// Helper function to calculate age
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store user data
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null); // Accordion state
  const [editUserId, setEditUserId] = useState<number | null>(null); // Edit mode state
  const [editedUser, setEditedUser] = useState<User | null>(null); // Temp edited user data

  // Fetch JSON data (assume JSON is loaded separately)
  React.useEffect(() => {
    fetch('/path/to/celebrities.json') // Replace with actual file path
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  // Toggle accordion state
  const toggleAccordion = (userId: number) => {
    if (editUserId) return; // Prevent toggling while editing
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  // Handle edit button click
  const handleEdit = (user: User) => {
    if (calculateAge(user.dob) < 18) {
      alert('User must be an adult to edit details.');
      return;
    }
    setEditUserId(user.id);
    setEditedUser({ ...user });
  };

  // Handle input changes in edit mode
  const handleInputChange = (field: keyof User, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  // Save edited user details
  const handleSave = () => {
    if (!editedUser) return;
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setEditUserId(null);
    setEditedUser(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditUserId(null);
    setEditedUser(null);
  };

  // Handle delete user
  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="app">
      <h1>Celebrity Manager</h1>
      <div className="user-list">
        {users.map((user) => {
          const isExpanded = user.id === expandedUserId;
          const isEditing = user.id === editUserId;
          return (
            <div key={user.id} className={`user-item ${isExpanded ? 'expanded' : ''}`}>
              <div className="user-header" onClick={() => toggleAccordion(user.id)}>
                <img src="/path/to/avatar.png" alt="Avatar" />
                <span>{user.name}</span>
                <button>{isExpanded ? '-' : '+'}</button>
              </div>
              {isExpanded && (
                <div className="user-details">
                  {isEditing ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={calculateAge(editedUser!.dob).toString()}
                        readOnly
                      />
                      <select
                        value={editedUser!.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Transgender</option>
                        <option>Rather not say</option>
                        <option>Other</option>
                      </select>
                      <input
                        type="text"
                        value={editedUser!.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      />
                      <textarea
                        value={editedUser!.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                      <button
                        onClick={handleSave}
                        disabled={JSON.stringify(editedUser) ===
                          JSON.stringify(users.find((u) => u.id === editUserId))}
                      >
                        Save
                      </button>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <p>Age: {calculateAge(user.dob)}</p>
                      <p>Gender: {user.gender}</p>
                      <p>Country: {user.country}</p>
                      <p>Description: {user.description}</p>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
